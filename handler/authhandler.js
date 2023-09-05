const auth = require('../database/auth')

exports.autenticator  = async function(discordID)  {
    const autenticator = await auth.findOne({ discordID })
    if (autenticator) return autenticator.authID
    else return null 
}

exports.register = async function(discordID, authID) {
    const autenticator = await auth.create({
        discordID,
        authID
    })
    await autenticator.save().catch((err) => console.log(err))
}

exports.remove = async function(discordID) {
    await auth.deleteOne({ discordID })
}