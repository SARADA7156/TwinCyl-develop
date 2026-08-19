import "server-only";
import winston from "winston";

const { combine, timestamp, errors, json } = winston.format;

const format = combine(
    errors({ stack: true }),
    timestamp(),
    json()
);

const transports: winston.transport[] = [
    new winston.transports.Console(),
];

export const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || "info",
    format: format,
    transports
});