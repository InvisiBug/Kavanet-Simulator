import { MqttClient } from "mqtt";
import { randFutureTime, publishOnConnect, shouldUpdate, randBetween } from "../../utils";

export default class RBGLight {
  client: MqttClient;
  name: string;
  topic: string;
  controlTopic: string;
  multiMode: boolean;

  red: number = randBetween(0, 255);
  green: number = randBetween(0, 255);
  blue: number = randBetween(0, 255);
  mode: number = 0;
  lastSent: number;

  constructor(client: MqttClient, deviceConfig: any) {
    this.name = deviceConfig.name;
    this.topic = deviceConfig.topic;
    this.controlTopic = deviceConfig.controlTopic;
    this.multiMode = deviceConfig.multiMode;

    this.client = client;
    this.lastSent = randFutureTime();
    publishOnConnect() ? this.publish() : null;
  }

  handleIncoming(topic: String, rawPayload: Object) {
    if (topic === this.topic) {
      const payload = JSON.parse(rawPayload.toString());

      if (payload === 1) {
        this.mode = 1;
      } else if (payload === 0) {
        this.mode = 0;
      } else {
        this.red = JSON.parse(payload).red;
        this.green = JSON.parse(payload).green;
        this.blue = JSON.parse(payload).blue;
      }
      this.publish();
    }
  }

  publish() {
    this.client.publish(
      this.name,
      JSON.stringify({
        node: this.name,
        red: this.red,
        green: this.green,
        blue: this.blue,
        ...(this.multiMode && { mode: this.mode }),
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
