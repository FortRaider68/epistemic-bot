module.exports = function BreakLinePhrase(Phrase, limitCaracters) {
  let ArrayPhrase = []
  const CaractersOfString = Phrase.split('')

  let FirstCaracterInCut = 0

  const LastCaracter = CaractersOfString.length - 1

  const matchLetters = new RegExp("[a - zA - Z]")

  for (let i in CaractersOfString) {

    if (i % limitCaracters === 0 && i != 0 || i == LastCaracter) {
      let StringCut = "";

      if (i == LastCaracter) {
        StringCut = Phrase.substring(FirstCaracterInCut, i + 1)
      } else if (matchLetters.test(CaractersOfString[i-1]) && matchLetters.test(CaractersOfString[i])) {
        StringCut = Phrase.substring(FirstCaracterInCut, i) + "-"
      }else{
        StringCut = Phrase.substring(FirstCaracterInCut, i)
      }

      FirstCaracterInCut = i;
      ArrayPhrase = [...ArrayPhrase, StringCut]
    }
  }
  return ArrayPhrase

}
