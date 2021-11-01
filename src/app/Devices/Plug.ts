import { MqttClient } from "mqtt";
import { randFutureTime, publishOnConnect, shouldUpdate } from "../../helpers";

export default class Plug {
  nodeName: string = "Plug";
  state: boolean = true;
  lastSent: number;
  client: MqttClient;

  constructor(client: MqttClient) {
    this.client = client;
    this.lastSent = randFutureTime();
    publishOnConnect() ? this.publish() : null;
  }

  handleIncoming(topic: String, rawPayload: Object) {
    const payload = JSON.parse(rawPayload.toString());

    if (topic === "Sun Control") {
      if (payload === 1) {
        this.state = true;
      } else if (payload === 0) {
        this.state = false;
      } else {
        console.error("invalid message");
      }
      this.publish();
    }
  }

  publish() {
    this.client.publish(
      `${this.nodeName}`,
      JSON.stringify({
        node: this.nodeName,
        state: this.state,
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
