import { MqttClient } from "mqtt";
import { randFutureTime, shouldUpdate, publishOnConnect } from "../../../helpers";
export default class RadiatorFan {
  nodeName: string = "Radiator Fan";
  state: boolean = false;
  lastSent: number;
  client: MqttClient;

  constructor(client: MqttClient) {
    this.client = client; // Explicit from MqttClient
    this.lastSent = randFutureTime();
    publishOnConnect() ? this.publish() : null;
  }

  handleIncoming(topic: String, rawPayload: Object) {
    if (topic === "Radiator Fan Control") {
      const payload = JSON.parse(rawPayload.toString());

      if (payload === 1) {
        this.state = true;
      } else if (payload === 0) {
        this.state = false;
      } else {
        console.error("Radiator Fan: Invalid Message");
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
