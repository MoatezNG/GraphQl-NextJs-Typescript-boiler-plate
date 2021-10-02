require("dotenv").config();
const Redis = require("ioredis");
import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import * as express from "express";
import { buildSchema } from "type-graphql";
import * as cors from "cors";
import { BlockResolver } from "./resolvers/BlockResolver";

const redis = new Redis();

(async () => {
  const schema = await buildSchema({
    resolvers: [BlockResolver],
    emitSchemaFile: true,
  });
  const app = express();

  app.use(
    cors({
      origin: ["https://studio.apollographql.com", "http://localhost:3000"],
      credentials: true,
    })
  );
  const apolloServer = new ApolloServer({
    introspection: true,
    schema,
    context: ({ req, res }) => ({
     
      req,
      res,
    }),
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(process.env.PORT, () =>
    console.log(
      `Server is running on ${process.env.API_HOST}:${process.env.PORT}/graphql`
    )
  );
})();
