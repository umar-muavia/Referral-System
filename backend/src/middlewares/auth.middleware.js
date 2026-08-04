import jwt from "jsonwebtoken";
import { HTTP_STATUS } from "../constants/statusCodes.js";
import { env } from "../config/env.js";
import { ApiError } from "../utils/ApiError.js";
import { userRepository } from "../modules/auth/auth.repository.js";

export const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Authentication token is required");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, env.jwtSecret);
    const user = await userRepository.findById(decoded.userId);

    if (!user) {
      throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Invalid authentication token");
    }

    req.user = user;
    next();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Invalid or expired authentication token");
  }
};
