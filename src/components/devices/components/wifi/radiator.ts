import { MqttClient } from "mqtt";
import { randFutureTime, publishOnConnect, shouldUpdate } from "../../../utils";

export default class ComputerAudio {
  client: MqttClient;
  lastSent: number;
  topic: string;
  controlTopic: string;

  fan: number = 1;
  valve: number = 1;
  inlet: number = 25;

  constructor(client: MqttClient, deviceConfig: any) {
    this.topic = deviceConfig.topic;
    this.controlTopic = deviceConfig.controlTopic;
    console.log(this.topic);

    this.client = client;
    this.lastSent = randFutureTime();
    publishOnConnect() ? this.publish() : null;
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
        // type: "radiator",
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
