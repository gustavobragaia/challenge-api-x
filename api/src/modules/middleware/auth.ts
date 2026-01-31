import { FastifyRequest, FastifyReply } from "fastify";

export async function authenticate(
  req: FastifyRequest,
  res: FastifyReply
) {
  try {
    await req.jwtVerify();
  } catch {
    return res.code(401).send({ message: "Unauthorized" });
  }
}
