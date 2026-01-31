import { FastifyInstance } from "fastify";
import { meService } from "./me.service";
import { authenticate } from "../middleware/auth";

export function meRoute(app: FastifyInstance){
    app.get(
        "/me",
        {preHandler: authenticate}, 
        async(req, res) => {
            const userId = req.user.sub
            const result = await meService.getCurrentUser(userId)
            return res.status(200).send(result)
        }
    )
}