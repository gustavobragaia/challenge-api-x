import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { authService } from "./auth.service";
import {createUserSchema, loginUserSchema} from "./auth.schema"

export function AuthRoutes(app: FastifyInstance){

    app.post(
        "/register",
        async (req: FastifyRequest, res: FastifyReply) => {
            try{
                const input = createUserSchema.parse(req.body);
                const result = await authService.register(input)
                const token = app.jwt.sign(
                    {sub: result.id},
                    {expiresIn: "1h"}
                )
                return res.status(201).send({
                    id: result.id,
                    email: result.email,
                    createdAt: result.createdAt,
                    token
                })
            }
            catch(e){
                res.status(400).send({message: e ?? "bad request"})
            }
        }
    )

    app.post(
        "/login",
        async (req: FastifyRequest, res: FastifyReply) => {
            try{
                const input = loginUserSchema.parse(req.body)
                const result = await authService.login(input)
                const token = app.jwt.sign(
                    {sub: result.id},
                    {expiresIn: "1h"}
                )

                return res.status(201).send({
                    id: result.id,
                    email: result.email,
                    token
                })
            }
            catch(e){
                res.status(400).send({message: e ?? "bad request"})
            }
        }
    )
}