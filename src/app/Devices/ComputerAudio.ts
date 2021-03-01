/*
  Only the master on / off is simulated
*/
import { MqttClient } from "mqtt";
import { randFutureTime, publishOnConnect, shouldUpdate } from "../../Helpers/Functions";

export default class ComputerAudio {
  nodeName = "Computer Audio";
  left: boolean = true;
  right: boolean = true;
  sub: boolean = true;
  mixer: boolean = true;
  lastSent: number;
  client: MqttClient;

  constructor(client: MqttClient) {
    this.client = client; // Explicit from MqttClient
    this.lastSent = randFutureTime();
    publishOnConnect() ? this.publish() : null;
  }

  message(message: string) {
    if (message === "1") {
      this.left = true;
      this.right = true;
      this.sub = true;
      this.mixer = true;
    } else if (message === "0") {
      this.left = false;
      this.right = false;
      this.sub = false;
      this.mixer = false;
    } else {
      console.error("invalid message");
    }
    this.publish();
  }

  publish() {
    this.client.publish(
      `${this.nodeName}`,
      JSON.stringify({
        Node: this.nodeName,
        Left: this.left,
        Right: this.right,
        Sub: this.sub,
        Mixer: this.mixer,
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
