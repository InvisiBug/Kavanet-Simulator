import mqtt, { MqttClient } from "mqtt";
import { randFutureTime, shouldUpdate, publishOnConnect } from "../../utils";
require("dotenv").config();
export default class HeatingSensor {
  name: string;
  temperature: number = 0;
  humidity: number = 0;
  topic: string;

  timeToSend: number;

  kavanestMQTT: MqttClient;
  client: MqttClient;

  // This one opens an mqtt connection to kavanest and relays the chosen sensor
  constructor(client: MqttClient, deviceConfig: any) {
    this.name = deviceConfig.name;
    this.client = client;
    this.topic = deviceConfig.topic;

    this.kavanestMQTT = mqtt.connect(process.env.MQTT_LIVE ?? "");

    this.kavanestMQTT.subscribe(deviceConfig.topic, (err) => {
      err ? console.log(err) : null;
    });

<<<<<<< HEAD:src/components/devices/components/heatingSensorBridge.ts
    this.kavanestMQTT.on("connect", () => console.log("Simulator connected to mqtt.kavanet.io"));
=======
    this.kavanestMQTT.on("connect", () => console.log(`${this.name} sensor bridging from ${process.env.MQTT_LIVE}`));
>>>>>>> Added multiple environments and a bunch of other changes:src/components/devices/components/heatingSensorRelay.ts

    this.kavanestMQTT.on("message", (_, rawPayload) => {
      const payload = JSON.parse(rawPayload.toString());
      this.temperature = payload.temperature;
      this.humidity = payload.humidity;

      console.log(this.temperature, this.humidity);
    });

    this.timeToSend = randFutureTime();
    publishOnConnect() ? this.publish() : null;
  }

  publish() {
    this.client.publish(
      this.topic,
      JSON.stringify({
        node: `${this.name} Heating Sensor`,
        temperature: this.temperature,
        humidity: this.humidity,
      }),
    );
  }

  handleIncoming(topic: string, payload: object) {}

  tick() {
    let now = new Date().getTime();
    if (shouldUpdate(this.timeToSend)) {
      this.timeToSend = now;
      this.publish();
    }
  }
}
