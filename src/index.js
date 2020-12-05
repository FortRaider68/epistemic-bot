const JIMP = require('jimp')
const Crypto = require('crypto')

const validator = require("./utils/validator")
const sanitizer = require("./utils/sanitizer")


const TmpDirectory = "tmp/Quotes"

async function CreateQuote(Phrase, src) {
  try {
    const image = await JIMP.read(src)

    const font = await JIMP.loadFont(JIMP.FONT_SANS_32_WHITE);
    
    await image.print(font,30,25,Phrase,620)

    Crypto.randomBytes(16,(err,bytes)=>{
      image.write(`${TmpDirectory}/${bytes.toString("HEX")}.png`)
    })
    console.log("Complete")
  } catch (error) {
    console.error(error);
  }


}


