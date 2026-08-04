import { prisma } from "../../config/database.js";

const publicUserSelect = {
  id: true,
  name: true,
  email: true,
  referralCode: true,
  points: true,
  createdAt: true,
};

export const userRepository = {
  findByEmail: (email) =>
    prisma.user.findUnique({
      where: { email },
    }),

  findById: (id) =>
    prisma.user.findUnique({
      where: { id },
      select: publicUserSelect,
    }),

  findByReferralCode: (referralCode) =>
    prisma.user.findUnique({
      where: { referralCode },
      select: { id: true, referralCode: true },
    }),

  findByIdWithPassword: (id) =>
    prisma.user.findUnique({
      where: { id },
    }),

  createUserWithReferral: async ({
    name,
    email,
    password,
    referralCode,
    referrerId,
    pointsAwarded,
  }) =>
    prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          name,
          email,
          password,
          referralCode,
          referredById: referrerId ?? null,
        },
        select: publicUserSelect,
      });

      if (referrerId) {
        await tx.referral.create({
          data: {
            referrerId,
            referredId: user.id,
            pointsAwarded,
          },
        });

        await tx.user.update({
          where: { id: referrerId },
          data: {
            points: { increment: pointsAwarded },
          },
        });
      }

      return user;
    }),

  isReferralCodeTaken: async (referralCode) => {
    const existingUser = await prisma.user.findUnique({
      where: { referralCode },
      select: { id: true },
    });

    return Boolean(existingUser);
  },
};
