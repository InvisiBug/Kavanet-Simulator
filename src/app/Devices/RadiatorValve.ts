import { MqttClient } from "mqtt";
import { randFutureTime, publishOnConnect, shouldUpdate } from "../../Helpers/Functions";

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
