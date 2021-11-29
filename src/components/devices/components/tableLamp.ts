import { MqttClient } from "mqtt";
import { randFutureTime, publishOnConnect, shouldUpdate, randBetween } from "../../helpers";

export default class TableLamp {
  nodeName = "Table Lamp";
  red: number = randBetween(0, 255);
  green: number = randBetween(0, 255);
  blue: number = randBetween(0, 255);
  lastSent: number;
  client: MqttClient;

  constructor(client: MqttClient) {
    this.client = client;
    this.lastSent = randFutureTime();
    publishOnConnect() ? this.publish() : null;
  }

  handleIncoming(topic: String, rawPayload: Object) {
    if (topic === "Table Lamp Control") {
      const payload = JSON.parse(rawPayload.toString());

      this.red = JSON.parse(payload).red;
      this.green = JSON.parse(payload).green;
      this.blue = JSON.parse(payload).blue;
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
