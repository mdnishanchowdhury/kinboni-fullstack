import { NextFunction, Request, Response } from "express";
import status from "http-status";
import { Role, UserStatus } from "../../generated/prisma/enums";
import { envVars } from "../config/env";
import { prisma } from "../lib/prisma";
import { CookieUtils } from "../utils/cookie";
import { jwtUtils } from "../utils/jwt";
import AppError from "../errorHelpers/AppError";

export const checkAuth = (...authRoles: Role[]) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const sessionToken = CookieUtils.getCookie(req, "better-auth.session_token");
        const accessToken = CookieUtils.getCookie(req, 'accessToken');

        if (!sessionToken && !accessToken) {
            throw new AppError(status.UNAUTHORIZED, 'Unauthorized access! Login required.');
        }

        let authenticatedUser: any = null;

        // Better-Auth Session Verification
        if (sessionToken) {
            const sessionExists = await prisma.session.findFirst({
                where: {
                    token: sessionToken,
                    expiresAt: { gt: new Date() }
                },
                include: { user: true }
            });

            if (sessionExists && sessionExists.user) {
                const user = sessionExists.user;

                // Session Refresh Logic
                const now = new Date();
                const expiresAt = new Date(sessionExists.expiresAt);
                const createdAt = new Date(sessionExists.createdAt);
                const sessionLifeTime = expiresAt.getTime() - createdAt.getTime();
                const percentRemaining = ((expiresAt.getTime() - now.getTime()) / sessionLifeTime) * 100;

                if (percentRemaining < 20) {
                    res.setHeader('X-Session-Refresh', 'true');
                }

                authenticatedUser = user;
            }
        }

        // Access Token Verification)
        if (!authenticatedUser && accessToken) {
            const verifiedToken = jwtUtils.verifyToken(accessToken, envVars.ACCESS_TOKEN_SECRET);

            if (verifiedToken.success) {
                authenticatedUser = await prisma.user.findUnique({
                    where: { id: (verifiedToken.data as any).userId }
                });
            }
        }

        if (!authenticatedUser) {
            throw new AppError(status.UNAUTHORIZED, 'Invalid or expired session.');
        }

        if (authenticatedUser.status === UserStatus.BLOCKED || authenticatedUser.isDeleted) {
            throw new AppError(status.FORBIDDEN, 'User account is inactive or deleted.');
        }

        if (authRoles.length > 0 && !authRoles.includes(authenticatedUser.role)) {
            throw new AppError(status.FORBIDDEN, 'Forbidden access! Permission denied.');
        }

        req.user = {
            userId: authenticatedUser.id,
            role: authenticatedUser.role,
            email: authenticatedUser.email,
        };

        next();
    } catch (error: any) {
        next(error);
    }
};