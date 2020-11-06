import mqtt, { MqttClient } from "mqtt";
export default class Heating {
  nodeName = "Heating";
  isConnected = true;
  isOn = true;
  client; // Dont need to add type info here as its explicitly declared in the constructor

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
      "Heating",
      JSON.stringify({
        node: this.nodeName,
        isOn: this.isOn,
        isConnected: this.isConnected,
      }),
    );
  }
}
