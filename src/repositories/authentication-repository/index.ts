import { prisma } from "../../config";
import { Prisma } from "@prisma/client";

async function FindEmail(email: string) {
    return await prisma.users.findFirst({
        where: {
            email: email
        }
    })
}

async function CreateUser(data: Omit<Prisma.usersUncheckedCreateInput, "id">) {
    return await prisma.users.create({
        data
    });
}

async function FindAccount(email: string) {
    return await prisma.users.findFirst({
        where: {
            email: email
        }
    })
}

async function Login(token: string, userId: number) {
    return await prisma.sessions.create({
        data: {
            token: token,
            userid: userId
        }
    })
}

async function ActiveSession(userId: number) {
    return await prisma.sessions.findFirst({
        where: {
            AND: {
                active: true,
                userid: userId
            }
        }
    })
}

async function LogOut(id: number) {
    return await prisma.sessions.update({
        where: {
            id: id
        },
        data: {
            active: false
        }
    })
}

async function findSessionByToken(token: string) {
    return await prisma.sessions.findFirst({
        where: {
            active: true,
            token: token
        }
    })
}

const authenticationRepository = {
    FindEmail,
    CreateUser,
    FindAccount,
    Login,
    ActiveSession,
    findSessionByToken,
    LogOut
}

export default authenticationRepository