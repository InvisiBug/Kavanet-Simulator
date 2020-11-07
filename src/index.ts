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
console.clear();
let client = mqtt.connect("mqtt://localhost");
// let client = mqtt.connect("mqtt://kavanet.io");

client.subscribe("#", (err) => {
  err ? console.log(err) : console.log("Subscribed to all");
});
// client.on("message", (topic, payload) => console.log(chalk.white("Topic: " + topic) + chalk.cyan(" \t" + payload)));
client.on("message", (_, payload) => {
  console.log(chalk.white("Topic: " + _) + chalk.cyan(" \t" + payload));
  // console.log(chalk.yellow(payload.toString()));
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

const livingRoomHeatingSensor: HeatingSensor = new HeatingSensor(client, "Living Room");
const kitchenHeatingSensor: HeatingSensor = new HeatingSensor(client, "Kitchen");
const liamsRoomheatingSensor: HeatingSensor = new HeatingSensor(client, "Liams Room");
const studyHeatingSensor: HeatingSensor = new HeatingSensor(client, "Study");
const ourRoomHeatingSensor: HeatingSensor = new HeatingSensor(client, "Our Room");

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
  sunDevice.tick();
  plugDevice.tick();
  radiatorFanDevice.tick();
  heatingDevice.tick();
  computerPowerDevice.tick();
  deskLEDsDevice.tick();
  screenLEDsDevice.tick();
  tableLampDevice.tick();
  computerAudioDevice.tick();
  livingRoomHeatingSensor.tick();
  kitchenHeatingSensor.tick();
  liamsRoomheatingSensor.tick();
  studyHeatingSensor.tick();
  ourRoomHeatingSensor.tick();
  // console.log("tick");
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

    case "Desk LED Control":
      deskLEDsDevice.message(message);
      break;

    case "Screen LEDs Control":
      screenLEDsDevice.message(message);
      break;

    case "Table Lamp Control":
      tableLampDevice.message(message);
      break;

    // case "Computer Audio Control":
    //   computerAudioDevice.message(message);
    //   break;

    // case "Heating Control":
    //   heatingDevice.message(message);
    //   break;

    // case "Computer Power Control":
    //   computerPowerDevice.message(message);
    //   break;

    // TODO, Add all control topics
  }
});
// //This adds the the line printed information to all console.logs
// ["log", "warn", "error"].forEach((methodName) => {
//   const originalMethod = console[methodName];
//   console[methodName] = (...args) => {
//     try {
//       throw new Error();
//     } catch (error) {
//       originalMethod.apply(console, [
//         ...args,
//         chalk.yellow(
//           "\t",
//           error.stack // Grabs the stack trace
//             .split("\n")[2] // Grabs third line
//             .trim(3) // Removes spaces
//             .replace(__dirname, "") // Removes script folder path
//             .replace(/\s\(./, " ") // Removes first parentheses and replaces it with " at "
//             .replace(/\)/, "") // Removes last parentheses
//             .split(" ")
//             .pop(),
//         ),
//       ]);
//     }
//   };
// });
