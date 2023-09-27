require("dotenv").config();

export const mqttUrl = process.env.MQTT ?? "";
export const mqttLiveUrl = process.env.MQTT_LIVE ?? "";
