import { MqttClient } from "mqtt";
import { randFutureTime, publishOnConnect, shouldUpdate } from "../../utils";

export default class ComputerAudio {
  client: MqttClient;
  lastSent: number;
  topic: string;
  controlTopic: string;

  fan: boolean = true;
  valve: boolean = true;
  temperature: number = 25;

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

      this.fan = payload.fan;
      this.valve = payload.valve;

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
        temperature: this.temperature,
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
