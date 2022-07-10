const mongoose = require("mongoose");
const app = require("./app");
const config = require("./config/config");
const logger = require("./config/logger");

let server;
mongoose.connect(config.mongoose.url).then(() => {
  console.log(config.mongoose.url);
  logger.info("Connected to Dev MongoDB");
  server = app.listen(config.port, () => {
    logger.info(`Listening to port ${config.port}`);
  });
});

const exitHandler = () => {
  if (server) {
    server.close(function (err) {
      logger.info("Server closed");
      if (err) {
        console.error(err);
        process.exit(1);
      }
      mongoose.connection.close(function () {
        logger.info("Mongoose connection closed!");
        process.exit(0);
      });
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

const sigs = ["SIGINT", "SIGTERM", "SIGQUIT"];
sigs.forEach((sig) => {
  process.on(sig, unexpectedErrorHandler);
});
