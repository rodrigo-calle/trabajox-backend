import { Profile } from "@prisma/client";
import { prismaClient } from "../../config/prismaClient";

export const getAllProfiles = async () => {
  const profiles = await prismaClient.profile.findMany({
    include: {
      user: true,
    },
  });
  return profiles;
};

export const createProfile = async (data: Profile) => {
  const { avatar, bio, userId } = data;
  const profile = await prismaClient.profile.create({
    data: {
      avatar: avatar,
      bio,
      userId,
    },
  });

  return profile;
};

export const getProfileById = async (id: string) => {
  const profile = await prismaClient.profile.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
    },
  });

  return profile;
};

export const updateProfile = async (id: string, data: Profile) => {
  const { avatar, bio, userId } = data;
  const profile = await prismaClient.profile.update({
    where: {
      id,
    },
    data: {
      avatar,
      bio,
      userId,
    },
    include: {
      user: true,
    },
  });

  return profile;
};

export const deleteProfile = async (id: string) => {
  const profile = await prismaClient.profile.delete({
    where: {
      id,
    },
  });

  return profile.id;
};
