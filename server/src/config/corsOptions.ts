import { logger } from "./logger";
import { CorsOptions } from "cors";

const whitelist = ["http://localhost:3000", "http://localhost:5173"];

const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    logger.log({
      level: "info",
      message: `Receiving request from origin: ${origin}...`,
    });
    if (!origin || whitelist.includes(origin)) {
      logger.log({
        level: "info",
        message: `Origin ${origin} is whitelisted`,
      });
      callback(null, true);
    } else {
      logger.log({
        level: "error",
        message: `Origin ${origin} is not allowed`,
      });
      callback(new Error(`Not allowed by CORS: ${origin}`));
    }
  },
};

export { corsOptions };
