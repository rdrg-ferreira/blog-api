import prisma from './prisma.js';

export async function getUser({ id, username }) {
    if (id !== undefined) {
        return await prisma.user.findUnique({
            where: { id },
        });
    }

    return await prisma.user.findFirst({
        where: { username },
    });
}

export async function createUser(username, password) {
    return await prisma.user.create({
        data: {
            username: username,
            password: password,
        }
    });
}