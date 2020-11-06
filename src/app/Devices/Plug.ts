// import mqtt from "mqtt";

// var deviceData = {
//   isConnected: true,
//   isOn: true,
// };

// export const plugControl = (message: string) => {
//   if (message === "1") {
//     deviceData.isOn = true;
//   } else if (message === "0") {
//     deviceData.isOn = false;
//   }
// };

// export const plugMqtt = () => {
//   setInterval(() => {
//     publish();
//   }, 5 * 1000);
// };

// const publish = () => {
//   let client = mqtt.connect("mqtt://localHost");
//   client.publish("Plug", JSON.stringify(deviceData));
// };

import { MqttClient } from "mqtt";

export default class Plug {
  nodeName = "Plug";
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
      `${this.nodeName}`,
      JSON.stringify({
        node: this.nodeName,
        isOn: this.isOn,
        isConnected: this.isConnected,
      }),
    );
  }
}
