import dotenv from 'dotenv';
import * as http from 'http';
import { app } from './app';
import primaClient from './config/prisma';
import './lib/generateKeyPair';
dotenv.config();

// const { connectDB } = require('./config/database');

const startApp = async () => {
  const server = http.createServer(app);

  await primaClient.$connect();

  server.listen(process.env.PORT, () =>
    console.log(`Server listening on port ${process.env.PORT}`)
  );
  server.on('error', (err: any) => {
    primaClient.$disconnect();
    console.error('Server error:', err);
    process.exit(1);
  });
};

startApp();
