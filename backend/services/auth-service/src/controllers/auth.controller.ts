import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../config/prisma';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'refresh_secret';

export const register = async (req: Request, res: Response) => {
    try {
        const { email, password, firstName, lastName } = req.body;

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                email,
                passwordHash,
                profile: {
                    create: {
                        firstName,
                        lastName,
                    },
                },
            },
            include: { profile: true },
        });

        res.status(201).json({ message: 'User created successfully', user: { id: user.id, email: user.email } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isValid = await bcrypt.compare(password, user.passwordHash);
        if (!isValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const accessToken = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '15m' });
        const refreshToken = jwt.sign({ userId: user.id }, JWT_REFRESH_SECRET, { expiresIn: '7d' });

        await prisma.session.create({
            data: {
                userId: user.id,
                refreshToken,
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            },
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.json({ accessToken, user: { id: user.id, email: user.email, role: user.role } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getMe = async (req: any, res: Response) => {
    try {
        const userId = req.user?.userId;
        if (!userId) return res.status(401).json({ message: 'Unauthorized' });

        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: { profile: true },
        });

        if (!user) return res.status(404).json({ message: 'User not found' });

        res.json({
            id: user.id,
            email: user.email,
            role: user.role,
            name: user.profile ? `${user.profile.firstName} ${user.profile.lastName}` : '',
            avatar: user.profile?.avatarUrl,
            bio: user.profile?.bio,
            phone: user.profile?.phoneNumber,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateProfile = async (req: any, res: Response) => {
    try {
        const userId = req.user?.userId;
        const { name, email, bio, phone } = req.body;

        const [firstName, ...lastNameParts] = name ? name.split(' ') : ['', ''];
        const lastName = lastNameParts.join(' ');

        const user = await prisma.user.update({
            where: { id: userId },
            data: {
                email,
                profile: {
                    upsert: {
                        create: { firstName, lastName, bio, phoneNumber: phone },
                        update: { firstName, lastName, bio, phoneNumber: phone },
                    },
                },
            },
            include: { profile: true },
        });

        res.json({ message: 'Profile updated', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const updatePassword = async (req: any, res: Response) => {
    try {
        const userId = req.user?.userId;
        const { currentPassword, newPassword } = req.body;

        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isValid = await bcrypt.compare(currentPassword, user.passwordHash);
        if (!isValid) return res.status(400).json({ message: 'Invalid current password' });

        const passwordHash = await bcrypt.hash(newPassword, 10);
        await prisma.user.update({
            where: { id: userId },
            data: { passwordHash },
        });

        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
