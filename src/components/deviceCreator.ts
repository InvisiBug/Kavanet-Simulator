import { MqttClient } from "mqtt";
import {
  computerPower,
  computerAudio,
  deskLEDs,
  heating,
  heatingSensor,
  plug,
  radiatorFan,
  radiatorValve,
  screenLEDs,
  sun,
  tableLamp,
} from "./devices/index";

export default (client: MqttClient, deviceConfig: any) => {
  switch (deviceConfig.type) {
    case "plug":
    // return new plug(client, deviceConfig);

    case "heatingSensor":
    // return new heatingSensor(client, deviceConfig);

    case "valve":
    // return new valve(client, deviceConfig);

    case "rgbLight":
      // return new rgbLight(client, deviceConfig);
      break;
  }
  console.log(deviceConfig.type);
};
