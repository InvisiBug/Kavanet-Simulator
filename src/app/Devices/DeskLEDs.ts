import { MqttClient } from "mqtt";
import { randFutureTime, shouldUpdate, publishOnConnect } from "../../Helpers/Functions";
export default class DeskLEDs {
  nodeName = "Desk LEDs";
  red: number = 255;
  green: number = 255;
  blue: number = 255;
  lastSent: number;
  client: MqttClient;

  constructor(client: MqttClient) {
    this.client = client;
    this.lastSent = randFutureTime();
    publishOnConnect() ? this.publish() : null;
  }

  message(message: string) {
    let x = message;
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
