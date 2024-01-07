import { MqttClient } from "mqtt";
import { randFutureTime, publishOnConnect, shouldUpdate } from "../../../utils";

export default class Plug {
  client: MqttClient;
  name: string;
  topic: string;

  lastSent: number;

  constructor(
    client: MqttClient,
    deviceConfig: {
      name: string;
      topic: string;
      controlTopic?: string;
    },
  ) {
    this.name = deviceConfig.name;
    this.topic = deviceConfig.topic;

    this.client = client;
    this.lastSent = randFutureTime();
    publishOnConnect() ? this.publish() : null;
  }

  handleIncoming(topic: String, rawPayload: Object) {}

  publish() {
    this.client.publish(
      `zigbee2mqtt/${this.topic}`,
      JSON.stringify({
        battery: 3000,
        humidity: 50,
        linkquality: 87,
        temperature: 16,
        voltage: 238,
      } as Payload),
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

type Payload = {
  battery: number;
  humidity: number;
  linkquality: number;
  temperature: number;
  voltage: number;
};
