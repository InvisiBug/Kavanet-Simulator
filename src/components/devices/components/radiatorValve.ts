import { MqttClient } from "mqtt";
import { randFutureTime, publishOnConnect, shouldUpdate } from "../../helpers";

export default class RadiatorValve {
  nodeName: string;
  state: boolean = true;
  lastSent: number;
  client: MqttClient;

  constructor(client: MqttClient, nodeName: string) {
    this.client = client;
    this.nodeName = nodeName;
    this.lastSent = randFutureTime();
    publishOnConnect() ? this.publish() : null;
  }

  handleIncoming(topic: String, rawPayload: Object) {
    if (topic === "Sun Control") {
      const payload = JSON.parse(rawPayload.toString());

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
      `${this.nodeName} Radiator Valve`,
      JSON.stringify({
        node: `${this.nodeName} Radiator Valve`,
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
