export const randBetween = (min: number, max: number) => {
  // return Math.random() * (max - min) + min;

  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};

export const randInteger = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

export const randFutureTime = (futureSecs = 7) => {
  let now: Date = new Date();

  return now.setSeconds(now.getSeconds() + randBetween(0, futureSecs));
};

export const shouldUpdate = (lastSent: number) => {
  return lastSent < Date.now() - 5 * 1000;
};

export const publishOnConnect = () => {
  return false;
};

export { mqttUrl, mqttLiveUrl } from "./mqttUrlGenerator";

// import * as dotenv from "dotenv";
// import dotenvExpand from "dotenv-expand";
// var myEnv = dotenv.config();
// dotenvExpand(myEnv);

// export const mongoUrl: string = process.env.MONGO ?? "";
// export const mqttUrl: string = process.env.MQTT ?? "";
