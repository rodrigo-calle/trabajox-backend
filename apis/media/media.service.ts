import { prismaClient } from "../../config/prismaClient";
import { Media } from "@prisma/client";

export const getAllMedia = async (): Promise<Media[]> => {
  const media = await prismaClient.media.findMany();
  return media;
};

export const createMedia = async (data: Media): Promise<Media> => {
  const { mediaUrl, postId } = data;
  const media = await prismaClient.media.create({
    data: {
      mediaUrl,
      postId,
    },
  });

  return media;
};

export const getMediaById = async (id: string): Promise<Media | null> => {
  const media = await prismaClient.media.findUnique({
    where: {
      id,
    },
  });

  return media;
};

export const updateMedia = async (id: string, data: Media): Promise<Media> => {
  const { mediaUrl, postId } = data;

  const media = await prismaClient.media.update({
    where: {
      id,
    },
    data: {
      mediaUrl,
      postId,
    },
  });

  return media;
};

export const deleteMedia = async (id: string): Promise<Media> => {
  const media = await prismaClient.media.delete({
    where: {
      id,
    },
  });

  return media;
};
