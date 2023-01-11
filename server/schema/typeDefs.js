const typeDefs = `#graphql
    type Movie{
        id: ID!
        name: String!
        genre: String!
        yearReleased: Int!
        rating: Float!
        favoriteMovies: [Movie]
    }

    type Query{
        movies: [Movie!]!
        movie(id: ID!): Movie!
    }

    input AddMovieInput{
        name: String!
        genre: String!
        yearReleased: Int!
        rating: Float!
    }

    input UpdateMovieInput{
        id: ID!
        name: String!
        genre: String!
        yearReleased: Int!
        rating: Float!
    }

    type Mutation{
        addMovie(input: AddMovieInput!): Movie
        updateMovie(input: UpdateMovieInput!): Movie!
        deleteMovie(name: String!): Movie
    }
`
module.exports = { typeDefs }