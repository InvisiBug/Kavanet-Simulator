import mqtt from "mqtt";

var deviceData = {
  isConnected: true,
  isOn: true,
};

export const plugControl = (message: string) => {
  if (message === "1") {
    deviceData.isOn = true;
  } else if (message === "0") {
    deviceData.isOn = false;
  }
};

export const plugMqtt = () => {
  setInterval(() => {
    publish();
  }, 5 * 1000);
};

const publish = () => {
  let client = mqtt.connect("mqtt://localHost");
  client.publish("Plug", JSON.stringify(deviceData));
};
