import mqtt from "mqtt";

var deviceData = {
  isConnected: true,
  isOn: true,
};

export const computerAudioControl = (message: string) => {
  if (message === "1") {
    deviceData.isOn = true;
  } else if (message === "0") {
    deviceData.isOn = false;
  }
};

export const computerAudioMqtt = () => {
  let client = mqtt.connect("mqtt://localHost");

  setInterval(() => {
    publish();
  }, 1000);
};

const publish = () => {
  let client = mqtt.connect("mqtt://localHost");
  client.publish("Computer Audio", JSON.stringify(deviceData));
};
