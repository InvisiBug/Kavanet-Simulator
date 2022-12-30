import mqtt, { MqttClient } from "mqtt";
import { randFutureTime, publishOnConnect, shouldUpdate } from "../../utils";
require("dotenv").config();

export default class ComputerAudio {
  client: MqttClient;
  lastSent: number;
  topic: string;
  controlTopic: string;
  name: string;

  kavanestMQTT: MqttClient;

  fan: number = 1;
  valve: number = 1;
  inlet: number = 25;

  constructor(client: MqttClient, deviceConfig: any) {
    this.name = deviceConfig.name;
    this.topic = deviceConfig.topic;
    this.controlTopic = deviceConfig.controlTopic;
    console.log(this.topic);

    this.client = client;
    this.lastSent = randFutureTime();
    publishOnConnect() ? this.publish() : null;

    this.kavanestMQTT = mqtt.connect(process.env.MQTT_LIVE ?? "");

    this.kavanestMQTT.subscribe(deviceConfig.topic, (err) => {
      err ? console.log(err) : null;
    });

    this.kavanestMQTT.on("connect", () => console.log(`${this.name} sensor relay connected to mqtt.kavanet.io`));

    this.kavanestMQTT.on("message", (_, rawPayload) => {
      try {
        const payload = JSON.parse(rawPayload.toString());
        this.inlet = payload.inlet;

        this.publish();
      } catch (err) {
        console.log(`${this.name} sensor disconnected`);
      }
    });
  }

  handleIncoming(topic: String, rawPayload: Object) {
    if (topic === this.controlTopic) {
      const payload = JSON.parse(rawPayload.toString());
      console.log(payload);

      this.fan = payload.fan ? 1 : 0;
      this.valve = payload.valve ? 1 : 0;

      this.publish();
    }
  }

  publish() {
    this.client.publish(
      this.topic,
      JSON.stringify({
        type: "radiator",
        node: this.topic,
        fan: this.fan,
        valve: this.valve,
        inlet: this.inlet,
      }),
    );
  }

  tick() {
    let now = new Date();
    if (shouldUpdate(this.lastSent)) {
      this.lastSent = now.getTime();
      this.publish();
    }
  }
}
