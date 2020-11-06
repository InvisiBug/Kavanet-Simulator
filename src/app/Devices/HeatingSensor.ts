import { MqttClient } from "mqtt";
export default class HeatingSensor {
  nodeName: string;
  isConnected = true;
  temperature = 15.5;
  humidity = 59.9;
  pressure = 101459.2;
  battery = -150;
  // timeLastSent = new.date

  client; // Dont need to add type info here as its explicitly declared in the constructor

  constructor(client: MqttClient, nodeName: string) {
    this.client = client; // Explicit from MqttClient
    this.nodeName = nodeName;
  }

  // message(message: string) {}

  publish() {
    this.client.publish(
      `${this.nodeName} Heating Sensor`,
      JSON.stringify({
        node: `${this.nodeName} Heating Sensor`,
        isConnected: this.isConnected,
        temperature: this.temperature,
        humidity: this.humidity,
        pressure: this.pressure,
        battery: this.battery,
      }),
    );
  }
}
