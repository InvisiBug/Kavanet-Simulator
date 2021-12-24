import { MqttClient } from "mqtt";
import { randFutureTime, shouldUpdate, publishOnConnect, randInteger } from "../../utils";
export default class HeatingSensor {
  name: string;
  temperature: number;
  humidity: number = 10;
  topic: string;

  timeToSend: number;
  client: MqttClient;

  adjustmentInterval: number = 0;

  min: number = 12;
  max: number = 23;

  fluctuation: boolean;

  constructor(client: MqttClient, deviceConfig: any) {
    this.name = deviceConfig.name;
    this.client = client;
    this.topic = deviceConfig.topic;

    this.temperature = deviceConfig.startingTemp;
    this.timeToSend = randFutureTime();
    this.fluctuation = deviceConfig.fluctuation;
    publishOnConnect() ? this.publish() : null;
  }

  publish() {
    this.client.publish(
      this.topic,
      JSON.stringify({
        node: `${this.name} Heating Sensor`,
        type: "heatingSensor",
        temperature: this.temperature,
        humidity: this.humidity,
      }),
    );
  }

  handleIncoming(topic: string, payload: object) {}

  tick() {
    let now = new Date().getTime();
    if (shouldUpdate(this.timeToSend)) {
      this.timeToSend = now;
      this.publish();

      this.adjustmentInterval += 1;

      if (this.fluctuation && this.adjustmentInterval === 5) {
        this.adjustmentInterval = 0;
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
