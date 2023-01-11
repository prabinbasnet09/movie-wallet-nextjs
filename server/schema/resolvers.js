const Movie  = require('../models/Movie')

const resolvers = {
    Query: {
        movies: async () => {
            return await Movie.find({});
        },

        movie: async (_, args) => {
            const id = args.id;
            const movie = await Movie.findById({_id: id});
            return movie;
        },
    },

    Mutation: {
        addMovie: async (_, args) => {
            const movie = args.input;

            const newMovie = new Movie({
                name: movie.name,
                genre: movie.genre,
                yearReleased: movie.yearReleased,
                rating: movie.rating
            });

            const res = await newMovie.save();
            return {
                id: res.id,
                ...res._doc
            };
        },

        updateMovie: async (_, args) => {
            const updateMovie = args.input;

            let movie = await Movie.findById(updateMovie.id).exec();

            movie.name = updateMovie.name;
            movie.genre = updateMovie.genre;
            movie.yearReleased = updateMovie.yearReleased;
            movie.rating = updateMovie.rating;
            
            const res = await movie.save();
            return {
                id: res.id,
                ...res._doc
            };
        },

        deleteMovie: async (_, args) => {
            await Movie.deleteOne({ name: args.name});
            return null;
        }
    },
};

module.exports = { resolvers }
