import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import Client from './src/storage/graphql/Client';

const server = express();
const apolloServer = new ApolloServer({ schema: Client.schema });

apolloServer.applyMiddleware({ app: server });

export default server;
