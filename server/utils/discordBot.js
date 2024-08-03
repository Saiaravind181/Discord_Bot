const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ] 
});

const {addMember, wishUser, sendBotInfo, sendHelpMessage, wishNewUser } = require('./botFunctions');

client.on('ready', () => {
    console.log("Djinn is online");
});

client.on('messageCreate', (message) => {
    if (message.author.bot) return;

    const content = message.content.toLowerCase();
    console.log("Received message:", content);

    if(content.includes('add as member')) {
        const email = content.split('add as member')[1].trim();
        console.log("Attempting to add member. OwnerID:", message.guild.ownerId, "Email:", email);
        addMember(message.guild.ownerId, email).then(response => {
          console.log("Add member response:", response);
          message.reply(response);
        }).catch(error => {
          console.error("Error in addMember:", error);
          message.reply("An error occurred while adding the member");
        });
    } else if (content === 'info') {
        sendBotInfo(message);
    } else if (content === 'help') {
        sendHelpMessage(message);
    }
});

client.login(process.env.BOT_TOKEN);

module.exports = client;