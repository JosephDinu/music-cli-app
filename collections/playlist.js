import mongoose from "mongoose";
import Playlist from "../schemas/playlist.js";

const playlistCollection = mongoose.model("playlist", Playlist);

// Create new playlist
const newPlaylist = async (playlist)  => {
    playlist = {...playlist, musics: []}

    new playlistCollection(playlist)
        .save()
        .then((playlist) => {
            console.log(`Playlist \"${playlist.name}\" created`)
        })
        .catch(err => console.log(err.errors["name"].message))
        .finally(() => mongoose.disconnect());
}

// Find Playlist
const findPlaylist = async (info, option = false, connect = false) => {
    const search = new RegExp(info, "i"); //case insensitive
    return await findData(
        "playlist",
        playlistCollection,
        {name: search},
        option,
        connect
    )
}

// Delete
const deletePlaylist = async (_id) => {
    await playlistCollection
        .deleteOne({_id})
        .then(() => {
            console.log("Playlist Deleted");
        })
        .catch(err => console.log("The playlist id do not exist"));
        
    mongoose.disconnect();
};

const findData = async (type, collection, findQuery, option = false, connect = false) => {
    return await collection
    .find(findQuery)
    .exec()
    .then(result => {
        if (option) {
            return result
        }

        if (result.length !== 0) {
            console.log(result);
        }
        console.log(`${result.length} ${type} found`);
    })
    .catch(err => console.log(err))
    .finally(() => {
        if (!connect) { mongoose.disconnect(); }
    });
}

export {
    playlistCollection,
    findPlaylist,
    deletePlaylist,
    newPlaylist,
};
