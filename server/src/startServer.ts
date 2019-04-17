import { GraphQLServer } from "graphql-yoga";
import * as session from "express-session";

import { genSchema } from "./utils/genSchema";

export async function startServer() {
  const server = new GraphQLServer({
    schema: genSchema() as any,
    context: ({ request }) => ({
      session: request.session
    })
  });

  server.express.use(
    session({
      name: "qid",
      secret: "sdsadasdasdas",
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Only works with https
        maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
      }
    })
  );

  const app = await server.start({
    cors: {
      credentials: true,
      origin: [process.env.FRONTEND_HOST || "http://localhost:3000"]
    },
    port: process.env.PORT || 4000
  });

  return app;
}
