const { ApplicationCommandOptionType } = require('discord.js')
const { changeParams } = require('../../handler/choicehandler')
const Itens = require('../../handler/itemhandler')

module.exports = class addItem {
    constructor(client) {
        client
        this.name = 'additem'
        this.description = 'Adiciona um novo item à lista'
        this.options = [{
            name: 'codigo',
            description: 'Informe o código do item que deseja adicionar',
            required: true,
            type: ApplicationCommandOptionType.String
        }, {
            name: 'nome',
            description: 'Informe o nome desejado para o item',
            required: true,
            type: ApplicationCommandOptionType.String
        }, {
            name: 'valor_compra_morador',
            description: 'Informe o preço de compra desejado para o item',
            required: true,
            type: ApplicationCommandOptionType.Number
        }, {
            name: 'valor_venda_morador', 
            description: 'Informe o preço de venda para o item',
            required: true,
            type: ApplicationCommandOptionType.Number
        }, {
            name: 'porcentagem_lucro_morador',
            description: 'Informe o lucro desejado para a venda do item(em porcentagem)',
            required: true,
            type: ApplicationCommandOptionType.Number
        }, {
            name: 'valor_compra_funcionario',
            description: 'Informe o preço de compra desejado para o item',
            required: true,
            type: ApplicationCommandOptionType.Number
        }, {
            name: 'valor_venda_funcionario', 
            description: 'Informe o preço de venda para o item',
            required: true,
            type: ApplicationCommandOptionType.Number
        }, {
            name: 'porcentagem_lucro_funcionario',
            description: 'Informe o lucro desejado para a venda do item(em porcentagem)',
            required: true,
            type: ApplicationCommandOptionType.Number
        }]

        this.execute = async (interaction) => {
            const item = new Itens()
            const id = interaction.options.getString('codigo')
            const itemNome = interaction.options.getString('nome')
            const valorCompraMorador = interaction.options.getNumber('valor_compra_morador')
            const valorVendaMorador = interaction.options.getNumber('valor_venda_morador')
            const lucroMorador = interaction.options.getNumber('porcentagem_lucro_morador')
            const valorCompraFuncionario = interaction.options.getNumber('valor_compra_funcionario')
            const valorVendaFuncionario = interaction.options.getNumber('valor_venda_funcionario')
            const lucroFuncionario = interaction.options.getNumber('porcentagem_lucro_funcionario')
            if (await item.get(id)) {
                return interaction.reply({content: 'Já existe um item com este ID'})
            } else {
                item.add(id, itemNome, valorCompraMorador, valorVendaMorador, valorCompraFuncionario, valorVendaFuncionario, lucroMorador, lucroFuncionario)
                await changeParams(client, item)
                return interaction.reply({content: 'Item adicionado com sucesso à base de dados, reinicie o discord caso a lista de parâmetros do comando **/item** não seja atualizada.'})
            }
        }
    }
}
