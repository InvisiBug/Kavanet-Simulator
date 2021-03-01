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
import Sun from "./app/Devices/Sun";
import Plug from "./app/Devices/Plug";
import ComputerAudio from "./app/Devices/ComputerAudio";
import HeatingSensor from "./app/Devices/HeatingSensor";
import Heating from "./app/Devices/Heating";
import DeskLEDs from "./app/Devices/DeskLEDs";
import ScreenLEDs from "./app/Devices/ScreenLEDs";
import TableLamp from "./app/Devices/TableLamp";
import RadiatorFan from "./app/Devices/RadiatorFan";
import ComputerPower from "./app/Devices/ComputerPower";
import RadiatorValve from "./app/Devices/RadiatorValve";

// TODO Look at d.ts file (a decleration meaning you dont need to import types)

////////////////////////////////////////////////////////////////////////
//
//      #  #####  ####### #######
// #   ## #     #    #       #
//  # # # #     #    #       #
//   #  # #     #    #       #
//      # #   # #    #       #
//      # #    #     #       #
//      #  #### #    #       #
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
  // if (_ === "Radiator Fan" || _ === "Radiator Fan Control") {
  // console.log(chalk.white(_) + chalk.cyan(" \t" + payload));
  // }
  console.log(chalk.yellow(payload.toString()));
});

client.on("connect", () => console.log("Simulator Connected"));

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
const sunDevice: Sun = new Sun(client);
const plugDevice: Plug = new Plug(client);
const radiatorFanDevice: RadiatorFan = new RadiatorFan(client);
const heatingDevice: Heating = new Heating(client);
const computerPowerDevice: ComputerPower = new ComputerPower(client);

const deskLEDsDevice: DeskLEDs = new DeskLEDs(client);
const screenLEDsDevice: ScreenLEDs = new ScreenLEDs(client);
const tableLampDevice: TableLamp = new TableLamp(client);

const computerAudioDevice: ComputerAudio = new ComputerAudio(client);

const livingRoomHeatingSensor: HeatingSensor = new HeatingSensor(client, "Living Room", 16, false);
const kitchenHeatingSensor: HeatingSensor = new HeatingSensor(client, "Kitchen", 16, false);
const liamsRoomheatingSensor: HeatingSensor = new HeatingSensor(client, "Liams Room", 16, false);
const studyHeatingSensor: HeatingSensor = new HeatingSensor(client, "Study", 16, false);
const ourRoomHeatingSensor: HeatingSensor = new HeatingSensor(client, "Our Room", 16, false);

const livingRoomRadiatorValve: RadiatorValve = new RadiatorValve(client, "Living Room");
const liamsRoomRadiatorValve: RadiatorValve = new RadiatorValve(client, "Liams Room");
const studyRadiatorValve: RadiatorValve = new RadiatorValve(client, "Study");
const ourRoomRadiatorValve: RadiatorValve = new RadiatorValve(client, "Our Room");

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
  // Lights
  sunDevice.tick();
  plugDevice.tick();
  deskLEDsDevice.tick();
  screenLEDsDevice.tick();
  screenLEDsDevice.tick();
  tableLampDevice.tick();

  // Misc Heating
  radiatorFanDevice.tick();
  heatingDevice.tick();

  // Computer
  computerPowerDevice.tick();
  computerAudioDevice.tick();

  // Heating Sensors
  livingRoomHeatingSensor.tick();
  kitchenHeatingSensor.tick();
  liamsRoomheatingSensor.tick();
  studyHeatingSensor.tick();
  ourRoomHeatingSensor.tick();

  // Radiator Valves
  livingRoomRadiatorValve.tick();
  liamsRoomRadiatorValve.tick();
  studyRadiatorValve.tick();
  ourRoomRadiatorValve.tick();
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
  let message = payload.toString();

  switch (topic) {
    case "Sun Control":
      sunDevice.message(message);
      break;

    case "Plug Control":
      plugDevice.message(message);
      break;

    case "Radiator Fan Control":
      radiatorFanDevice.message(message);
      break;

    case "Heating Control":
      heatingDevice.message(message);
      break;

    case "Computer Power Control":
      computerPowerDevice.message(message);
      break;

    case "Computer Audio Control":
      computerAudioDevice.message(message);
      break;

    case "Desk LED Control":
      deskLEDsDevice.message(message);
      break;

    case "Screen LEDs Control":
      screenLEDsDevice.message(message);
      break;

    case "Table Lamp Control":
      tableLampDevice.message(message);
      break;

    case "Living Room Radiator Valve Control":
      livingRoomRadiatorValve.message(message);
      break;

    case "Liams Room Radiator Valve Control":
      liamsRoomRadiatorValve.message(message);
      break;

    case "Study Radiator Valve Control":
      studyRadiatorValve.message(message);
      break;

    case "Our Room Radiator Valve Control":
      ourRoomRadiatorValve.message(message);
      break;
  }
});
