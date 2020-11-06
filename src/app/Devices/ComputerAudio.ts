import { MqttClient } from "mqtt";

export default class ComputerAudio {
  nodeName = "Computer Audio";
  left = true;
  right = true;
  sub = true;
  mixer = true;
  client;

  // constructor(private client: MqttClient) { } // Typesript weird

  constructor(client: MqttClient) {
    this.client = client; // Explicit from MqttClient
    this.publish();
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
        node: this.nodeName,
        Left: this.left,
        Right: this.right,
        Sub: this.sub,
        Mixer: this.mixer,
      }),
    );
  }
}
