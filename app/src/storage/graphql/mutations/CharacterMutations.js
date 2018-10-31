import { GraphQLNonNull } from 'graphql';
import CharacterType from '../types/characters/CharacterType';
import CharacterInputType from '../types/characters/CharacterInputType';
import CharacterCollection from '../../mongo/collections/CharactersCollection';

export default {
	createCharacter: {
		type: CharacterType,
		args: {
			input: { type: new GraphQLNonNull(CharacterInputType) }
		},
		resolve: async (rootValue, { input }) => CharacterCollection.insertOne(input)
	},
	updateCharacter: {
		type: CharacterType,
		args: {
			input: { type: new GraphQLNonNull(CharacterInputType) }
		},
		resolve: async (rootValue, { input }) => {
			const { _id, ...attrs } = input;
			return CharacterCollection.updateOne(_id, attrs);
		}
	},
	deleteCharacter: {
		type: CharacterType,
		args: {
			input: { type: new GraphQLNonNull(CharacterInputType) }
		},
		resolve: async (rootValue, { input }) => {
			const { _id } = input;
			const movie = CharacterCollection.findOne(input);
			await CharacterCollection.deleteOne(_id);
			return movie;
		}
	}
};
