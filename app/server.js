import express from 'express';
import graphqlHTTP from 'express-graphql';
import GraphQLSchema from './src/storage/graphql/Schema';

const server = express();
server.use('/graphql', graphqlHTTP({
	schema: GraphQLSchema,
	graphiql: true
}));

export default server;
