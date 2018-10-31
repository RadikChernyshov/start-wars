import { GraphQLNonNull } from 'graphql';
import MovieType from '../types/movies/MovieType';
import MovieInputType from '../types/movies/MovieInputType';
import MoviesCollection from '../../mongo/collections/MoviesCollection';

export default {
	createMovie: {
		type: MovieType,
		args: {
			input: { type: new GraphQLNonNull(MovieInputType) }
		},
		resolve: async (rootValue, { input }) => MoviesCollection.insertOne(input)
	},
	updateMovie: {
		type: MovieType,
		args: {
			input: { type: new GraphQLNonNull(MovieInputType) }
		},
		resolve: async (rootValue, { input }) => {
			const { _id, ...attrs } = input;
			return MoviesCollection.updateOne(_id, attrs);
		}
	},
	deleteMovie: {
		type: MovieType,
		args: {
			input: { type: new GraphQLNonNull(MovieInputType) }
		},
		resolve: async (rootValue, { input }) => {
			const { _id } = input;
			const movie = MoviesCollection.findOne(input);
			await MoviesCollection.deleteOne(_id);
			return movie;
		}
	}
};
