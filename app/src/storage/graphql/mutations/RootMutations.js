import { GraphQLObjectType } from 'graphql';
import MovieMutations from './MovieMutations';
import CharacterMutations from './CharacterMutations';

export default new GraphQLObjectType({
	name: 'RootMutation',
	fields: () => ({ ...MovieMutations, ...CharacterMutations })
});
