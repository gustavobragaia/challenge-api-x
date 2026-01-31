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

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})