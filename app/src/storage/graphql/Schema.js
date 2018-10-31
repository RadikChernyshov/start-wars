import { GraphQLSchema } from 'graphql';
import RootTypes from './types/RootTypes';
import RootMutations from './mutations/RootMutations';

export default new GraphQLSchema({
	query: RootTypes,
	mutation: RootMutations
});
