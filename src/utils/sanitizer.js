const fs = require('fs')
const regex_parser = require('regex-parser')

module.exports = function sanitizer(objectText) {

  const text = objectText.trim()

  const removeMention = /<@&[0-9]{18}>/g

  const textWithoutMention = text.replace(removeMention, "").trim()

  let [Philosopher, ...partsQuote] = textWithoutMention.split(" ")

  let Quote = partsQuote.join(" ")

  const allPhilosophers = fs.readdirSync("./assets/Templates")

  const regexString = `/(?:${allPhilosophers.map(philosopherName => { return `${philosopherName}${allPhilosophers.indexOf(philosopherName) == allPhilosophers.length - 1 ? "" : "|"}` }).join("")})/gi`

  const philoNameMatch = new RegExp(regex_parser(regexString))

  const philosopherMatch = Philosopher.match(philoNameMatch)

  if (philosopherMatch == null) {
    const randomPhilosopher = allPhilosophers[Math.floor(Math.random() * allPhilosophers.length)]
    Quote = `${Philosopher} ${Quote}`
    Philosopher = randomPhilosopher;
  } else {
    Philosopher = philosopherMatch.toString()
    Philosopher = [...Philosopher[0].toUpperCase(), ...Philosopher.substring(1).toLowerCase()].join("")
  }

  Quote = Quote.substring(0, 192)

  return { Philosopher, Quote }

}