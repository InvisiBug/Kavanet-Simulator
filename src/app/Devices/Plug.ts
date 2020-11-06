import { MqttClient } from "mqtt";

export default class Plug {
  nodeName = "Plug";
  state = true;
  client;

  // constructor(private client: MqttClient) { } // Typesript weird

  constructor(client: MqttClient) {
    this.client = client; // Explicit from MqttClient
    this.publish();
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
}