import { Prisma } from "@prisma/client";
import { HTTP_STATUS } from "../constants/statusCodes.js";
import { env } from "../config/env.js";
import { ApiError } from "../utils/ApiError.js";
import { sendErrorResponse } from "../utils/errorResponse.js";

export const notFoundHandler = (req, res, next) => {
  next(new ApiError(HTTP_STATUS.NOT_FOUND, `Route ${req.originalUrl} not found`));
};

export const errorHandler = (error, req, res, next) => {
  let statusCode = error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
  let message = error.message || "Internal server error";
  let errors = error.errors || [];

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      statusCode = HTTP_STATUS.CONFLICT;
      message = "Resource already exists";
    } else if (error.code === "P2025") {
      statusCode = HTTP_STATUS.NOT_FOUND;
      message = "Resource not found";
    }
  }

  if (env.nodeEnv === "development") {
    console.error(error);
  }

  sendErrorResponse(res, {
    statusCode,
    message,
    errors,
    ...(env.nodeEnv === "development" && error.stack ? { stack: error.stack } : {}),
  });
};
