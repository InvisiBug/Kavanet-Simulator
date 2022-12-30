import DeviceCreator from "./components/deviceCreator";
import { readFileSync } from "fs";
import { load } from "js-yaml";
require("dotenv").config();
import chalk from "chalk";
import mqtt from "mqtt";
import path from "path";
import { mqttUrl } from "./components/utils";

/////////////
// MQTT Stuff
let client: mqtt.MqttClient;
console.log(mqttUrl);
client = mqtt.connect(mqttUrl);

client.subscribe("#", (err) => {
  err
    ? console.log("Error, You probably dont have an MQTT broker running")
    : console.log("Subscribed to all \t", chalk.cyan("MQTT messages will appear shortly"));
});

client.on("message", (_, payload) => {
  console.log(chalk.yellow(payload.toString()));
});

client.on("connect", () => console.log("Simulator connected to", mqttUrl));

//////////
// Devices
const deviceConfig: any = load(readFileSync(path.resolve(__dirname, "./devices.yaml"), "utf-8"));

let devices: Array<any> = [];

for (let deviceType in deviceConfig) {
  deviceConfig[deviceType].forEach((node: any) => {
    devices.push(DeviceCreator(client, node, deviceType));
  });
}

// devices.push(new RadiatorMonitorBridge(client));

setInterval(() => {
  try {
    for (let i = 0; i < devices.length; i++) {
      devices[i].tick();
    }
  } catch (error: unknown) {
    console.log(error);
  }
}, 10);

client.on("message", (topic: string, payload) => {
  try {
    for (let i = 0; i < devices.length; i++) {
      devices[i].handleIncoming(topic, payload);
    }
  } catch (error: unknown) {
    console.log(error);
  }
});
