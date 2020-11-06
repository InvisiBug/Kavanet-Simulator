import mqtt from "mqtt";

var deviceData = {
  temperature: 15.5,
  humidity: 59.9,
  pressure: 101459.2,
  battery: -150,
};

export const heatingSensor = (name: string) => {
  setInterval(() => {
    publish(name);
  }, 5 * 1000);
};

const publish = (name: string) => {
  let client = mqtt.connect("mqtt://localHost");
  client.publish(`${name} Heating Sensor`, JSON.stringify(deviceData));
};
