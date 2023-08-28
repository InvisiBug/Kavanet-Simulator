import mqtt, { MqttClient } from "mqtt";
import { randFutureTime, shouldUpdate, publishOnConnect, mqttLiveUrl } from "../../utils";

export default class HeatingSensorBridge {
  name: string;
  temperature: number = 0;
  humidity: number = 0;
  topic: string;

  kavanestMQTT: MqttClient;
  client: MqttClient;

  // This one opens an mqtt connection to kavanest and relays the chosen sensor
  constructor(client: MqttClient, deviceConfig: any) {
    this.name = deviceConfig.name;
    this.client = client;
    this.topic = deviceConfig.topic;

    this.kavanestMQTT = mqtt.connect(mqttLiveUrl);
    // try {
    // } catch {
    //   this.kavanestMQTT = mqtt.connect(process.env.MQTT_LIVE ?? "");
    //   console.log("MQTT undable to connect");
    // }

    this.kavanestMQTT.subscribe(deviceConfig.physicalDeviceTopic, (err) => {
      err ? console.log(err) : null;
    });

    this.kavanestMQTT.on("connect", () => console.log(`${this.name} sensor relay connected to mqtt.kavanet.io`));

    this.kavanestMQTT.on("message", (_, rawPayload) => {
      try {
        const payload = JSON.parse(rawPayload.toString());
        this.temperature = payload.temperature;
        this.humidity = payload.humidity;
        this.publish();
      } catch (err) {
        console.log(`${this.name} sensor disconnected`);
      }
    });
  }

  publish() {
    this.client.publish(
      this.topic,
      JSON.stringify({
        // type: "Sensor",
        node: `${this.name} Sensor`,
        temperature: this.temperature,
        humidity: this.humidity,
      }),
    );
  }

  handleIncoming(topic: string, payload: object) {}

  tick() {}
}
