import { User } from "@prisma/client"
import { prisma } from "../../lib/prisma"
import { redis } from "../../lib/redis"

class MeService{
    public async getCurrentUser(id: string): Promise<User>{
        const key = `user:${id}`

        //see if info is available on redis
        const cached = await redis.get(key)
        if (cached) return JSON.parse(cached)

        const user = await prisma.user.findUnique({
            where: {id}
        })
        if(!user){
            throw new Error("User not found")
        }

        const userDTO = {
            id: user.id,
            email: user.email,
            username: user.username,
            createdAt: user.createdAt
        }

        await redis.set(key, JSON.stringify(userDTO), "EX", 60)
        return user
    }
}
export const meService = new MeService() 
