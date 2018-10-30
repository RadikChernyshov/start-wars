export default class TypeDefinitions {
	static get list() {
		return [`type Query {
			 	movies: [Movie]
			 	movie(_id: String): Movie
			 	characters: [Character]
			 	character(_id: String): Character
			 }
			 type Movie {
        		_id: String
        		title: String
        		year: Int,
        		rating: Int,
        		votes: Int,
        		budget: String,
        		production: String,
        		released: String
        	 }
        	 type Character {
        		_id: String
        		name: String
        	 }
 			 input AddMovie {
 			    title: String, 
 			    year: String
 			 }    
 			 input UpdateMovie {
 			    title: String, 
 			    year: String
 			 }   
 			 input AddCharacter {
 			    name: String
 			 }    
 			 input UpdateCharacter {
 			    name: String
 			 }        	 
        	 type Mutation {
        	 	createMovie(input: AddMovie): Movie
        	 	updateMovie(_id: String, input: UpdateMovie): Movie
        	 	deleteMovie(_id: String): Boolean
        	 	createCharacter(input: AddCharacter): Character
        	 	updateCharacter(_id: String, input: UpdateCharacter): Character
        	 	deleteCharacter(_id: String): Boolean
        	 }
        	 schema {
        		query: Query
        		mutation: Mutation
      		 }`];
	}
}
