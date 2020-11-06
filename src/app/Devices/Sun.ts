import mqtt from "mqtt";

var deviceData = {
  isConnected: true,
  isOn: true,
};

export const sunControl = (message: string) => {
  if (message === "1") {
    deviceData.isOn = true;
  } else if (message === "0") {
    deviceData.isOn = false;
  }
};

export const sunMqtt = () => {
  setInterval(() => {
    publish();
  }, 5 * 1000);
};

const publish = () => {
  let client = mqtt.connect("mqtt://localHost");
  client.publish("Sun", JSON.stringify(deviceData));
};
