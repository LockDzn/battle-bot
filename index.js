const Discord = require("discord.js");
const Enmap = require("enmap");
const client = new Discord.Client();

const cmdFramework = require("./cmdFramework");
const cfg = require('./config');

cmdFramework.client = client;
cmdFramework.loadCommands();
cmdFramework.loadEvents();


client.login(cfg.BOT_TOKEN);