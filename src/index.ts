import mqtt from "mqtt";
import chalk from "chalk";
require("dotenv").config();

////////////////////////////////////////////////////////////////////////
//
// ######                                   ###
// #     # ###### #    # #  ####  ######     #  #    # #####   ####  #####  #####  ####
// #     # #      #    # # #    # #          #  ##  ## #    # #    # #    #   #   #
// #     # #####  #    # # #      #####      #  # ## # #    # #    # #    #   #    ####
// #     # #      #    # # #      #          #  #    # #####  #    # #####    #        #
// #     # #       #  #  # #    # #          #  #    # #      #    # #   #    #   #    #
// ######  ######   ##   #  ####  ######    ### #    # #       ####  #    #   #    ####
//
////////////////////////////////////////////////////////////////////////
import {
  plug,
  sun,
  computerAudio,
  heatingSensor,
  heating,
  deskLEDs,
  screenLEDs,
  tableLamp,
  radiatorFan,
  computerPower,
  radiatorValve,
} from "./app/devices";

////////////////////////////////////////////////////////////////////////
//
// #     #  #####  ####### #######
// ##   ## #     #    #       #
// # # # # #     #    #       #
// #  #  # #     #    #       #
// #     # #   # #    #       #
// #     # #    #     #       #
// #     #  #### #    #       #
//
////////////////////////////////////////////////////////////////////////
let client = mqtt.connect(process.env.MQTT ?? "");

client.subscribe("#", (err) => {
  err ? console.log(err) : console.log("Subscribed to all \t", chalk.cyan("MQTT messages will appear shortly"));
});

client.on("message", (_, payload) => {
  console.log(chalk.yellow(payload.toString()));
});

client.on("connect", () => console.log("Simulator connected to", process.env.MQTT ?? ""));

////////////////////////////////////////////////////////////////////////
//
// ######                                   ###
// #     # ###### #    # #  ####  ######     #  #    # # ##### #   ##   #      #  ####    ##   ##### #  ####  #    #
// #     # #      #    # # #    # #          #  ##   # #   #   #  #  #  #      # #       #  #    #   # #    # ##   #
// #     # #####  #    # # #      #####      #  # #  # #   #   # #    # #      #  ####  #    #   #   # #    # # #  #
// #     # #      #    # # #      #          #  #  # # #   #   # ###### #      #      # ######   #   # #    # #  # #
// #     # #       #  #  # #    # #          #  #   ## #   #   # #    # #      # #    # #    #   #   # #    # #   ##
// ######  ######   ##   #  ####  ######    ### #    # #   #   # #    # ###### #  ####  #    #   #   #  ####  #    #
//
////////////////////////////////////////////////////////////////////////
let devices: Array<any> = [];

devices.push(new sun(client));
devices.push(new plug(client));
devices.push(new radiatorFan(client));
devices.push(new heating(client));
devices.push(new computerPower(client));

devices.push(new deskLEDs(client));
devices.push(new screenLEDs(client));
devices.push(new tableLamp(client));

devices.push(new computerAudio(client));

devices.push(new heatingSensor(client, "Living Room", 16, false));
devices.push(new heatingSensor(client, "Kitchen", 16, false));
devices.push(new heatingSensor(client, "Liams Room", 16, false));
devices.push(new heatingSensor(client, "Study", 16, false));
devices.push(new heatingSensor(client, "Our Room", 16, false));

devices.push(new radiatorValve(client, "Living Room"));
devices.push(new radiatorValve(client, "Liams Room"));
devices.push(new radiatorValve(client, "Study"));
devices.push(new radiatorValve(client, "Our Room"));

////////////////////////////////////////////////////////////////////////
//
// #     #
// #     # #####  #####    ##   ##### ######  ####
// #     # #    # #    #  #  #    #   #      #
// #     # #    # #    # #    #   #   #####   ####
// #     # #####  #    # ######   #   #           #
// #     # #      #    # #    #   #   #      #    #
//  #####  #      #####  #    #   #   ######  ####
//
////////////////////////////////////////////////////////////////////////
// Device Updates
setInterval(() => {
  try {
    for (let i = 0; i < devices.length; i++) {
      devices[i].tick();
    }
  } catch (error: unknown) {
    console.log(error);
  }
}, 10);

////////////////////////////////////////////////////////////////////////
//
//  #####
//  #     #  ####  #    # ##### #####   ####  #       ####
//  #       #    # ##   #   #   #    # #    # #      #
//  #       #    # # #  #   #   #    # #    # #       ####
//  #       #    # #  # #   #   #####  #    # #           #
//  #     # #    # #   ##   #   #   #  #    # #      #    #
//   #####   ####  #    #   #   #    #  ####  ######  ####
//
////////////////////////////////////////////////////////////////////////
client.on("message", (topic: string, payload) => {
  try {
    for (let i = 0; i < devices.length; i++) {
      devices[i].handleIncoming(topic, payload);
    }
  } catch (error: unknown) {
    console.log(error);
  }
});
