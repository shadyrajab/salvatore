const { Client } = require('discord.js')
const getCommands = require('./handler/commandhandler') 
const mongoose = require('mongoose')

require('dotenv').config()

const client = new Client({
    intents: [
        'GuildMembers',
        'GuildMessages'
    ]
})

const commands = getCommands(client)

client.on('ready', client => {
    console.log(`${client.user.username} está online!`)
    // client.application.commands.set(commands)
})

client.on('interactionCreate', async interaction => {
    const { commandName, member, memberPermissions } = interaction

    const command = commands.find(command => command.name === commandName)

    if (commandName === 'additem') {
        const permission = memberPermissions.has('Administrator')
        if (!permission) return interaction.reply({content: 'Somente administradores podem utilizar este comando!', ephemeral: true})
        command.execute(interaction)
    }

    else if (commandName === 'item') {
        try {
            command.execute(interaction)
        } catch {

        } 
    }

    else if (commandName === 'delitem') {
        try {
            command.execute(interaction)
        } catch {

        }
    }
})

client.login(process.env.TOKEN)
mongoose.Promise = global.Promise;
mongoose.connect(process.env.CONNECTION)
    .catch((err) => console.log(`Error while connection: ${err}`));