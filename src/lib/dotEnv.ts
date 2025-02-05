export const getEnv = () => {

  if (typeof process === "undefined") {
    return import.meta.env;
  }
  return process.env;
};