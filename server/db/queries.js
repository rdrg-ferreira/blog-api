import prisma from './prisma.js';

async function getUser({ id, username }) {
    if (id !== undefined) {
        return await prisma.user.findUnique({
            where: { id: Number(id) },
            select: {
                username: true,
                id: true,
                role: true,
            }
        });
    }

    return await prisma.user.findFirst({
        where: { username: username },
        select: {
            username: true,
            id: true,
            role: true,
        }
    });
}

async function getUserWithPassword({ id, username }) {
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
        },
        select: {
            username: true,
            id: true,
            role: true,
        }
    });
}

async function updateUserRole(id) {
    return await prisma.user.update({
        where: { id: Number(id) },
        data: { role: "ADMIN" },
        select: {
            username: true,
            id: true,
            role: true,
        }
    });
}

async function getAllPublicPosts() {
    return await prisma.post.findMany({
        where: { status: "PUBLIC" },
        include: { 
            author: { select: { username: true  } },
            _count: { select: { comments: true } }
        },
        orderBy: { createdAt: "desc" }
    });
}

async function getAllPosts() {
    return await prisma.post.findMany({
        include: { 
            author: { select: { username: true  } },
            _count: { select: { comments: true } }
        },
        orderBy: { createdAt: "desc" }
    });
}

async function getPostById(id) {
    return await prisma.post.findUnique({
        where: { id: Number(id) },
        include: {
            author: { select: { username: true } },
            _count: { select: { comments: true } }
        }
    });
}

async function createPost(title, text, authorId, status) {
    return await prisma.post.create({
        data: {
            title: title,
            text: text,
            authorId: Number(authorId),
            status: status
        },
        include: {
            author: { select: { username: true } },
            _count: { select: { comments: true } }
        }
    });
}

async function getCommentsFromPost(postId) {
    return await prisma.comment.findMany({
        where: { postId: Number(postId) },
        include: { 
            author: { select: { username: true  } }
        },
        orderBy: { createdAt: "desc" }
    });
}

async function updatePostStatus(newStatus, id) {
    return await prisma.post.update({
        where: { id: Number(id) },
        data: { status: newStatus },
        include: {
            author: { select: { username: true } },
            _count: { select: { comments: true } }
        }
    });
}

async function createComment(text, authorId, postId) {
    return await prisma.comment.create({
        data: {
            text: text,
            authorId: Number(authorId),
            postId: Number(postId),
        }
        ,include: {
            author: { select: { username: true } }
        }
    });
}

async function getCommentById(id) {
    return await prisma.comment.findUnique({
        where: { id: Number(id) },
    });
}

async function deleteComment(id) {
    return await prisma.comment.delete({
        where: { id: Number(id) },
    });
}

export default {
    getUser,
    getUserWithPassword,
    createUser,
    updateUserRole,
    getAllPublicPosts,
    getAllPosts,
    getPostById,
    createPost,
    getCommentsFromPost,
    updatePostStatus,
    createComment,
    getCommentById,
    deleteComment
}