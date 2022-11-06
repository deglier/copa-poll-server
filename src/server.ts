import Fastify from "fastify";
import cors from "@fastify/cors"
import { pollRoutes } from "./routes/poll";
import { userRoutes } from "./routes/user";
import { guessRoutes } from "./routes/guess";
import { authRoutes } from "./routes/auth";
import { gameRoutes } from "./routes/game";
import fastifyJwt from "@fastify/jwt";
import proxy  from 'express-http-proxy'
import express from 'express'


async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  })

  await fastify.register(cors, {
    origin: true,
  })

  await fastify.register(fastifyJwt, {
    secret: "nlwCopa" // por depois como variável ambiente
  })

  await fastify.register(authRoutes)
  await fastify.register(gameRoutes)
  await fastify.register(guessRoutes)
  await fastify.register(pollRoutes)
  await fastify.register(userRoutes)

  await fastify.listen({ port: 8081 }, function (err, address) {
    if (err) {
      console.log('err', err)
      fastify.log.error(err)
      process.exit(1)
    }
    console.log(address)
    fastify.log.info(`server listening on ${address}`)
  })
  
  
const app = express()
app.use('/', proxy('localhost:8081'))
app.listen(8080, () => console.log(`Example app listening on port ${8080}!`))
  
}

bootstrap()