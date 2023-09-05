const { model, Schema } = require('mongoose')

module.exports = model( 'Itens', new Schema({
    itemID: { type: String },
    itemNome: { type: String },
    valorCompraMorador: { type: Number },
    valorVendaMorador: { type: Number },
    valorCompraFuncionario: { type: Number },
    valorVendaFuncionario: { type: Number },
    lucroMorador: { type: Number },
    lucroFuncionario: { type: Number }
}))