import { MqttClient } from "mqtt";
// import RadiatorMonitor from "./devices/components/radiatorSensorBridge";
import {
  ComputerAudio,
  Plugs,
  Valves,
  HeatingSensors,
  RBGLights,
  HeatingSensorBridges,
  Radiator,
  RadiatorTemperatureBridge,
  ZigbeeSensor,
  ZigbeePlugs,
  ZigbeeSensorBridge,
} from "./devices/index";

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

    case "radiators":
      return new Radiator(client, deviceConfig);

    case "radiatorTemperatureBridges":
      return new RadiatorTemperatureBridge(client, deviceConfig);

    case "zigbeeSensors":
      return new ZigbeeSensor(client, deviceConfig);

    case "zigbeePlugs":
      return new ZigbeePlugs(client, deviceConfig);

    case "zigbeeSensorBridges":
      return new ZigbeeSensorBridge(client, deviceConfig);

    case "specials":
      if (deviceConfig.name === "computerAudio") return new ComputerAudio(client);
  }
};
