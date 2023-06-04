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

Add new music:          `music-cli add`

Add new playlist:       `music-cli new-list`

Find music/playlist:    `music-cli find`

Update music            `music-cli update <_id>`

Delete music            `music-cli delete-music <_id>`

Delete playlist         `music-cli delete-playlist <_id>`

List all music          `music-cli list`

Add music to playlist   `music-cli music-to-list`
