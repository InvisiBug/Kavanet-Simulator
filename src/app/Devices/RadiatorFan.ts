import mqtt, { MqttClient } from "mqtt";
export default class RadiatorFan {
  nodeName = "Radiator Fan";
  state = true;
  client; // Dont need to add type info here as its explicitly declared in the constructor

  constructor(client: MqttClient) {
    this.client = client; // Explicit from MqttClient
    this.publish();
  }

  message(message: string) {
    // if (message === "1") {
    //   this.isOn = true;
    // } else if (message === "0") {
    //   this.isOn = false;
    // } else {
    //   console.error("invalid message");
    // }
    let x = message;
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
