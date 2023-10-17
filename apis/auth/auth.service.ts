import { prismaClient } from "../../config/prismaClient";
import { hashToken } from "../../utils/auth/jwt";

export const addRefreshTokenToWhiteList = async ({
  jti,
  refreshToken,
  userId,
}: {
  jti: string;
  refreshToken: string;
  userId: string;
}) => {
  const hashedToken = await hashToken(refreshToken);
  return prismaClient.refreshToken.create({
    data: {
      id: jti,
      hashedToken,
      userId,
    },
  });
};

export const findRefreshTokenById = (id: string) => {
  return prismaClient.refreshToken.findUnique({
    where: {
      id,
    },
  });
};

export const deleteRefreshToken = (id: string) => {
  return prismaClient.refreshToken.update({
    where: {
      id,
    },
    data: {
      revoked: true,
    },
  });
};

export const revokeTokens = (userId: string) => {
  return prismaClient.refreshToken.updateMany({
    where: {
      userId,
    },
    data: {
      revoked: true,
    },
  });
};
