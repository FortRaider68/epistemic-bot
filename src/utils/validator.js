const fs = require("fs")
const regex_parser = require('regex-parser')

module.exports = function validator(textContent) {

  const parts = textContent.split(" ")
    .filter(word => { return word != "" })

  let [Profile, Philosopher, ...partsQuote] = parts
  const Quote = partsQuote.join(" ")

  if (Profile != "@epistemicBot") {
    throw new Error("Invalid Profile request")
  }

  const allPhilosophers = fs.readdirSync("./assets/Templates")

  const regexString = `/(?:${allPhilosophers.map(philosopherName => {return `${philosopherName}${allPhilosophers.indexOf(philosopherName) == allPhilosophers.length-1 ? "" : "|"}`}).join("")})/gi`

  const philoNameValidator = new RegExp(regex_parser(regexString))

  if(!philoNameValidator.test(Philosopher)){
    Philosopher = null
  }

  return { Profile, Philosopher, Quote }

}

