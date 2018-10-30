import MoviesCollection from '../../mongo/collections/MoviesCollection';
import CharactersCollection from '../../mongo/collections/CharactersCollection';

export default class Resolvers {
	static get list() {
		return {
			Query: {
				movies: async () => MoviesCollection.findAll(),
				movie: async (root, query) => MoviesCollection.findOne(query),
				characters: async () => CharactersCollection.findAll(),
				character: async (root, query) => CharactersCollection.findOne(query)
			},
			Mutation: {
				createMovie: async (root, { input }) => MoviesCollection.insertOne(input),
				updateMovie: async (root, { _id, input }) => MoviesCollection.updateOne(_id, input),
				deleteMovie: async (root, { _id }) => MoviesCollection.deleteOne(_id),
				createCharacter: async (root, { input }) => CharactersCollection.insertOne(input),
				updateCharacter: async (root, { _id, input }) => CharactersCollection.updateOne(_id, input),
				deleteCharacter: async (root, { _id }) => CharactersCollection.deleteOne(_id)
			}
		};
	}
}
