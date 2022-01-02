/*
  Only the master on / off is simulated
*/
import { MqttClient } from "mqtt";
import { randFutureTime, publishOnConnect, shouldUpdate } from "../../utils";

export default class ComputerAudio {
  nodeName = "Computer Audio";
  left: boolean = true;
  right: boolean = true;
  sub: boolean = true;
  mixer: boolean = true;
  lastSent: number;
  client: MqttClient;

  constructor(client: MqttClient) {
    this.client = client;
    this.lastSent = randFutureTime();
    publishOnConnect() ? this.publish() : null;
  }

  handleIncoming(topic: String, rawPayload: Object) {
    if (topic === "Computer Audio Control") {
      const payload = JSON.parse(rawPayload.toString());

      if (payload === 1) {
        this.left = true;
        this.right = true;
        this.sub = true;
        this.mixer = true;
      } else if (payload === 0) {
        this.left = false;
        this.right = false;
        this.sub = false;
        this.mixer = false;
      } else {
        // The actual device still uses captials
        this.left = payload.Left;
        this.right = payload.Right;
        this.sub = payload.Sub;
        this.mixer = payload.Mixer;
        // console.error("invalid message");
      }
      this.publish();
    }
  }

  publish() {
    // The actual device still uses captials
    this.client.publish(
      `${this.nodeName}`,
      JSON.stringify({
        Node: this.nodeName,
        type: "special",
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
