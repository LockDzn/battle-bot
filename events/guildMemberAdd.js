const Discord = require("discord.js");
const config = require('./../config.json');

module.exports = (client, member) => {
   
   member.guild.channels.get(config.TICKET_CHANNELID).send("``👤`` Seja muito bem vindo ao nosso Discord, "+member.user.toString()+", contamos atualmente com ``"+member.guild.members.size+"`` jogadores no Discord!")
  
   const embed = new Discord.RichEmbed()
      .setTitle("🎫 Ticket")
      .setDescription(`Precisa de ajuda sobre qualquer coisa relacionada ao servidor, site ou mais? Reaja ao emoji :envelope_with_arrow:\n
\`Só faça isso quando precisar de ajuda, o spam de ticket resultará em punição.\``)
      .setColor("#ff0000")
   
      client.channels.get(config.TICKET_CHANNELID).bulkDelete("10");
      client.channels.get(config.TICKET_CHANNELID).send(embed).then(async msg => {   
      await msg.react("📩")
   
      const collector = msg.createReactionCollector((r, u) => (r.emoji.name === "📩" && u.id !== client.user.id))
   
      collector.on("collect", async r => {

         var user = r.users.filter(u => u.id !== client.user.id).map(users => users);
         r.remove(user[0].id)
         var guild = client.guilds.get("581848652511838208")
   
         if(r.emoji.name == "📩"){

            const embedT = new Discord.RichEmbed()
                  .setTitle(`${user[0].username.toLowerCase()}#${user[0].discriminator}`)
                  .setDescription(`Obrigado por criar um ticket!
Digite sua dúvida que o suporte estará com você em breve.\n
\`O ticket será fechado quando sua dúvida for resolvida!\``)
                  .setColor("#2ecc71")
   
            let category = guild.channels.find(c => c.name === "TICKETS")
            if(!category || category.type !== "category")
               category = await guild.createChannel("TICKETS", "category")
   
            let channel = guild.channels.find(ch => ch.name === `🎫︱${user[0].username.toLowerCase()}-${user[0].discriminator}`)
                
            if(channel) return channel.send(`${user[0]} você já tem um ticket criado, aguarde um suporte responder sua dúvida`)
            if(!channel) 
               channel = await guild.createChannel(`🎫${user[0].username}-${user[0].discriminator}`, "text", [{    
                  id: client.user.id,
                  allowed: ["VIEW_CHANNEL", "MANAGE_CHANNELS", "READ_MESSAGE_HISTORY"]
               }, {
                   id: user[0].id,
                   allowed: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"]
               }, {
                   id: guild.roles.find(c => c.name === "Suporte ticket").id,
                   allowed: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"]
               }, {
                   id: guild.defaultRole.id,
                   denied: Discord.Permissions.ALL,
                   allowed: ["READ_MESSAGE_HISTORY"]
               }])
   
               await channel.setParent(category.id)
               await channel.send(user[0], embedT)
   
           }
      })
   })
};