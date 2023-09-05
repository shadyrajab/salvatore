const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js')

const Itens = require('../../handler/itemhandler')
const { autenticator } = require('../../handler/authhandler')

module.exports = class Item {
    constructor(client) {
        client
        this.name = 'item'
        this.description = 'Calcula a porcentagem de lucro de um item'
        this.options = [{
            name: 'codigo',
            description: 'Informe o código do item desejado',
            required: true,
            type: ApplicationCommandOptionType.String
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
        },
           {
            name: 'quantidade',
            description: 'Informe a quantidade de itens que você possui',
            required: true,
            type: ApplicationCommandOptionType.Number
        }]

        this.execute = async (interaction) => {
            let lucro, fields;
            const { options, user } = interaction
            const id = options.getString('codigo')
            const cliente = options.getString('cliente')
            const quant = options.getNumber('quantidade')
            const itens = new Itens()
            const auth = await autenticator(user.id)
            if (!auth) return interaction.reply({content: 'Você não pode utilizar esse comando pois seu registro não está na base de dados, fale com um administrador.'})
            const { itemNome, valorCompraMorador, valorVendaMorador, valorCompraFuncionario, valorVendaFuncionario, lucroMorador, lucroFuncionario } = await itens.get(id)
            if (cliente === '1') {
                lucro = (valorVendaMorador * (lucroMorador * 0.01)) * quant
                fields = [ 
                    { name: '📋 RG do usuário', value: auth.toString(), inline: true},
                    { name: '💳 Valor de compra', value: (valorCompraMorador * quant).toString(), inline: true },
                    { name: '💰 Valor de venda', value: (valorVendaMorador * quant).toString(), inline: true },
                    { name: '📋 Quantidade', value: quant.toString(), inline: true },
                    { name: '📐 Porcentagem de lucro', value: `${lucroMorador.toString()}%`, inline: true},
                    { name: '💸 Valor a repassar', value: lucro.toString(), inline: true}
                ]
            }
            else if (cliente === '2') {
                lucro = (valorVendaFuncionario * (lucroFuncionario * 0.01)) * quant
                fields = [ 
                    { name: '📋 RG do usuário', value: auth.toString(), inline: true},
                    { name: '💳 Valor de compra', value: (valorCompraFuncionario * quant).toString(), inline: true },
                    { name: '💰 Valor de venda', value: (valorVendaFuncionario * quant).toString(), inline: true },
                    { name: '📋 Quantidade', value: quant.toString(), inline: true },
                    { name: '📐 Porcentagem de lucro', value: `${lucroFuncionario.toString()}%`, inline: true},
                    { name: '💸 Valor a repassar', value: lucro.toString(), inline: true}
                ]
            }
            const embed = new EmbedBuilder()
                .setColor(0x1092bb)
                .setTimestamp()
                .setFooter({ text: user.username, iconURL: user.avatarURL() })
                .setAuthor({ name: itemNome })
                .addFields(fields)

            interaction.reply({embeds:[embed]})
        }
    }
}
