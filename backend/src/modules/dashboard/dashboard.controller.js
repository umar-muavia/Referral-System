import { HTTP_STATUS } from "../../constants/statusCodes.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { dashboardService } from "./dashboard.service.js";

export const dashboardController = {
  getDashboard: async (req, res) => {
    const dashboard = await dashboardService.getDashboard(req.user.id);

    res
      .status(HTTP_STATUS.OK)
      .json(new ApiResponse(HTTP_STATUS.OK, "Dashboard fetched successfully", dashboard));
  },
};
