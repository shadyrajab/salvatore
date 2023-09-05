const Itens = require('../database/scheme')

module.exports = class Item {
    constructor() {}

    async add (itemID, itemNome, valorCompraMorador, valorVendaMorador, valorCompraFuncionario, valorVendaFuncionario, lucroMorador, lucroFuncionario) {
        const item = await Itens.create({
            itemID: itemID,
            itemNome: itemNome,
            valorCompraMorador: valorCompraMorador,
            valorVendaMorador: valorVendaMorador,
            valorCompraFuncionario: valorCompraFuncionario,
            valorVendaFuncionario: valorVendaFuncionario,
            lucroMorador: lucroMorador,
            lucroFuncionario: lucroFuncionario
        })
        await item.save().catch((err) => console.log(err))
    }

    async delete (id) {
        await Itens.deleteOne({ itemID: id })
    }

    async get(id) {
        let item = await Itens.findOne({ itemID: id })
        return item
    }

    async getParams() {
        let itens = await Itens.find()
        return itens
    }
}