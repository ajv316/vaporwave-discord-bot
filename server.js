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
    message.channel.send
    ("```Prefix: [~~]```")
    message.channel.send
    ("```[~~]ping == Pong!```")
    message.channel.send
    ("```[~~]help == Displays this help message```")
    message.channel.send
    ("```[~~]help.dm == Dms the help message```")
    
  }
  if (command === "help.dm") {
    message.author.send
    ("```Prefix: [~~]```")
    message.author.send
    ("```[~~]ping == Pong!```")
    message.author.send
    ("```[~~]help == Displays the help message```")
    message.author.send
    ("```[~~]help.dm == Dms this help message```")
  }
  // Say meewo
  if (command === "say") {
    
  }
});  

client.login(process.env.BOT_TOKEN);