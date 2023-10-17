import { Request, Response } from "express";
import {
  createUser,
  getUserByEmail,
  getUserById,
  loginUser,
} from "../users/user.service";
import { generateTokens, hashToken } from "../../utils/auth/jwt";
import jwt from "jsonwebtoken";
import { uuid } from "uuidv4";
import {
  addRefreshTokenToWhiteList,
  deleteRefreshToken,
  findRefreshTokenById,
  revokeTokens,
} from "./auth.service";

export const registerUserHandler = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const userExist = await getUserByEmail(email);
    if (userExist) {
      res.status(409).send({ error: "User already exist" });
      return;
    }

    const user = await createUser(req.body);
    const jti = uuid();

    const { accessToken, refreshToken } = generateTokens(user, jti);
    await addRefreshTokenToWhiteList({ jti, refreshToken, userId: user.id });

    res.status(201).json({ accessToken, refreshToken });
  } catch (error) {
    res.status(500).send({ error });
  }
};

export const loginUserHandler = async (req: Request, res: Response) => {
  try {
    const user = await loginUser(req.body.email, req.body.password);

    if (!user) {
      res.status(401).send({ error: "Invalid credentials" });
      return;
    }

    const jti = uuid();
    const { accessToken, refreshToken } = generateTokens(user, jti);
    await addRefreshTokenToWhiteList({
      jti,
      refreshToken,
      userId: user.id,
    });

    res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    res.status(500).send({ error });
  }
};

export const refreshTokenHandler = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      res.status(401).send({ error: "Invalid credentials" });
      return;
    }
    const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!);
    const jti = typeof payload !== "string" && payload.jti ? payload.jti : "";
    const savedRefreshToken = await findRefreshTokenById(jti);

    if (!savedRefreshToken || savedRefreshToken.revoked === true) {
      res.status(401);
      throw new Error("Unauthorized");
    }
    const hashedToken = await hashToken(refreshToken);
    if (hashedToken !== savedRefreshToken.hashedToken) {
      res.status(401);
      throw new Error("Unauthorized");
    }

    const userId = typeof payload !== "string" && payload.userId;

    const user = await getUserById(userId);
    if (!user) {
      res.status(401);
      throw new Error("Unauthorized");
    }
    await deleteRefreshToken(savedRefreshToken.id);
    const jtiUuid = uuid();
    const { accessToken, refreshToken: newRefreshToken } = generateTokens(
      user,
      jtiUuid
    );
    await addRefreshTokenToWhiteList({
      jti,
      refreshToken: newRefreshToken,
      userId: user.id,
    });

    res.status(200).json({ accessToken, refreshToken: newRefreshToken });
  } catch (error) {
    res.status(500).send({ error });
  }
};

export const revokeRefreshTokens = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    await revokeTokens(userId);
    res.status(200).send({ message: "Tokens revoked" });
  } catch (error) {
    res.status(500).send({ error });
  }
};
