import { GraphQLID, GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from 'graphql';

export default new GraphQLInputObjectType({
	name: 'MovieInputType',
	fields: () => ({
		_id: { type: GraphQLID },
		title: { type: new GraphQLNonNull(GraphQLString) }
	})
});
