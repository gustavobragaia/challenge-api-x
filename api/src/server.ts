import fastify from 'fastify'
import { AuthRoutes } from './modules/auth/auth.routes'
import jwt from "@fastify/jwt";
import { meRoute } from './modules/me/me.route';
import { request } from 'node:http';

const server = fastify()

server.register(jwt, {
  secret: process.env.JWT_SECRET!,
});
server.register(AuthRoutes, {prefix: "/auth"})
server.register(meRoute)

server.get('/',
  async (request, reply) => {
    return {message: "new automatic deploy using GHCR, docker and EC2 made with sucess ¬¬! v3"}
  }
)
server.get('/ping', async (request, reply) => {
  return 'pong\n'
})

server.listen({ port: 8080, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})