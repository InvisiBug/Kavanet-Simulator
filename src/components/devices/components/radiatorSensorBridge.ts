import mqtt, { MqttClient } from "mqtt";
require("dotenv").config();

export default class RadiatorMonitor {
  name: string;
  inlet: number = 0;
  outlet: number = 0;
  topic: string;

  kavanestMQTT: MqttClient;
  client: MqttClient;

  // This one opens an mqtt connection to kavanest and relays the chosen sensor
  constructor(client: MqttClient, deviceConfig: any = { name: null, topic: null }) {
    this.name = deviceConfig.name;
    this.client = client;
    this.topic = "Radiator Monitor";

    this.kavanestMQTT = mqtt.connect(process.env.MQTT_LIVE ?? "");

    this.kavanestMQTT.subscribe("Radiator Monitor", (err) => {
      err ? console.log(err) : null;
    });

    this.kavanestMQTT.on("connect", () => console.log(`Radiator Monitor relay connected to mqtt.kavanet.io`));

    this.kavanestMQTT.on("message", (_, rawPayload) => {
      try {
        const payload = JSON.parse(rawPayload.toString());
        // console.log(payload);
        this.inlet = payload.inlet;
        this.outlet = payload.outlet;
        this.publish();
      } catch (err) {
        console.log(`Radiator Monitor disconnected`);
      }
    });
  }

  publish() {
    this.client.publish(
      this.topic,
      JSON.stringify({
        // type: "Radiator Monitor",
        node: `Radiator Monitor`,
        inlet: this.inlet,
        outlet: this.outlet,
      }),
    );
  }

  handleIncoming(topic: string, payload: object) {}

  tick() {}
}
