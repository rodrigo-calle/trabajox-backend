import { User } from "@prisma/client";
import { prismaClient } from "../../config/prismaClient";
import { hashToken } from "../../utils/hashToken";
import bcrypt from 'bcrypt';

export const isExistingUser = async (email: string): Promise<User | null> => {
    const user = await prismaClient.user.findUnique({
        where: {
            email
        }
    })

    return user;
}

export const registerUser = async (data: any) => {
    const { email, password } = data
    const passwordEncripted = await bcrypt.hash(password, 12)
    const user = await prismaClient.user.create({
        data: {
            email,
            password: passwordEncripted
        },
    })

    return user;
}

export const addRefreshTokenToWhitelist = ({ jti, refreshToken, userId }: {jti: string, refreshToken: string, userId: number}) => {
    return prismaClient.refreshToken.create({
      data: {
        tokenId: jti,
        token: hashToken(refreshToken),
        userId
      },
    });
  }
  
export const addRefreshToken = async ({jti, refreshToken, userId}: {jti: string, refreshToken: any, userId: number}) => {
    const token = prismaClient.refreshToken.create({
        data: {
            tokenId: jti,
            token: hashToken(refreshToken),
            userId
        }
    })

    return token;
}

export const findRefreshTokenById = async (tokenId: string) => {
    console.log({refreshId: tokenId})
    const tokenFound = await prismaClient.refreshToken.findUnique({
        where: {
            tokenId
        }
    })

    return tokenFound;
}

export const findRefreshTokenByTokenId = async (tokenId: string) => {
    const tokenFound = await prismaClient.refreshToken.findUnique({
        where: {
            tokenId
        }
    })

    return tokenFound;
}


/**
 * 
 * @param id 
 * @param tokenId 
 * @returns token with revoked true
 */
export const deleteRefreshToken = async ({id, tokenId}: {id?: number, tokenId?: string }) => {
    if(id) {
        const token = await prismaClient.refreshToken.update({
            where: {
                id
            },
            data: {
                revoked: true
            }
        })
    
        return token;
    }

    if (tokenId) {
        const token = await prismaClient.refreshToken.update({
            where: {
                tokenId
            },
            data: {
                revoked: true
            }
        })
    
        return token;
    }
}

export const revokeTokens = async (userId: number) => {
    const tokens = await prismaClient.refreshToken.updateMany({
        where: {
            userId
        },
        data: {
            revoked: true
        }
    })

    return tokens;
}
