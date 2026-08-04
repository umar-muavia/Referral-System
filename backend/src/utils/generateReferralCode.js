import crypto from "crypto";

const REFERRAL_CODE_LENGTH = 8;
const REFERRAL_CODE_CHARSET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export const generateReferralCode = () => {
  const bytes = crypto.randomBytes(REFERRAL_CODE_LENGTH);
  let code = "";

  for (let index = 0; index < REFERRAL_CODE_LENGTH; index += 1) {
    code += REFERRAL_CODE_CHARSET[bytes[index] % REFERRAL_CODE_CHARSET.length];
  }

  return code;
};
