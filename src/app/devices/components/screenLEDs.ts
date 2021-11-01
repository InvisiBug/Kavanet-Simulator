import { MqttClient } from "mqtt";
import { randFutureTime, publishOnConnect, shouldUpdate, randBetween } from "../../../helpers";

export default class ScreenLEDs {
  nodeName = "Screen LEDs";
  red: number = randBetween(0, 255);
  green: number = randBetween(0, 255);
  blue: number = randBetween(0, 255);
  mode: number = 0;
  lastSent: number;
  client;

  constructor(client: MqttClient) {
    this.client = client;
    this.lastSent = randFutureTime();
    publishOnConnect() ? this.publish() : null;
  }

  handleIncoming(topic: String, rawPayload: Object) {
    if (topic === "Sun Control") {
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
      `${this.nodeName}`,
      JSON.stringify({
        node: this.nodeName,
        red: this.red,
        green: this.green,
        blue: this.blue,
        mode: this.mode,
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
