const Discord = require('discord.js');
const client = new Discord.Client({
  disableEveryone: true
});
const Prefix = process.env.BOT_PREFIX;

client.on('ready', () => {
  console.log(`Bot is ready`);
  console.log(`Bot logged on as ${client.user.tag}`);
  console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`);
  client.user.setPresence({ game: {name: "do ~~help"}})
});

client.on("guildCreate", guild => {
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). The guild has ${guild.memberCount} members`);
});

client.on("guildDelete", guild => {
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
});


// Command Handler | Commands
client.on("message", message => {
  if (message.author.bot) return;
  if(message.content.indexOf(Prefix) !== 0) return;

  const args = message.content.slice(Prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  if (!args) message.channel.send("You don't have the enough arguments!");
  
  // Ping!
  if (command === "ping") {
    message.channel.send("Pong*!*");
  }
  // Help!
  if (command === "help") {
    const embed = new Discord.RichEmbed()
    .setColor(0xff71ce)
    .setTitle("Help | Commands:")
    .setDescription("**>>>>>>>>>>>>>>>>>>>>>>>>>**")
    .addField("Prefix", "``~~``")
    .addField("~~help", "Displays this message")
    .addField("~~help.dm", "Dms the help message instead")
    .addField("~~ping", "Pong*!*")
    .addField("~~say", "Repeats the typed text")
    message.channel.send(embed)
  }
  if (command === "help.dm") {
    message.channel.send("*Help has been sent!*")
    const embed = new Discord.RichEmbed()   
    .setColor(0xff71ce)
    .setTitle("Help | Commands:")
    .setDescription("**>>>>>>>>>>>>>>>>>>>>>>>>>**")
    .addField("Prefix", "``~~``")
    .addField("~~help", "Displays the help message")
    .addField("~~help.dm", "Dms this message")
    .addField("~~ping", "Pong*!*")
    .addField("~~say", "Repeats the typed text")
    
    message.author.send(embed)
  }
  // Say meewo
  if (command === "say") {
    message.delete()
    message.channel.send(`${args.join(" ")}`)
  }
  // Kick command
  if (command === "kick") {
    // Scan if the member is kickable
      if(!message.member.roles.some(r=>["Administrator", "Moderator", "Mod", "Admin", "mod", "admin", "Owner", "owner"].includes(r.name)) )
      return message.reply("You don't have the permission to use this command ~_~");
    
        let member = message.mentions.members.first();
    if(!member)
      return message.reply("You need to mention someone to kick ~_~");
    if(!member.kickable) 
      return message.reply("Cannot kick user beacause he/she might be : **Higher than me, an error has occured, I don't have the permission to kick** ~_~ ");
    
    let reason = args.slice(1).join(' ');
    if(!reason)
      return message.reply("You need a reason for the kick ~_~");

    member.kick(reason)
      .catch(error => message.reply(`Sorry ${message.author} Cannnot kick user because of : ${error}`));
    message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because of ${reason} ~_~`);

  }
  // Ban Command
   if(command === "ban") {
    // Most of this command is identical to kick, except that here we'll only let admins do it.
    // In the real world mods could ban too, but this is just an example, right? ;)
    if(!message.member.roles.some(r=>["Administrator", "Moderator", "Mod", "Admin", "mod", "admin", "Owner", "owner"].includes(r.name)) )
      return message.reply("You don't have the permission to use this command ~_~");
    
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("You need to mention someone to ban ~_~");
    if(!member.bannable) 
      return message.reply("Cannot ban user beacause he/she might be : **Higher than me, an error has occured, I don't have the permission to ban** ~_~ ");

    let reason = args.slice(1).join(' ');
    if(!reason)
      return message.reply("You need a reason for the kick ~_~");
    
    member.ban(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
    message.reply(`${member.user.tag} has been banned by ${message.author.tag} because of ${reason} ~_~`);
  }
});  

client.login(process.env.BOT_TOKEN);