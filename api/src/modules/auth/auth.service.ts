import { HashPassord } from '../../utils/hash'
import {CreateUserInput, LoginUserInput} from './auth.schema'
import {prisma} from '../../lib/prisma'
import bcrypt from 'bcryptjs'

export class AuthService{
    public async register(input: CreateUserInput): Promise<any>
        {   
            const {email, password, username} = input

            const existUser = await prisma.user.findUnique({
                where: {email}
            })

            if(existUser){
                throw new Error("User already exist")
            }

            const passwordHash = await HashPassord(password)

            const user = await prisma.user.create(
                {
                    data: {
                        email,
                        passwordHash,
                        username
                    }
                }
            )
            return {
            id: user.id,
            email: user.email,
            username: user.username
        }
        }

    public async login(input: LoginUserInput): Promise<any>{
        const {email, password} = input

        const existUser = await prisma.user.findUnique({
            where: {email},

        })
        if(!existUser){
            throw new Error("Invalid Credentials")
        }
        const isCorrectPassword = await bcrypt.compare(password, existUser.passwordHash)
        if(!isCorrectPassword){
            throw new Error("Invalid Credentials");
        }

        return{
            id: existUser.id,
            email: existUser.email,
            username: existUser.username,
        }
    }
}
export const authService = new AuthService()