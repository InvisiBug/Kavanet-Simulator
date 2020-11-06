import chalk from "chalk";
import mqtt from "mqtt";

import Sun from "./app/Devices/Sun";
import { plugMqtt, plugControl } from "./app/Devices/Plug";
import { computerAudioMqtt, computerAudioControl } from "./app/Devices/ComputerAudio";
import { heatingSensor } from "./app/Devices/HeatingSensor";
import Heating from "./app/Devices/Heating";

// TODO Look at d.ts file (a decleration meaning you dont need to import types)

console.clear();
let client = mqtt.connect("mqtt://localhost");
// let client = mqtt.connect("mqtt://kavanet.io");

const sunDevice: Sun = new Sun(client);
const heatingDevice: Heating = new Heating(client);

setInterval(() => {
  sunDevice.publish();
  heatingDevice.publish();
}, 5 * 1000);

client.subscribe("#", (err) => {
  err ? console.log(err) : console.log("Subscribed to all");
});

client.on("connect", () => null);

// client.on("message", (topic, payload) => console.log(chalk.white("Topic: " + topic) + chalk.cyan(" \t" + payload)));

client.on("message", (topic, payload) => {
  let message = payload.toString();
  switch (topic) {
    case "Sun Control":
      sunDevice.message(message);
      break;

    case "plugControl":
      plugControl(message);
      break;

    case "computerAudioControl":
      computerAudioControl(message);
      break;

    case "heatingControl":
      heatingDevice.message(message);
      break;
  }
});

// Mqtt
plugMqtt();
computerAudioMqtt();

const sensors = ["Our Room", "Study", "Living Room", "Kitchen", "Liams Room"];

sensors.map((room) => {
  heatingSensor(room);
});
