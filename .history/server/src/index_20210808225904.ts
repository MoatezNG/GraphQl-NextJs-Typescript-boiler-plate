require("dotenv").config();
const Redis = require("ioredis");
import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import * as express from "express";
import { buildSchema } from "type-graphql";
import * as cors from "cors";
import { BlockResolver } from "./resolvers/BlockResolver";
import { TransactionResolver } from "./resolvers/TransactionResolver";
import { fetchBlocks } from "./services/block";
import { listingBlocksCache } from "./constants/cache";

const redis = new Redis();

(async () => {
  const schema = await buildSchema({
    resolvers: [BlockResolver, TransactionResolver],
    emitSchemaFile: true,
  });

  const data = await fetchBlocks();
  await redis.del(listingBlocksCache);
  const dataString = data.map((x) => JSON.stringify(x));

  await redis.lpush(listingBlocksCache, dataString);
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
      redis,
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
