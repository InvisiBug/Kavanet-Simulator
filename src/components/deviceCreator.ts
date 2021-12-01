import { MqttClient } from "mqtt";
import { ComputerAudio, Plugs, Valves, HeatingSensors, RBGLights, HeatingSensorBridges } from "./devices/index";

export default (client: MqttClient, deviceConfig: any, deviceType: any) => {
  switch (deviceType) {
    case "plugs":
      return new Plugs(client, deviceConfig);

    case "valves":
      return new Valves(client, deviceConfig);

    case "heatingSensors":
      return new HeatingSensors(client, deviceConfig);

    case "heatingSensorBridges":
      return new HeatingSensorBridges(client, deviceConfig);

    case "rgbLights":
      return new RBGLights(client, deviceConfig);

    case "specials":
      if (deviceConfig.name === "computerAudio") return new ComputerAudio(client);
  }
};