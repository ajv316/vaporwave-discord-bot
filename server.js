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

// Command Handler
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
  // Mute cmd
  if (command === "mute") {
    
  }
});  

client.login(process.env.BOT_TOKEN);