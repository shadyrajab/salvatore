const { ApplicationCommandOptionType } = require('discord.js')
const { register, autenticator, remove } = require('../../handler/authhandler')

module.exports = class Auth {
    constructor(client) {
        client,

        this.name = 'auth',
        this.description = 'Adiciona ou remove o RG de um usuário à base de dados'
        this.options = [{
            name: 'usuario',
            description: 'O usuário que deseja autenticar',
            required: true,
            type: ApplicationCommandOptionType.User
        }, {
            name: 'rg',
            description: 'O RG do usuário',
            required: true,
            type: ApplicationCommandOptionType.String
        }, {
            name: 'option', 
            description: 'Se deseja remover ou adicionar ou remover',
            required: true,
            type: ApplicationCommandOptionType.String,
            choices: [
                {
                    name: 'Adicionar',
                    value: 'add'
                },
                {
                    name: 'Remover',
                    value: 'remove'
                }
            ]
        }],

        this.execute = async (interaction) => {
            const user = interaction.options.getUser('usuario')
            const rg = interaction.options.getString('rg')
            const option = interaction.options.getString('option')
            const auth = await autenticator(user.id)

            if (option === 'add') {
                if (auth) return interaction.reply({content: 'Este usuário já está autenticado na base de dados', ephemeral: true})
                await register(user.id, rg)
                interaction.reply({content: 'Usuário autenticado com sucesso!', ephemeral: true})
            } else if (option === 'remove') {
                if (!auth) return interaction.reply({content: 'Este usuário não está cadastrado na base de dados', ephemeral: true})
                await remove(user.id)
                interaction.reply({content: 'Usuário removido com sucesso!', ephemeral: true})
            }
            
        }
    }
}