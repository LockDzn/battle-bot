//Discord command framework by Jowbly

const fs = require("fs");
const enmap = require("enmap");
module.exports.client = null;

console.log("  ")
console.log("[FRAMEWORK] Discord.js command and event handler.")
console.log("[FRAMEWORK] Developed by: Jowbly")
console.log("[FRAMEWORK] Version: 1.0")
module.exports.loadEvents = function(){
  console.log("  ")
  console.log("[INFO] BOT loader has been started.")
  console.log("  ")

  fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
      const event = require(`./events/${file}`);
      let eventName = file.split(".")[0];
      console.log(`[SUCCESS] Event ${eventName}.js loaded.`);
      this.client.on(eventName, event.bind(null, this.client));
    });
  });

  
  
}

module.exports.loadCommands = function (){

  this.client.commands = new enmap();

    fs.readdir("./commands/", (err, files) => {
        if (err) return console.error(err);
        files.forEach(file => {
          const event = require(`./commands/${file}`);
          let commandName = file.split(".")[0];
          console.log(`[SUCCESS] Command ${commandName}.js loaded.`);
          this.client.commands.set(commandName, event);
        });
      });


    this.client.on("ready", () => {

      console.log("  ")
      console.log("[SUCCESS] Commands and events has been registered.")
      console.log("  ")
      console.log("[SUCCESS] Logged in "+this.client.user.username+"#"+this.client.user.discriminator+".");
  

    });

    this.client.on("message", (message) => {


        if (message.author.bot) return;
        
          var prefix = "!";
          // Ignore messages not starting with the prefix (in config.json)
          if (message.content.indexOf(prefix) !== 0) return;
        
          // Our standard argument/command name definition.
          const args = message.content.slice(prefix.length).trim().split(/ +/g);
          const command = args.shift().toLowerCase();
        
          // Grab the command data from the client.commands Enmap
          const cmd = this.client.commands.get(command);
        
          // If that command doesn't exist, silently exit and do nothing
          if (!cmd) return;
      
          // Run the command
          cmd.run(this.client, message, args);
      
      });

}