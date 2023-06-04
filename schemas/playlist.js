import mongoose from "mongoose";
const { Schema } = mongoose;

// Playlist Schema
const playlistSchema = new Schema({
    name: {
        type: String,
        require: true,
        minLength: [1, "Playlist name can not be empty"]
    },
    musics: {
        type: Array,
        require: true
    }
});

export default playlistSchema;
