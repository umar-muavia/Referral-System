import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { HTTP_STATUS } from "../../constants/statusCodes.js";
import { env } from "../../config/env.js";
import { ApiError } from "../../utils/ApiError.js";
import { generateReferralCode } from "../../utils/generateReferralCode.js";
import { userRepository } from "./auth.repository.js";

const SALT_ROUNDS = 10;
const MAX_REFERRAL_CODE_ATTEMPTS = 5;

const sanitizeUser = (user) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  referralCode: user.referralCode,
  points: user.points,
  createdAt: user.createdAt,
});

const createUniqueReferralCode = async () => {
  for (let attempt = 0; attempt < MAX_REFERRAL_CODE_ATTEMPTS; attempt += 1) {
    const referralCode = generateReferralCode();
    const isTaken = await userRepository.isReferralCodeTaken(referralCode);

    if (!isTaken) {
      return referralCode;
    }
  }

  throw new ApiError(
    HTTP_STATUS.INTERNAL_SERVER_ERROR,
    "Unable to generate a unique referral code"
  );
};

const createAccessToken = (userId) =>
  jwt.sign({ userId }, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn,
  });

export const authService = {
  register: async ({ name, email, password, referralCode }) => {
    const existingUser = await userRepository.findByEmail(email);

    if (existingUser) {
      throw new ApiError(HTTP_STATUS.CONFLICT, "Email is already registered");
    }

    let referrer = null;

    if (referralCode) {
      referrer = await userRepository.findByReferralCode(referralCode);

      if (!referrer) {
        throw new ApiError(HTTP_STATUS.BAD_REQUEST, "Invalid referral code");
      }
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const uniqueReferralCode = await createUniqueReferralCode();

    const user = await userRepository.createUserWithReferral({
      name,
      email,
      password: hashedPassword,
      referralCode: uniqueReferralCode,
      referrerId: referrer?.id,
      pointsAwarded: env.referralRewardPoints,
    });

    const token = createAccessToken(user.id);

    return {
      user: sanitizeUser(user),
      token,
    };
  },

  login: async ({ email, password }) => {
    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Invalid email or password");
    }

    const token = createAccessToken(user.id);

    return {
      user: sanitizeUser(user),
      token,
    };
  },
};
