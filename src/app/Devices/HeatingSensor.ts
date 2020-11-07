import { MqttClient } from "mqtt";
import { randFutureTime, shouldUpdate, publishOnConnect } from "../../Helpers/Functions";
export default class HeatingSensor {
  nodeName: string;
  temperature: number = 15.5;
  humidity: number = 59.9;
  pressure: number = 101459.2;
  battery: number = -150;

  lastSent: number;
  client: MqttClient; // Dont need to add type info here as its explicitly declared in the constructor

  constructor(client: MqttClient, nodeName: string) {
    this.client = client; // Explicit from MqttClient
    this.nodeName = nodeName;
    this.lastSent = randFutureTime();
    publishOnConnect() ? this.publish() : null;
  }

  publish() {
    this.client.publish(
      `${this.nodeName} Heating Sensor`,
      JSON.stringify({
        node: `${this.nodeName} Heating Sensor`,
        temperature: this.temperature,
        humidity: this.humidity,
        pressure: this.pressure,
        battery: this.battery,
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
