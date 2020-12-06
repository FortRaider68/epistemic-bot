const JIMP = require('jimp')
const Crypto = require('crypto')
const fs = require("fs")


const validator = require("./utils/validator")
const sanitizer = require("./utils/sanitizer")


const TmpDirectory = "tmp/Quotes"

module.exports = async function CreateQuote(req) {
  const { Philosopher, Quote } = req
  try {
    const src = randomTemplate(`./assets/Templates/${Philosopher}`)

    const image = await JIMP.read(src)

    const font = await JIMP.loadFont(JIMP.FONT_SANS_32_WHITE);

    await image.print(font, 30, 25, Quote, 620)

    const fileName = `./${TmpDirectory}/${await Crypto.randomBytes(16).toString('hex')}.png`

    image.write(fileName)

    return fileName
  } catch (error) {
    console.error(error);
  }


}

function randomTemplate(directory) {
  const templates = fs.readdirSync(directory, { encoding: 'utf8', flag: 'r' })

  const chooseRandomTemplate = templates[Math.floor(Math.random() * templates.length)]

  return `${directory}/${chooseRandomTemplate}`
}

