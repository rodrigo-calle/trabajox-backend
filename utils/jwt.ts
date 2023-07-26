import jwt from 'jsonwebtoken'
import { User } from '@prisma/client'

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET ?? ''
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET ?? ''

export const generateAccessToken = (user: User) => {
    return jwt.sign({ userId: user.id }, accessTokenSecret, {
        expiresIn: '30m'
    })
}

export const generateRefreshToken = (user: User, jti: string) => { 
    return jwt.sign({
        userId: user.id,
        jti
    }, refreshTokenSecret, {
        expiresIn: '12h'
    })
}

export const generateTokens = (user: User, jti: string) => {
    const accessToken = generateAccessToken(user)
    const refreshToken = generateRefreshToken(user, jti)

    return { accessToken, refreshToken }
}