import chalk from "chalk";
import mqtt from "mqtt";

import { sunMqtt, sunControl } from "./app/Devices/Sun";
import { plugMqtt, plugControl } from "./app/Devices/Plug";
import { computerAudioMqtt, computerAudioControl } from "./app/Devices/ComputerAudio";
import { heatingSensor } from "./app/Devices/HeatingSensor";
import { heatingMqtt, heatingControl } from "./app/Devices/Heating";

// TODO Look at d.ts file (a decleration meaning you dont need to import types)

console.clear();
let client = mqtt.connect("mqtt://localhost");
// let client = mqtt.connect("mqtt://kavanet.io");

client.subscribe("#", (err) => {
  err ? console.log(err) : console.log("Subscribed to all");
});

client.on("connect", () => null);

// client.on("message", (topic, payload) => console.log(chalk.white("Topic: " + topic) + chalk.cyan(" \t" + payload)));

client.on("message", (topic, payload) => {
  let message = payload.toString();
  switch (topic) {
    case "Sun Control":
      sunControl(message);
      break;

    case "plugControl":
      plugControl(message);
      break;

    case "computerAudioControl":
      computerAudioControl(message);
      break;

    case "heatingControl":
      heatingControl(message);
      break;
  }
});

// Mqtt
sunMqtt();
plugMqtt();
computerAudioMqtt();
heatingMqtt();

const sensors = ["Our Room", "Study", "Living Room", "Kitchen", "Liams Room"];

sensors.map((room) => {
  heatingSensor(room);
});
