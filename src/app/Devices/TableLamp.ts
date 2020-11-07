import { MqttClient } from "mqtt";
import { randFutureTime, publishOnConnect, shouldUpdate } from "../../Helpers/Functions";

export default class TableLamp {
  nodeName = "Table Lamp";
  red: number = 255;
  green: number = 255;
  blue: number = 255;
  lastSent: number;
  client: MqttClient;

  constructor(client: MqttClient) {
    this.client = client; // Explicit from MqttClient
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
