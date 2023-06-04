import mongoose from "mongoose";
import { addMusic, findMusic, updateMusic, deleteMusic, listAllMusics, addMusicToPlaylist } from "./collections/music.js";
import { findPlaylist, deletePlaylist, newPlaylist } from "./collections/playlist.js"

// Map global promise - get rid of warning
mongoose.Promise = global.Promise;

// Connect to db
const db = mongoose.connect("mongodb://localhost:27017/musiccli").then(() => {
    // console.log("Connnect DB successfully");
});

export {
    addMusic,
    findMusic,
    findPlaylist,
    updateMusic,
    deleteMusic,
    deletePlaylist,
    listAllMusics,
    newPlaylist,
    addMusicToPlaylist
};
