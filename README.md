# Music-cli application
Node version
v18.16.0

Install mongodb docker:

`docker run --name music-cli -p 27017:27017 -d mongo:6.0.1`

Cd to music-cli-app directory,
Install node and create app

`npm i`
`npm link`

Command use:

`music-cli --help`

Create new music:          `music-cli new-music`

Find music/playlist:    `music-cli find`

List all music          `music-cli list`

Update music            `music-cli update <_id>`

Delete music            `music-cli delete-music <_id>`

Create new playlist:       `music-cli new-list`

Delete playlist         `music-cli delete-playlist <_id>`

Add music to playlist   `music-cli add-music`

Remove music in playlist   `music-cli remove-music`
