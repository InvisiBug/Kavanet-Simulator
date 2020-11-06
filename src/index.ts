import chalk from "chalk";
import mqtt from "mqtt";

import Sun from "./app/Devices/Sun";
import Plug from "./app/Devices/Plug";
import { computerAudioControl } from "./app/Devices/ComputerAudio";
import HeatingSensor from "./app/Devices/HeatingSensor";
import Heating from "./app/Devices/Heating";

// TODO Look at d.ts file (a decleration meaning you dont need to import types)

console.clear();
let client = mqtt.connect("mqtt://localhost");
// let client = mqtt.connect("mqtt://kavanet.io");

client.subscribe("#", (err) => {
  err ? console.log(err) : console.log("Subscribed to all");
});

client.on("connect", () => null);

// Devices
const sunDevice: Sun = new Sun(client);
const heatingDevice: Heating = new Heating(client);
const plugDevice: Plug = new Plug(client);

// Device Updates
setInterval(() => {
  sunDevice.publish();
  heatingDevice.publish();
  ourRoomHeatingSensor.publish();
  plugDevice.publish();
}, 5 * 1000);

client.on("message", (topic, payload) => {
  let message = payload.toString();
  switch (topic) {
    case "Sun Control":
      sunDevice.message(message);
      break;

    case "plugControl":
      plugDevice.message(message);
      break;

    case "computerAudioControl":
      computerAudioControl(message);
      break;

    case "heatingControl":
      heatingDevice.message(message);
      break;
  }
});

// const sensors = ["Our Room", "Study", "Living Room", "Kitchen", "Liams Room"];

// sensors.map((room) => { // how do you assign
//   // heatingSensor(room);
//   var
// });

const ourRoomHeatingSensor = new HeatingSensor(client, "Our Room");
