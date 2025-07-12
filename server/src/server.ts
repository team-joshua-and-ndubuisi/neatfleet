import primaClient from "./config/prisma";

require("dotenv-safe").config();
require("./lib/generateKeyPair");
const http = require("http");
const { app } = require("./app");
// const { connectDB } = require('./config/database');

const startApp = async () => {
  const server = http.createServer(app);

  await primaClient.$connect();

  server.listen(process.env.PORT, () =>
    console.log(`Server listening on port ${process.env.PORT}`)
  );
  server.on("error", (err: any) => {
    primaClient.$disconnect();
    console.error("Server error:", err);
    process.exit(1);
  });
};

startApp();
