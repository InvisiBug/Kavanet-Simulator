require("dotenv").config();
const environment: string = process.env.ENVIRONMENT ?? "";

export let mqttUrl: string = "";

switch (environment) {
  case "live":
    console.log("Running in live 🔥");
    mqttUrl = process.env.MQTT_LIVE ?? "";
    break;

  case "test":
    console.log("Running in test 🧪");
    mqttUrl = process.env.MQTT_TEST ?? "";
    break;

  case "local":
    console.log("Running locally on this computer💻");
    mqttUrl = process.env.MQTT_LOCAL ?? ""; // Development
    break;

  case "docker":
    console.log("Running in docker 🐳");
    break;
}
