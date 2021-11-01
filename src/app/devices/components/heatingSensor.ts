import { MqttClient } from "mqtt";
import { randFutureTime, shouldUpdate, publishOnConnect, randInteger } from "../../../helpers";
export default class HeatingSensor {
  nodeName: string;
  temperature: number;
  humidity: number = 10;
  pressure: number = 101459.2;

  timeToSend: number;
  client: MqttClient; // Dont need to add type info here as its explicitly declared in the constructor

  count: number = 0;

  min: number = 12;
  max: number = 23;

  adjustment: boolean;

  constructor(client: MqttClient, nodeName: string, temperature: number, adjustment: boolean = true) {
    this.temperature = temperature;
    this.client = client;
    this.nodeName = nodeName;
    this.timeToSend = randFutureTime();
    this.adjustment = adjustment;
    publishOnConnect() ? this.publish() : null;
  }

  publish() {
    this.client.publish(
      `${this.nodeName} Heating Sensor`,
      JSON.stringify({
        node: `${this.nodeName} Heating Sensor`,
        temperature: this.temperature,
        humidity: this.humidity,
        // pressure: this.pressure,
      }),
    );
  }
  handleIncoming(topic: string, payload: object) {}

  tick() {
    let now = new Date().getTime();
    if (shouldUpdate(this.timeToSend)) {
      this.timeToSend = now;
      this.publish();

      this.count += 1;

      if (this.adjustment && this.count === 1) {
        this.count = 0;
        if (this.temperature > this.min && this.temperature < this.max) {
          this.temperature = this.temperature + randInteger(-1, 1);
        } else if (this.temperature >= this.max) {
          this.temperature -= 5;
        } else if (this.temperature <= this.max) {
          this.temperature += 5;
        }
      }
    }
  }
}
