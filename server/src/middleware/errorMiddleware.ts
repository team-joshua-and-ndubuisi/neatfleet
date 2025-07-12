const { logger } = require("../config/logger");
import { Request, Response, NextFunction, ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || res.statusCode || 500;

  logger.error(err.stack || err);

  res.status(statusCode).json({
    success: false,
    message: err.message || "An unexpected error occurred",
    errors: err.details || null,
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
  });
};

export { errorHandler };
