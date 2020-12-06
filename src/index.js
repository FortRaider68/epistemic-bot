const Discord = require("discord.js")
const fs = require('fs')


const validator = require('./utils/validator')
const sanitizer = require('./utils/sanitizer')
const quoteCreator = require('./quoteCreator')

const client = new Discord.Client()

require("dotenv").config()

client.on("message", async (message) => {
  const botID = message.mentions.toJSON().roles[0]

  if (!message.author.bot && message.content.includes(botID)) {
    const userSend = message.author;
    const Content = message.content

    const ValidateContent = validator(Content)

    const sanitizerContent = sanitizer(Content)

    const pathQuote = await quoteCreator(sanitizerContent)

    message.channel.send(`${userSend}`, { files: [pathQuote] }, (err, response) => {
      if (response) {
        fs.unlinkSync(pathQuote)
      }
    })


  }
})


client.login(process.env.DISCORD_TOKEN)

