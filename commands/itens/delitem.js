const { ApplicationCommandOptionType } = require('discord.js')
const { changeParams } = require('../../handler/choicehandler')
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
            await changeParams(client, item)

            interaction.reply({content: 'Item deletado da base de dados com sucesso!'})
        })
    }
}