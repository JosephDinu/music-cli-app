import mongoose from "mongoose";
import Playlist from "../schemas/playlist.js";
import { musicCollection } from "./music.js"
import inquirer from "inquirer";
import Questions from "../questions.js"

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

const removeMusicFromList = async (name) => {
    const playlist = await findPlaylist(name, true, true)

    // We have 3 cases: not found, 1 and more than 1
    // In case found many playlist, allow user to choose exact one
    switch (playlist.length) {
        case 0:
            console.log("Your playlist name is not correct");
            mongoose.disconnect();
            break;

        case 1:
            displayPlaylist(playlist[0]);
        break;

        default:
            console.log('more playlist');

            let playlistIndex = 0;
            let list = {}

            // Create data to display to user
            playlist.forEach((element, index) => {
                list[index] = element;
            });
            console.log(list);

            // Prompt for user to choose exact playlist
            await inquirer.prompt(Questions.choosePlaylist).then(answer => {
                if (!Object.keys(list).includes(answer.number)){
                    console.log("Your playlist order number is not correct");
                    mongoose.disconnect();
                    return;
                } else {
                    playlistIndex = answer.number*1;
                }
            });

            // Promt for user to choose exact music tracks, then delete and update playlist
            displayPlaylist(playlist[playlistIndex]);
        break;
    }
}

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

const displayPlaylist = async (playlist) => {
    let listDisplay = {}
    let index = 0
    const musicList = playlist.musics

    // Create data to display to user
    for (const item of musicList) {
        await musicCollection
            .findById(item)
            .exec()
            .then(result => listDisplay[index] = {title: result.title, _id: item})
            .then(() => index += 1)
    }

    console.log(listDisplay);

    // Prompt for user to choose exact music track, then delete and update
    inquirer.prompt(Questions.chooseMusic).then(async answer => {
        if (!Object.keys(listDisplay).includes(answer.number)) {
            console.log("Your number is not correct.");
            mongoose.disconnect();
            return;
        }

        musicList.splice(answer.number, 1);
        await playlistCollection
            .findByIdAndUpdate(playlist._id.toString(), {musics: musicList})
            .exec()
            .then(() => {
                console.log("Your playlist updated.")
            })
            .finally(() => mongoose.disconnect())
    })
}

export {
    playlistCollection,
    findPlaylist,
    deletePlaylist,
    newPlaylist,
    removeMusicFromList
};
