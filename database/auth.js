const { model, Schema } = require('mongoose')

module.exports = model( 'Auth', new Schema({
    discordID: { type: String },
    authID: { type: String }
}))