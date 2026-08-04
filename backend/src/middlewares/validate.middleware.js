import { validationResult } from "express-validator";
import { HTTP_STATUS } from "../constants/statusCodes.js";
import { ApiError } from "../utils/ApiError.js";

export const validateRequest = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map((error) => ({
      field: error.path,
      message: error.msg,
    }));

    throw new ApiError(
      HTTP_STATUS.UNPROCESSABLE_ENTITY,
      "Validation failed",
      formattedErrors
    );
  }

  next();
};
