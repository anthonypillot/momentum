import pino from "pino";

export const logger = setupLogger();

function setupLogger() {
  if (process.env.NODE_ENV === "production") {
    return pino({
      msgPrefix: "[Momentum] ",
    });
  } else {
    return pino({
      msgPrefix: "[Momentum] ",
      level: "debug",
      transport: {
        target: "pino-pretty",
      },
    });
  }
}
