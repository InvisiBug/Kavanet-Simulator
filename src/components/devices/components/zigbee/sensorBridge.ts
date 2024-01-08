import mqtt, { MqttClient } from "mqtt";
import { randFutureTime, shouldUpdate, publishOnConnect, mqttLiveUrl } from "../../../utils";

export default class HeatingSensorBridge {
  name: string;
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

    this.kavanestMQTT.subscribe(this.topic, (err) => {
      err ? console.log(err) : null;
    });

    this.kavanestMQTT.on("connect", () => console.log(`${this.name} sensor relay connected to mqtt.kavanet.io`));

    this.kavanestMQTT.on("message", (_, rawPayload) => {
      try {
        const payload: any = JSON.parse(rawPayload.toString());
        // console.log(this.topic, payload);
        this.publish(rawPayload);
      } catch (err) {
        console.log(`${this.name} sensor disconnected`);
      }
    });
  }

  publish(payload: Buffer) {
    this.client.publish(
      this.topic,
      payload,
      // JSON.stringify({
      //   payload,
      // }),
    );
  }

  handleIncoming(topic: string, payload: object) {}

  tick() {}
}

type Payload = {
  battery: number;
  humidity: number;
  linkquality: number;
  temperature: number;
  voltage: number;
};
