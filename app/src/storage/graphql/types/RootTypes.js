import { GraphQLList, GraphQLObjectType } from 'graphql';
import MoviesType from './movies/MovieType';
import CharacterType from './characters/CharacterType';
import MoviesCollection from '../../mongo/collections/MoviesCollection';
import CharactersCollection from '../../mongo/collections/CharactersCollection';

const TYPE_NAME = 'RootType';

export default new GraphQLObjectType({
	name: TYPE_NAME,
	description: 'Schema Query Root',
	fields: () => ({
		movies: {
			type: new GraphQLList(MoviesType),
			description: 'List of all movies',
			resolve: () => MoviesCollection.findAll()
		},
		characters: {
			type: new GraphQLList(CharacterType),
			description: 'List of all movie characters',
			resolve: () => CharactersCollection.findAll()
		}
	})
});
