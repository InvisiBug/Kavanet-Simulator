import { MqttClient } from "mqtt";
// import RadiatorMonitor from "./devices/components/radiatorSensorBridge";
import {
  ComputerAudio,
  Plugs,
  Valves,
  RBGLights,
  Radiator,
  ZigbeeSensor,
  ZigbeePlugs,
  ZigbeeSensorBridge,
  ZigbeeBulbs,
  ZigbeeRGBStrips,
  RadiatorBridge,
  ZigbeeMotionBridge,
} from "./devices/index";

export default (client: MqttClient, deviceConfig: any, deviceType: any) => {
  switch (deviceType) {
    case "plugs":
      return new Plugs(client, deviceConfig);

    case "valves":
      return new Valves(client, deviceConfig);

    case "rgbLights":
      return new RBGLights(client, deviceConfig);

    case "radiators":
      return new Radiator(client, deviceConfig);

    case "radiatorBridges":
      return new RadiatorBridge(client, deviceConfig);

    case "zigbeeSensors":
      return new ZigbeeSensor(client, deviceConfig);

    case "zigbeePlugs":
      return new ZigbeePlugs(client, deviceConfig);

    case "zigbeeBulbs":
      return new ZigbeeBulbs(client, deviceConfig);

    case "zigbeeSensorBridges":
      return new ZigbeeSensorBridge(client, deviceConfig);

    case "zigbeeMotionBridges":
      return new ZigbeeMotionBridge(client, deviceConfig);

    case "zigbeeRGBStrips":
      return new ZigbeeRGBStrips(client, deviceConfig);

    case "specials":
      if (deviceConfig.name === "computerAudio") return new ComputerAudio(client);

    default:
      console.error("Device not found: ", deviceType);
  }
};
