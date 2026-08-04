import { HTTP_STATUS } from "../../constants/statusCodes.js";
import { ApiError } from "../../utils/ApiError.js";
import { dashboardRepository } from "./dashboard.repository.js";

export const dashboardService = {
  getDashboard: async (userId) => {
    const dashboard = await dashboardRepository.getDashboardByUserId(userId);

    if (!dashboard) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, "User not found");
    }

    return {
      referralCode: dashboard.referralCode,
      totalPoints: dashboard.points,
      referredUsers: dashboard.referrals.map((referral) => ({
        id: referral.id,
        name: referral.name,
        email: referral.email,
        referredAt: referral.createdAt,
      })),
      user: {
        id: dashboard.id,
        name: dashboard.name,
        email: dashboard.email,
      },
    };
  },
};
