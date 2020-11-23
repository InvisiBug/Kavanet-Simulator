import { MqttClient } from "mqtt";
import { randFutureTime, publishOnConnect, shouldUpdate, randBetween } from "../../Helpers/Functions";

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

  message(message: string) {
    if (message === "1") {
      this.mode = 1;
    } else if (message === "0") {
      this.mode = 0;
    } else {
      this.red = JSON.parse(message).red;
      this.green = JSON.parse(message).green;
      this.blue = JSON.parse(message).blue;
    }
    this.publish();
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
