const { createLogger, format, transports } = require("winston");
const fs = require("fs");
const path = require("path");

const logFilePath = path.join(__dirname + "log-api.log");

module.exports = createLogger({
  format: format.combine(
    format.printf((info) => `${info.level} - ${info.message}`)
  ),
  transports: [
    new transports.File({
      maxsize: 5120000,
      maxFiles: 5,
      filename: logFilePath,
    }),
    new transports.Console({
      level: "debug",
    }),
  ],
});
