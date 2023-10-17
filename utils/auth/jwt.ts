import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import crypto from "crypto";

export const generateAccessToken = (user: User) => {
  const accessTokenEnv = process.env.JWT_ACCESS_SECRET || "secret";
  return jwt.sign({ userId: user.id }, accessTokenEnv, {
    expiresIn: "72h",
  });
};

export const generateRefreshToken = (user: User, jti: string) => {
  const refreshToken = process.env.JWT_REFRESH_SECRET || "secret";
  return jwt.sign(
    {
      userId: user.id,
      jti,
    },
    refreshToken,
    {
      expiresIn: "72h",
    }
  );
};

export const generateTokens = (user: User, jti: string) => {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user, jti);

  return { accessToken, refreshToken };
};

export const hashToken = async (token: string) => {
  return crypto.createHash("sha512").update(token).digest("hex");
};
