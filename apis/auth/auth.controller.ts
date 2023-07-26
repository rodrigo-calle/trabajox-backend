import { Request, Response } from 'express';
import { addRefreshTokenToWhitelist, isExistingUser, registerUser } from './auth.service';
import { v4 as uuidv4 } from 'uuid';
import { generateTokens } from '../../utils/jwt';
import bcrypt from 'bcrypt';

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