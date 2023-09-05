const { ApplicationCommandOptionType } = require('discord.js')
const Itens = require('../../handler/itemhandler')

module.exports = class DelItem {
    constructor(client) {
        client,
        this.name = 'delitem'
        this.description = 'Deleta um item da base de dados'
        this.options = [{
            name: 'codigo',
            description: 'O código do item que deseja deletar',
            required: true,
            type: ApplicationCommandOptionType.Number
        }],

        this.execute = (async interaction => {
            const id = interaction.options.getNumber('codigo')
            const item = new Itens()
            await item.delete(id)

            let choices = []

            const params = await item.getParams()
            params.forEach(item => {
                const newItem = `${item.itemID} - ${item.itemNome}`
                const newChoice = {
                    name: newItem,
                    value: item.itemID
                }
                choices.push(newChoice)
            })

            client.application.commands.edit('1148288678834225336', { 
                options:  [{
                    name: 'codigo',
                    description: 'Informe o código do item desejado',
                    required: true,
                    type: ApplicationCommandOptionType.String,
                    choices: choices
                }, {
                    name: 'quantidade',
                    description: 'Informe a quantidade de itens que você possui',
                    required: true,
                    type: ApplicationCommandOptionType.Number
                }, {
                    name: 'cliente',
                    description: 'Informe o código de cliente desejado',
                    required: true,
                    type: ApplicationCommandOptionType.String,
                    choices: [
                        {
                            name: '1 - Morador',
                            value: '1'
                        },
                        {
                            name: '2 - Funcionário público',
                            value: '2'
                        }
                    ]
                }]
            })

            interaction.reply({content: 'Item deletado da base de dados com sucesso!'})
        })
    }
}