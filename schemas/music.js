import mongoose from "mongoose";
const { Schema } = mongoose;

// Add a custom validator to all strings
// mongoose.Schema.Types.String.set('validate', v => v === null || v > 0);

//Music track Schema
const musicSchema = new Schema({
    title: {
        type: String,
        require: true,
        minLength: [1, "Title can not be empty"],
    },
    artist: {
        type: String,
        require: true,
        minLength: [1, "Artist can not be empty"]
    },
    album: {
        type: String,
        require: true,
        minLength: [1, "Album can not be empty"]
    },
    genre: {
        type: String,
        require: true,
        minLength: [1, "Genre can not be empty"]
    },
    releaseYear: {
        type: Date,
        require: true,
    },
    duration: {
        type: String,
        require: true,
        minLength: [1, "Duration can not be empty"]
    }
});

export default musicSchema;
