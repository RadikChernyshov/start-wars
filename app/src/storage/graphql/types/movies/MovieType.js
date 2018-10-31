import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';

export default new GraphQLObjectType({
	name: 'MovieType',
	fields: () => ({
		_id: { type: new GraphQLNonNull(GraphQLString) },
		title: { type: new GraphQLNonNull(GraphQLString) }
	})
});
