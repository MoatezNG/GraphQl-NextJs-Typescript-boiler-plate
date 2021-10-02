// import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import * as express from 'express';
import { buildSchema } from 'type-graphql';
import * as cors from 'cors';
import { UserResolver } from './resolvers/UserResolver';

require('dotenv').config();

(async () => {
  const schema = await buildSchema({
    resolvers: [UserResolver],
    emitSchemaFile: true,
  });
  const app = express();

  app.use(
    cors({
      origin: [process.env.APPOLO_STUDIO!, process.env.FRONT_END!],
      credentials: true,
    }),
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
    // eslint-disable-next-line no-console
    console.log(`Server is running on ${process.env.API_HOST}:${process.env.PORT}/graphql`),
  );
})();
