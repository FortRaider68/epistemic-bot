const JIMP = require('jimp')
const Crypto = require('crypto')
const BreakLinePhrase  = require('./utils/BreakLinePhrase');

const limitCaracters = 36;

const TmpDirectory = "tmp/Quotes"

async function CreateQuote(Phrase, src) {
  try {
    const image = await JIMP.read(src)

    const font = await JIMP.loadFont(JIMP.FONT_SANS_32_WHITE);

    const Quotes = BreakLinePhrase(Phrase,limitCaracters)

    Quotes.map(Quote => {
      const pixelsY = 56 + Quotes.indexOf(Quote) * 39
      const pixelsX = 33
      image.print(font, pixelsX,pixelsY,Quote)
    })

    Crypto.randomBytes(16,(err,bytes)=>{
      image.write(`${TmpDirectory}/${bytes.toString("HEX")}.png`)
    })
    console.log("Complete")
  } catch (error) {
    console.error(error);
  }


}


