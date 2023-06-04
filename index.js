import mongoose from "mongoose";
import Music from "./schemas/music.js";
import Playlist from "./schemas/playlist.js";
import inquirer from 'inquirer';
import Questions from "./questions.js";

// Map global promise - get rid of warning
mongoose.Promise = global.Promise;

// Connect to db
const db = mongoose.connect("mongodb://localhost:27017/musiccli").then(() => {
    // console.log("Connnect DB successfully");
});
const musicCollection = mongoose.model("music", Music);
const playlistCollection = mongoose.model("playlist", Playlist);

// Create new music
const addMusic = async (music) => {
    new musicCollection(music)
        .save()
        .then(() => {
            console.log("New Music Track Added")
        })
        .catch(err => logError(err))
        .finally(() => mongoose.disconnect())
};

// Find Music
const findMusic = async (info, option = false, connect = false) => {
    const search = new RegExp(info, "i"); //case insensitive
    return await findData(
        "music",
        musicCollection,
        {$or: [{title: search}, {artist: search}, {album: search}, {genre: search}]},
        option,
        connect
    )
};

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

// Update
const updateMusic = async (_id, music) => {
    await musicCollection
        .findByIdAndUpdate({_id}, music)
        .then(() => {
            console.log("Music Updated");
        })
        .catch(err => logError(err))
        .finally(() => mongoose.disconnect());
};

// Delete
const deleteMusic = async (_id) => {
    // Remove music id from playlist
    await playlistCollection
    .find({musics : _id})
    .exec()
    .then(result => {
        result.forEach(async item => {
            item.musics.splice(item.musics.indexOf(_id), 1);
            
            await playlistCollection.findOneAndUpdate({_id: item._id.toString()}, {musics: item.musics})
        })
    });

    await musicCollection
        .deleteOne({_id})
        .then(() => {
            console.log("Music Deleted");
        })
        .catch(err => console.log("The music id do not exist"));
        
    mongoose.disconnect();
};

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

// List all musics
const listAllMusics = async () => {
    await musicCollection
        .find({})
        .then(musics => {
            if (musics.length !== 0) {
                console.log(musics);
            }

            console.log(`You have ${musics.length} music tracks`)
        })
        .finally(() => mongoose.disconnect());
};

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

// Add a music to playlist
const addMusicToPlaylist = async (playlistName, title) => {
    // Find playlist by name
    const playlist = await findPlaylist(playlistName, true, true);
    if (playlist.length === 0) {
        console.log("Can not find your playlist");
        mongoose.disconnect();
        return;
    }

    // Find music by title
    const music = await findMusic(title, true, true);
    if (music.length === 0) {
        console.log("Can not find your music");
        mongoose.disconnect();
        return;
    }

    let playlistIndex = 0;
    let musicIndex = 0;

    if (playlist.length > 1) {
        let list = {}
        playlist.forEach((element, index) => {
            list[index] = element;
        });

        console.log(list);
        await inquirer.prompt(Questions.choosePlaylist).then(answer => {
            if (!Object.keys(list).includes(answer.number)){
                console.log("Your playlist order number is not correct");
                mongoose.disconnect();
                return;
            } else {
                playlistIndex = answer.number*1;
            }
        })
    }

    if (music.length > 1) {
        let list = {}
        music.forEach((element, index) => {
            list[index] = element;
        });

        console.log(list);
        await inquirer.prompt(Questions.chooseMusic).then(answer => {
            if (!Object.keys(list).includes(answer.number)){
                console.log("Your music order number is not correct");
                mongoose.disconnect();
                return;
            } else {
                musicIndex = answer.number*1;
            }
        })
    }

    // Check whether this musicId is in playlist
    const musicId = music[musicIndex]._id.toString();
    if (playlist[playlistIndex].musics.includes(musicId)) {
        console.log("Your music is in playlist already");
        mongoose.disconnect();
        return;
    }
    
    // Push musicId and update playlist
    const musicList = [...playlist[playlistIndex].musics]
    musicList.push(musicId);

    await playlistCollection
        .findOneAndUpdate({_id: playlist[playlistIndex]._id.toString()}, {musics: musicList})
        .then(() => {
            console.log("Your music has been added to playlist")
        })
        .finally(() => mongoose.disconnect());
}

const logError = (err) => {
    for (let field in err.errors) {
        if (field === "releaseYear") {
            console.log("The date format is not correct")
        } else {
            console.log(err.errors[field].message)
        }
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
