import prisma from './prisma.js';

async function getUser({ id, username }) {
    if (id !== undefined) {
        return await prisma.user.findUnique({
            where: { id: Number(id) },
        });
    }

    return await prisma.user.findFirst({
        where: { username: username },
    });
}

async function createUser(username, password) {
    return await prisma.user.create({
        data: {
            username: username,
            password: password,
        }
    });
}

async function updateUserRole(id) {
    return await prisma.user.update({
        where: { id: Number(id) },
        data: { role: "ADMIN" }
    });
}

async function getAllPosts() {
    return await prisma.post.findMany();
}

async function createPost(title, text, authorId, status) {
    return await prisma.post.create({
        data: {
            title: title,
            text: text,
            authorId: Number(authorId),
            status: status
        }
    });
}

async function getCommentsFromPost(postId) {
    return await prisma.comment.findMany({
        where: { postId: postId },
    });
}

async function createComment(text, authorId, postId) {
    return await prisma.comment.create({
        data: {
            text: text,
            authorId: Number(authorId),
            postId: Number(postId),
        }
    });
}

export default {
    getUser,
    createUser,
    updateUserRole,
    getAllPosts,
    createPost,
    getCommentsFromPost,
    createComment,
}