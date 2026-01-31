import fastify from 'fastify'
import { AuthRoutes } from './modules/auth/auth.routes'
import jwt from "@fastify/jwt";
import { meRoute } from './modules/me/me.route';

const server = fastify()

server.register(jwt, {
  secret: process.env.JWT_SECRET!,
});
server.register(AuthRoutes, {prefix: "/auth"})
server.register(meRoute)

server.get('/ping', async (request, reply) => {
  return 'pong\n'
})

const port = Number(process.env.PORT ?? 8080)
const host = process.env.HOST ?? '0.0.0.0'

server.listen({ port, host }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
