const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

mongoose.set('useFindAndModify', false);

const movieSchema = new Schema({
    movieId: ObjectId,
    title: {
        type: String,
        require: true
    },
    year: Number,
    image: [String],
    description: {
        type: String,
        default: "Descripción no disponible"
    },
    theme: {
        type: String,
        enum: ["comedia","drama", "terror", "infantil", "acción"]
    },
    director: {
        type: String,
        maxlength: 30,
    }
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = { Movie }