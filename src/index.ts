import mqtt from "mqtt";

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
  sunDevice.publish();
  plugDevice.publish();
  radiatorFanDevice.publish();
  heatingDevice.publish();
  computerPowerDevice.publish();

  deskLEDsDevice.publish();
  screenLEDsDevice.publish();
  tableLampDevice.publish();

  computerAudioDevice.publish();

  livingRoomHeatingSensor.publish();
  kitchenHeatingSensor.publish();
  liamsRoomheatingSensor.publish();
  studyHeatingSensor.publish();
  ourRoomHeatingSensor.publish();
}, 5 * 1000);

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

    case "Computer Audio Control":
      computerAudioDevice.message(message);
      break;

    case "Heating Control":
      heatingDevice.message(message);
      break;

    case "Computer Power Control":
      computerPowerDevice.message(message);
      break;
  }
});
