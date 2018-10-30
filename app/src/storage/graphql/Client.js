import { makeExecutableSchema } from 'graphql-tools';
import debug from 'debug';

import Resolvers from './schema/Resolvers';
import TypeDefinitions from './schema/TypeDefinitions';

const Debug = debug('app:storage:graphql');

export default class Client {
	static get schema() {
		Debug('Initiate GraphQL Schema');
		const typeDefs = TypeDefinitions.list;
		const resolvers = Resolvers.list;
		return makeExecutableSchema({ typeDefs, resolvers });
	}
}
