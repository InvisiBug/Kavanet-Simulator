import { MqttClient } from "mqtt";
import { randFutureTime, shouldUpdate, publishOnConnect } from "../../Helpers/Functions";
export default class DeskLEDs {
  nodeName = "Desk LEDs";
  red: number = 0;
  green: number = 0;
  blue: number = 0;
  lastSent: number;
  client: MqttClient;

  constructor(client: MqttClient) {
    this.client = client;
    this.lastSent = randFutureTime();
    publishOnConnect() ? this.publish() : null;
  }

  message(message: string) {
    this.red = JSON.parse(message).red;
    this.green = JSON.parse(message).green;
    this.blue = JSON.parse(message).blue;
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
