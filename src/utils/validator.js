
module.exports = function validator(textContent) {

  const haveMetion = /<@&[0-9]{18}>/g

  const mention = textContent.match(haveMetion)

  if (mention.length != 1) {
    throw new Error("Invalid Mention")
  }

  const textWithoutMention = textContent.replace(haveMetion, "").trim()

  const parts = textWithoutMention.split(" ")
    .filter(word => { return word != "" })

  return textContent

}

