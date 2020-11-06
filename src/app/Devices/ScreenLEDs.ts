import { MqttClient } from "mqtt";

export default class ScreenLEDs {
  nodeName = "Screen LEDs";
  red = 255;
  green = 255;
  blue = 255;
  mode = 0;
  client;

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
        red: this.red,
        green: this.green,
        blue: this.blue,
        mode: this.mode,
      }),
    );
  }
}
