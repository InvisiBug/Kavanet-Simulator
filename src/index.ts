import chalk from "chalk";
import mqtt from "mqtt";

// import heatingSensor from "./app/Devices/Heating Sensor";

// TODO Look at d.ts file (a decleration meaning you dont need to import types)

console.clear();
let client = mqtt.connect("mqtt://localhost");
// let client = mqtt.connect("mqtt://kavanet.io");

client.subscribe("#", (err) => {
  err ? console.log(err) : console.log("Subscribed to all");
});

client.on("connect", () => null);

client.on("message", (topic, payload) => console.log(chalk.white("Topic: " + topic) + chalk.cyan(" \t" + payload)));

// heatingSensor();
// heatingSensor();
