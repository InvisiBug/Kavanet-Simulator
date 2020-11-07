import mqtt, { MqttClient } from "mqtt";
import { randFutureTime, shouldUpdate, publishOnConnect } from "../../Helpers/Functions";
export default class RadiatorFan {
  nodeName = "Radiator Fan";
  state = false;
  lastSent: number;
  client: MqttClient;

  constructor(client: MqttClient) {
    this.client = client; // Explicit from MqttClient
    this.lastSent = randFutureTime();
    publishOnConnect() ? this.publish() : null;
  }

  message(message: string) {
    if (message === "1") {
      this.state = true;
    } else if (message === "0") {
      this.state = false;
    } else {
      console.error("invalid message");
    }
    this.publish();
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
