import mqtt, { MqttClient } from "mqtt";

// var deviceData = {
//   isConnected: true,
//   isOn: true,
// };

// export const heatingControl = (message: string) => {
//   if (message === "1") {
//     deviceData.isOn = true;
//   } else if (message === "0") {
//     deviceData.isOn = false;
//   }
// };

// export const heatingMqtt = () => {
//   setInterval(() => {
//     publish();
//   }, 5 * 1000);
// };

// const publish = () => {
//   let client = mqtt.connect("mqtt://localHost");
//   client.publish("Heating", JSON.stringify(deviceData));
// };

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
