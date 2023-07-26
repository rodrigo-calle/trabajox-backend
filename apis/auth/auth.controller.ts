import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { generateTokens } from '../../utils/jwt';
import jwt from 'jsonwebtoken';
import { addRefreshTokenToWhitelist, deleteRefreshToken, findRefreshTokenById, isExistingUser, registerUser, revokeTokens } from './auth.service';
import { hashToken } from '../../utils/hashToken';

export const registerUserHandler = async (req: Request, res: Response) => {    
    try {
        const user = await registerUser(req.body);
        const jti = uuidv4();
        const { accessToken, refreshToken } = generateTokens(user, jti);
        await addRefreshTokenToWhitelist({ jti, refreshToken, userId: user.id });

        res.status(201).json({
            accessToken,
            refreshToken,
        });
    } catch (error) {
        res.status(500).json({ error });    
    }
}

export const loginUserHandler = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const existingUser = await isExistingUser(email);
        if(!existingUser) {
            return res.status(401).json({ error: 'Bad credentials' });
        }
        const validPassword = await bcrypt.compare(password, existingUser.password);
        if(!validPassword) {
            return res.status(401).json({ error: 'Bad credentials' });
        }

        const jti = uuidv4();
        const { accessToken, refreshToken } = generateTokens(existingUser, jti);
        await addRefreshTokenToWhitelist({ jti, refreshToken, userId: existingUser.id });

        res.status(200).json({
            accessToken,
            refreshToken
        })
    } catch (error) {
        res.status(500).json({ error });
    }
}

// TODO: Implement zod validation
export const refreshTokenHandler = async (req: Request, res: Response) => {
    try {
        const { refreshToken } = req.body;
        
        const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET ?? '')

        if(typeof payload === 'string' || !payload.jti) {
            throw new Error('Unauthorized');
        }
        const savedRefreshToken = await findRefreshTokenById(payload.jti);

        if (!savedRefreshToken || savedRefreshToken.revoked === true) {
            res.status(401);
            throw new Error('Unauthorized');
        }

        const hashedToken = hashToken(refreshToken);
        if(hashedToken !== savedRefreshToken.token) {
            res.status(401);
            throw new Error('Unauthorized');
        }

        const user = await isExistingUser(payload.userId);
        if(!user) {
            res.status(401);
            throw new Error('Unauthorized');
        }

        await deleteRefreshToken({id: undefined, tokenId: savedRefreshToken.tokenId});

        const jti = uuidv4();
        const { accessToken, refreshToken: newRefreshToken } = generateTokens(user, jti);
        res.status(200).json({
            accessToken,
            refreshToken: newRefreshToken
        });
    } catch (error) {
        res.status(500).json({ error });
    }
}

export const revokeRefreshTokenHandler = async (req: Request, res: Response) => {
    try {
        const { userId } = req.body;
        await revokeTokens(userId);
        res.status(200).json({ message: `Token revoker for user ${userId}` });
    } catch (error) {
        res.status(500).json({ error });
    }
}

