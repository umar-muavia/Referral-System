import { HTTP_STATUS } from "../../constants/statusCodes.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { authService } from "./auth.service.js";

export const authController = {
  register: async (req, res) => {
    const { name, email, password, referralCode } = req.body;

    const result = await authService.register({
      name,
      email,
      password,
      referralCode,
    });

    res
      .status(HTTP_STATUS.CREATED)
      .json(new ApiResponse(HTTP_STATUS.CREATED, "User registered successfully", result));
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    const result = await authService.login({ email, password });

    res
      .status(HTTP_STATUS.OK)
      .json(new ApiResponse(HTTP_STATUS.OK, "Login successful", result));
  },
};
