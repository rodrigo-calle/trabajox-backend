import { User } from "@prisma/client";
import { prismaClient } from "../../config/prismaClient";
import * as bc from "bcryptjs";

export const getAllUsers = async () => {
  const users = await prismaClient.user.findMany({
    include: {
      Profile: true,
      UserCareer: true,
    },
  });
  return users;
};

export const loginUser = async (email: string, password: string) => {
  const user = await prismaClient.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return null;
  }

  const isMatch = await bc.compare(password, user.password);

  if (!isMatch) {
    return null;
  }

  return user;
};

export const createUser = async (data: User) => {
  const { email, firstName, lastName, isWorker, password } = data;

  const salt = await bc.genSalt(10);
  const passwordHashed = await bc.hash(password, salt);
  const user = await prismaClient.user.create({
    data: {
      email,
      firstName,
      lastName,
      password: passwordHashed,
      isWorker,
    },
  });
  return user;
};

export const getUserById = async (id: string) => {
  const user = await prismaClient.user.findUnique({
    where: {
      id,
    },
    include: {
      Profile: true,
      UserCareer: true,
    },
  });

  return user;
};

export const updateUser = async (id: string, data: User) => {
  const { email, firstName, lastName, isWorker } = data;
  const user = await prismaClient.user.update({
    where: {
      id,
    },
    data: {
      email,
      firstName,
      lastName,
      isWorker,
    },
  });

  return user;
};

export const deleteUser = async (id: string) => {
  const user = await prismaClient.user.delete({
    where: {
      id,
    },
  });

  return user.id;
};

export const getUserByEmail = async (email: string) => {
  const user = await prismaClient.user.findUnique({
    where: {
      email,
    },
  });

  return user;
};

/**
 * export const saveSession = async (session: Session) => {
  const savedSession = await prismaClient.session.create({
    data: {
      data: session.data,
      expires: session.expires,
      userId: session.userId,
    },
  });
  return savedSession;
};
 */
