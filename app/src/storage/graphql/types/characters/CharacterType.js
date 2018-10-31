import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';

export default new GraphQLObjectType({
	name: 'CharacterType',
	fields: () => ({
		_id: { type: new GraphQLNonNull(GraphQLString) },
		name: { type: new GraphQLNonNull(GraphQLString) }
	})
});
