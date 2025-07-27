import { logger } from './logger';
import { CorsOptions } from 'cors';

const whitelist = [process.env.CLIENT_BASE_URL, 'http://localhost:5173'];

const corsOptions: CorsOptions = {
  origin: function (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) {
    logger.log({
      level: 'info',
      message: `Receiving request from origin: ${origin}...`,
    });

    if (!origin || whitelist.includes(origin)) {
      logger.log({
        level: 'info',
        message: `Origin ${origin} is whitelisted`,
      });
      callback(null, true);
    } else {
      logger.log({
        level: 'error',
        message: `Origin ${origin} is not allowed`,
      });
      callback(new Error(`Not allowed by CORS: ${origin}`));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept',
  ],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
};

export { corsOptions };
