const { ApplicationCommandOptionType } = require('discord.js')

exports.changeParams = async function(client, item) {
    let choices = [];
    const params = await item.getParams()
    params.forEach(item => {
        const newItem = `${item.itemID} - ${item.itemNome}`
        const newChoice = {
            name: newItem,
            value: item.itemID
        }
        choices.push(newChoice)
    })

    // Alterando os parâmetros do comando /additem
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


    // Alterando os parâmetros do comando /delitem
    client.application.commands.edit('1148630882442301462', { 
        options:  [{
            name: 'codigo',
            description: 'O código do item que deseja deletar',
            required: true,
            type: ApplicationCommandOptionType.Number,
            choices: choices
        }]
    })
}