const Owner = require("../models/ownerSchema");

const botInfo = {
    name: "Djinn",
    description: "I'm a bot designed to assist developers in this channel.",
    functionalities: [
        { command: "info", description: "Display information about the bot" },
        { command: "help", description: "Show a list of available commands" },
        // Add more functionalities here
    ]
};

const addMember = async (ownerId, email) => {
    try {
        const owner = await Owner.findOne({ discordId: ownerId });
        if (!owner) {
            return "Owner not found";
        }
        if (owner.members.includes(email)) {
            return "Member already exists";
        }
        owner.members.push(email);
        await owner.save(); // Don't forget to save the updated document
        return "Member added successfully!";
    } catch (err) {
        console.error("Error in addMember:", err);
        return "An error occurred while adding the member";
    }
};


const wishUser = (message) => {
    const greetings = [
        "Hello there! How can I assist you today?",
        "Hi! Nice to see you. What can I do for you?",
        "Hey! I'm here to help. What do you need?"
    ];
    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
    message.reply(randomGreeting);
};

const sendBotInfo = (message) => {
    let infoMessage = `Hello! I'm ${botInfo.name}. ${botInfo.description} 😊\n\n`;
    infoMessage += "Here are some of my functionalities:\n";
    botInfo.functionalities.forEach(func => {
        infoMessage += `• ${func.command}: ${func.description}\n`;
    });
    message.reply(infoMessage);
};

const sendHelpMessage = (message) => {
    let helpMessage = "Here are the available commands:\n";
    botInfo.functionalities.forEach(func => {
        helpMessage += `• ${func.command}: ${func.description}\n`;
    });
    message.reply(helpMessage);
};

const wishNewUser = (member) => {
    const greetings = [
        "Welcome to the server! How can I assist you today?",
        "Hi there! We're glad to have you here. What can I help you with?",
        "Hello and welcome! Feel free to ask if you need anything."
    ];
    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
    member.send(randomGreeting).catch(console.error);
};

module.exports = {addMember, wishUser, sendBotInfo, sendHelpMessage, wishNewUser};