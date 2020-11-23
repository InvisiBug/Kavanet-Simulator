export const randBetween = (min: number, max: number) => {
  // return Math.random() * (max - min) + min;

  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};

export const randFutureTime = () => {
  let now: Date = new Date();

  return now.setSeconds(now.getSeconds() + randBetween(0, 7));
};

export const shouldUpdate = (lastSent: number) => {
  return lastSent < Date.now() - 5 * 1000;
};

export const publishOnConnect = () => {
  return false;
};
