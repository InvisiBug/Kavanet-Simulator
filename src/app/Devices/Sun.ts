import { MqttClient } from "mqtt";

export default class Sun {
  nodeName = "Sun";
  isConnected = true;
  isOn = true;
  client;

  // constructor(private client: MqttClient) { } // Typesript weird

  constructor(client: MqttClient) {
    this.client = client; // Explicit from MqttClient
  }

  message(message: string) {
    if (message === "1") {
      this.isOn = true;
    } else if (message === "0") {
      this.isOn = false;
    } else {
      console.error("invalid message");
    }
  }

  publish() {
    this.client.publish(
      "Sun",
      JSON.stringify({
        node: this.nodeName,
        isOn: this.isOn,
        isConnected: this.isConnected,
      }),
    );
  }
}
