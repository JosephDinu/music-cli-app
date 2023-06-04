#! /usr/bin/env node
import { Command } from "commander";
import { addMusic, findMusic, findPlaylist, updateMusic, deleteMusic, listAllMusics, newPlaylist, addMusicToPlaylist } from "./index.js";
import Questions from "./questions.js"
import inquirer from 'inquirer';

const program = new Command();

program
    .version("1.0.0")
    .description("Music CLI Application")

// ADD
program
    .command("add")
    .alias("a")
    .description("Add a music track")
    .action(() => {
        inquirer.prompt(Questions.music).then(answers => addMusic(answers));
    });

// FIND
program
    .command("find")
    .alias("f")
    .description("Find a music track or playlist")
    .action(function getAnswer () {
        inquirer.prompt(Questions.findOption).then(answers => {
            switch (answers.type) {
                case "m":
                    inquirer.prompt(Questions.findMusic).then(answers => {
                        findMusic(answers.data);
                    });
                break;

                case "p":
                    inquirer.prompt(Questions.findPlaylist).then(answers => {
                        findPlaylist(answers.data);
                    });
                break;

                default:
                    console.log('please input "m" or "p"');
                    getAnswer();
                break;
            }
        });
    });

// UPDATE
program
    .command("update <_id>")
    .alias("u")
    .description("Update a music track")
    .action((_id) => {
        inquirer.prompt(Questions.music).then(answers => updateMusic(_id, answers));
    });

// DELETE
program
    .command("delete <_id>")
    .alias("d")
    .description("Delete a music")
    .action(_id => deleteMusic(_id));

// LIST
program
    .command("list")
    .alias("l")
    .description("List all musics")
    .action(() => listAllMusics());

// ADD PLAYLIST
program
    .command("new-list")
    .alias("nl")
    .description("Add a playlist")
    .action(() => {
        inquirer.prompt(Questions.playlist).then(answer => newPlaylist(answer));
    })

// ADD MUSIC TO PLAYLIST
program
    .command("music-to-playlist")
    .alias("mtp")
    .description("Add a music to a playlist")
    .action(() => {
        inquirer.prompt(Questions.musicToPlaylist).then(answers => addMusicToPlaylist(answers.playlist, answers.title))
    })

program.parse(process.argv);
