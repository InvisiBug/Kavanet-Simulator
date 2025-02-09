import { MqttClient } from "mqtt";
import { randFutureTime, publishOnConnect, shouldUpdate } from "../../../utils";

export default class Bulb {
  client: MqttClient;
  name: string;
  topic: string;
  controlTopic: string;

  state = "ON";
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
      const payload: ControlPayload = JSON.parse(rawPayload.toString());

      console.log(payload);

      // `{"state":${state ? JSON.stringify("on") : JSON.stringify("off")}}`

      // if (payload.state === "ON") {
      //   this.state = "ON";
      // } else if (payload.state === "off") {
      //   this.state = "OFF";
      // } else {
      //   console.error("invalid message");
      // }

      this.state = payload.state;
      this.publish();
    }
  }

  publish() {
    this.client.publish(
      this.topic,
      JSON.stringify({
        power_on_behavior: "previous",
        state: this.state,
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
  power_on_behavior: "previous" | "on" | "off";
  state: "ON" | "OFF";
  voltage: number;
};

type ControlPayload = {
  state: "on" | "off";
};
