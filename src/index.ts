// console.log("Hello World");
// setInterval(() => console.log("Helloooooo"), 1000);

// if (true) {
//   console.log("do something");
// }

// if (true) {
//   console.log("do something else");
// }

// if (false) {
//   console.log("kjsadhksjh");
// }

// declare module NodeJS {
//   interface Global {
//     client: any;
//   }
// }
// const chalk = require("chalk");
import chalk from "chalk";
import mqtt from "mqtt";
// const mqtt = require("mqtt");
// global.client = mqtt.connect("mqtt://192.168.1.46");
// let client = mqtt.connect("mqtt://kavanet.io");
let client = mqtt.connect("mqtt://localhost");

// client.setMaxListeners(16); // Disables event listener warning

client.subscribe("#", (err) => {
  err ? console.log(err) : console.log("Subscribed to all");
});

client.on("connect", () => null);

client.on("message", (topic, payload) => console.log(chalk.white("Topic: " + topic) + chalk.cyan(" \t" + payload)));
