import { auth } from "../lib/auth";
import { envVars } from "../config/env";
import { prisma } from "../lib/prisma";
import { Role } from "../../generated/prisma/enums";

export const seedAdmin = async () => {
    try {
        const isAdminExists = await prisma.user.findUnique({
            where: { email: envVars.SUPER_ADMIN_EMAIL },
        });

        if (isAdminExists) {
            console.log("Admin already exists. Skipping seeding...");
            return;
        }

        const admin = await auth.api.signUpEmail({
            body: {
                email: envVars.SUPER_ADMIN_EMAIL,
                password: envVars.SUPER_ADMIN_PASSWORD,
                name: envVars.SUPER_ADMIN_NAME,
            },
        });

        if (admin) {
            await prisma.user.update({
                where: { email: envVars.SUPER_ADMIN_EMAIL },
                data: {
                    role: Role.SUPER_ADMIN,
                    emailVerified: true,
                    status: "ACTIVE",
                },
            });
            console.log("Super Admin seeded successfully via Better-Auth API!");
        }
    } catch (error: any) {
        console.error("Error seeding super admin:", error.message);
    }
};