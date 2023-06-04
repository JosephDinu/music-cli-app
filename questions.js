export default class Questions {
    static music = [
        {
            type: "input",
            name: "title",
            message: "Title"
        },
        {
            type: "input",
            name: "artist",
            message: "Artist"
        },
        {
            type: "input",
            name: "album",
            message: "Album"
        },
        {
            type: "input",
            name: "genre",
            message: "Genre"
        },
        {
            type: "input",
            name: "releaseYear",
            message: "Release Year"
        },
        {
            type: "input",
            name: "duration",
            message: "Duration"
        },
    ]
    
    static playlist = [
        {
            type: "input",
            name: "name",
            message: "Playlist Name"
        },
    ]
    
    static musicToPlaylist = [
        {
            type: "input",
            name: "playlist",
            message: "Playlist Name"
        },
        {
            type: "input",
            name: "title",
            message: "Music Title"
        },
    ]
    
    static findOption = [
        {
            type: "input",
            name: "type",
            message: "You wanna find music(m) or playlist(p)"
        }
    ]

    static findMusic = [
        {
            type: "input",
            name: "data",
            message: "Input one music information (title, artist, album or genre)"
        }
    ]

    static findPlaylist = [
        {
            type: "input",
            name: "data",
            message: "Input your playlist name"
        }
    ]

    static choosePlaylist = [
        {
            type: "input",
            name: "number",
            message: "Many playlists with your input, please choose playlist's order number (number)"
        },
    ]

    static chooseMusic = [
        {
            type: "input",
            name: "number",
            message: "Many tracks with your input, please choose musics's order number (number)"
        },
    ]
} 
