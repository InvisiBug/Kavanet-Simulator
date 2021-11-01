import mqtt from "mqtt";
import chalk from "chalk";

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
import Sun from "./app/devices/Sun";
import Plug from "./app/devices/Plug";
import ComputerAudio from "./app/devices/ComputerAudio";
import HeatingSensor from "./app/devices/HeatingSensor";
import Heating from "./app/devices/Heating";
import DeskLEDs from "./app/devices/DeskLEDs";
import ScreenLEDs from "./app/devices/ScreenLEDs";
import TableLamp from "./app/devices/TableLamp";
import RadiatorFan from "./app/devices/RadiatorFan";
import ComputerPower from "./app/devices/ComputerPower";
import RadiatorValve from "./app/devices/RadiatorValve";
console.log("hello");

// TODO Look at d.ts file (a decleration meaning you dont need to import types)

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
// console.clear();
let client = mqtt.connect("mqtt://localhost");
// let client = mqtt.connect("mqtt://mosquitto"); // Docker
// let client = mqtt.connect("mqtt://kavanet.io");

client.subscribe("#", (err) => {
  err ? console.log(err) : console.log("Subscribed to all \t", chalk.cyan("MQTT messages will appear shortly"));
});

client.on("message", (_, payload) => {
  console.log(chalk.yellow(payload.toString()));
});

client.on("connect", () => console.log("Simulator connected to MQTT"));

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
// Devices
// const sunDevice: Sun = new Sun(client);
// const plugDevice: Plug = new Plug(client);
// const radiatorFanDevice: RadiatorFan = new RadiatorFan(client);
// const heatingDevice: Heating = new Heating(client);
// const computerPowerDevice: ComputerPower = new ComputerPower(client);

// const deskLEDsDevice: DeskLEDs = new DeskLEDs(client);
// const screenLEDsDevice: ScreenLEDs = new ScreenLEDs(client);
// const tableLampDevice: TableLamp = new TableLamp(client);

// const computerAudioDevice: ComputerAudio = new ComputerAudio(client);

// const livingRoomHeatingSensor: HeatingSensor = new HeatingSensor(client, "Living Room", 16, false);
// const kitchenHeatingSensor: HeatingSensor = new HeatingSensor(client, "Kitchen", 16, false);
// const liamsRoomheatingSensor: HeatingSensor = new HeatingSensor(client, "Liams Room", 16, false);
// const studyHeatingSensor: HeatingSensor = new HeatingSensor(client, "Study", 16, false);
// const ourRoomHeatingSensor: HeatingSensor = new HeatingSensor(client, "Our Room", 16, false);

// const livingRoomRadiatorValve: RadiatorValve = new RadiatorValve(client, "Living Room");
// const liamsRoomRadiatorValve: RadiatorValve = new RadiatorValve(client, "Liams Room");
// const studyRadiatorValve: RadiatorValve = new RadiatorValve(client, "Study");
// const ourRoomRadiatorValve: RadiatorValve = new RadiatorValve(client, "Our Room");

let devices: Array<any> = [];

// devices.push(new Sun(client));
// devices.push(new Plug(client));
// devices.push(new RadiatorFan(client));
// devices.push(new Heating(client));
// devices.push(new ComputerPower(client));

// devices.push(new DeskLEDs(client));
// devices.push(new ScreenLEDs(client));
// devices.push(new TableLamp(client));

devices.push(new ComputerAudio(client));

devices.push(new HeatingSensor(client, "Living Room", 16, false));
devices.push(new HeatingSensor(client, "Kitchen", 16, false));
devices.push(new HeatingSensor(client, "Liams Room", 16, false));
devices.push(new HeatingSensor(client, "Study", 16, false));
devices.push(new HeatingSensor(client, "Our Room", 16, false));

// devices.push(new RadiatorValve(client, "Living Room"));
// devices.push(new RadiatorValve(client, "Liams Room"));
// devices.push(new RadiatorValve(client, "Study"));
// devices.push(new RadiatorValve(client, "Our Room"));

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
client.on("message", (topic, payload) => {
  try {
    for (let i = 0; i < devices.length; i++) {
      devices[i].handleIncoming(topic, payload);
    }
  } catch (error: unknown) {
    console.log(error);
  }

  // switch (topic) {
  //   case "Sun Control":
  //     sunDevice.message(message);
  //     break;

  //   case "Plug Control":
  //     plugDevice.message(message);
  //     break;

  //   case "Radiator Fan Control":
  //     radiatorFanDevice.message(message);
  //     break;

  //   case "Heating Control":
  //     heatingDevice.message(message);
  //     break;

  //   case "Computer Power Control":
  //     computerPowerDevice.message(message);
  //     break;

  //   case "Computer Audio Control":
  //     computerAudioDevice.message(message);
  //     break;

  //   case "Desk LED Control":
  //     deskLEDsDevice.message(message);
  //     break;

  //   case "Screen LEDs Control":
  //     screenLEDsDevice.message(message);
  //     break;

  //   case "Table Lamp Control":
  //     tableLampDevice.message(message);
  //     break;

  //   case "Living Room Radiator Valve Control":
  //     livingRoomRadiatorValve.message(message);
  //     break;

  //   case "Liams Room Radiator Valve Control":
  //     liamsRoomRadiatorValve.message(message);
  //     break;

  //   case "Study Radiator Valve Control":
  //     studyRadiatorValve.message(message);
  //     break;

  //   case "Our Room Radiator Valve Control":
  //     ourRoomRadiatorValve.message(message);
  //     break;
  // }
});
