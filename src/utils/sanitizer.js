const fs = require('fs')
const regex_parser = require('regex-parser')

module.exports = function sanitizer(objectText) {
  let { Philosopher, Quote } = objectText

  const allPhilosophers = fs.readdirSync("./assets/Templates")

  const regexString = `/(?:${allPhilosophers.map(philosopherName => { return `${philosopherName}${allPhilosophers.indexOf(philosopherName) == allPhilosophers.length - 1 ? "" : "|"}` }).join("")})/gi`

  const philoNameMatch = new RegExp(regex_parser(regexString))


  if (Philosopher == null) {
    const randomPhilosopher = allPhilosophers[Math.floor(Math.random() * allPhilosophers.length)]
    Philosopher = randomPhilosopher;
  } else {
    Philosopher = Philosopher.match(philoNameMatch).toString()
    Philosopher = [...Philosopher[0].toUpperCase(), ...Philosopher.substring(1).toLowerCase()].join("")
  }


  Quote = Quote.substring(0, 192)

  return { Philosopher, Quote }

}