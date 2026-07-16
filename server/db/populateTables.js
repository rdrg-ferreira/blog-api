import prisma from "./prisma.js";
import { hash } from "bcryptjs";

async function main() {
    // create a new user
    const user = await prisma.user.create({
        data: {
            username: process.env.SEEDED_USER_NAME,
            password: await hash(process.env.SEEDED_USER_PASSWORD, 10),
        },
    });
    console.log("Created user:", user);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
