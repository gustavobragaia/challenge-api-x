import bcrypt, { compare } from "bcryptjs";

export async function HashPassord(inputPassword: string): Promise<string>{
    return bcrypt.hash(inputPassword, 10)
}

export async function verifyPassword(inputPassword: string, hashedPassword: string): Promise<boolean>{
    return compare(inputPassword, hashedPassword)
}