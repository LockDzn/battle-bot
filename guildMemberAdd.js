module.exports = (client, member) => {
   
   member.guild.channels.get(config.TICKET_CHANNELID).send("``👤`` Seja muito bem vindo ao nosso Discord, "+member.user.toString()+", contamos atualmente com ``"+member.guild.members.size+"`` jogadores no Discord!")
  
};