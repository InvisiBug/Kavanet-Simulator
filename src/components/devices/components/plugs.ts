import { MqttClient } from "mqtt";
import { randFutureTime, publishOnConnect, shouldUpdate } from "../../utils";

export default class Plug {
  client: MqttClient;
  name: string;
  topic: string;
  controlTopic: string;

  state = true;
  lastSent: number;

  constructor(client: MqttClient, deviceConfig: any) {
    this.name = deviceConfig.name;
    this.topic = deviceConfig.topic;
    this.controlTopic = deviceConfig.controlTopic;

    this.client = client;
    this.lastSent = randFutureTime();
    publishOnConnect() ? this.publish() : null;
  }

  handleIncoming(topic: String, rawPayload: Object) {
    if (topic === this.controlTopic) {
      const payload = JSON.parse(rawPayload.toString());

      if (payload === 1) {
        this.state = true;
      } else if (payload === 0) {
        this.state = false;
      } else {
        console.error("invalid message");
      }
      this.publish();
    }
  }

  publish() {
    this.client.publish(
      this.topic,
      JSON.stringify({
        // type: "1/0", //* Tried to make things auto detect
        node: this.name,
        state: this.state,
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
