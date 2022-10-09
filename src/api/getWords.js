import allWords from '../data/words'
import {
  shuffle,
  removeFrom
} from './utilities'


const chunkFor1SharedLetter = 40
const chunkForUniqueOnly = 80
const chunkLengths = [
  chunkFor1SharedLetter,
  chunkForUniqueOnly
]


const alphabetical = Array.from(
  allWords.reduce(listDeltas, new Set())
).sort()
function listDeltas(set, wordData) {
  wordData[2].forEach( delta => set.add(delta))
  return set
}



function checkForMatchingLetter(wordArray, word, positions, uniqueOnly) {
  let matches = 0
  let position = -1

  wordArray = wordArray[0].split("")

  wordArray.forEach((char, index) => {
    const match = (char === word[index])

    if (match) {
      if (positions.includes(index)) {
        // The letter at this position already switches
        matches = 99

      } else {
        matches += 1
        position = index
      }
    }
  })

  if (matches < (2 - uniqueOnly)) {
    positions.push(position) // may include multiple -1s
    return true
  }

  return false
}


function getSet(startIndex, uniqueOnly){
  uniqueOnly = !!uniqueOnly + 0 // convert to 0 or 1

  const chunkLength = chunkLengths[uniqueOnly]
  const lastStart = allWords.length - chunkLength + 1
  startIndex = Math.min(startIndex, lastStart)
//  let counter = 0


  while(true) {
  //  counter++
    // May require up to 50 or so attempts if uniqueOnly
    const words = allWords.slice(startIndex, startIndex+chunkLength)

    shuffle(words)

    const list = [words.shift()]

    let wordData
    while (list.length < 4 && (wordData = words.shift())) {
      if (!wordData) {
        // Add more words from allWords
        break
      }

      const word = wordData[0]
      const positions = []

      const canUse = list.every(chosen => {
        const acceptable = checkForMatchingLetter(chosen, word, positions, uniqueOnly)
        if (!acceptable) {
          // Multiple matches, or match in already used position
          // Stop checking with the remaining words.
          return false
        }

        // Check for matching letters in the remaining words
        return true
      })

      if (canUse) {
        list.push(wordData)
      }
    }

    if (list.length === 4) {
    //  console.log("counter:", counter);
      return list
    }
  }
}


const byScore = (a, b) => {
  let order = b[1] - a[1]
  if (!order) {
    order = b[2].length - a[2].length
  }
  return order
}

const getWords = (level, uniqueOnly=0) => {
  uniqueOnly = !!uniqueOnly + 0
  const chunkLength = chunkLengths[uniqueOnly]
  const lastStartIndex = allWords.length - chunkLength
  const startIndex = Math.round((lastStartIndex / 8) * (level - 1))
  const set = getSet(startIndex, uniqueOnly).sort(byScore)

  return set
}


const getCueWords = (excluded=[], count=1) => {
  const cueWords = []

  const usedWords = excluded.map(wordData => wordData[0])
  const unusedWords = [...allWords]
  const remover = wordData => {
    return usedWords.indexOf(wordData[0]) > -1
  }
  removeFrom(unusedWords, remover, true)

  let max = unusedWords.length / 4
  while (count--) {
    const randomIndex = Math.floor(Math.random() * max--)
    const wordData = unusedWords.splice(randomIndex, 1)[0]
    // [<word>, <score>, <deltas>]
    cueWords.push(wordData[0])
  }

  return cueWords
}


const getDeltas = word => {
  word = word.toLowerCase()
  const deltas = allWords
    .filter( wordData => wordData[2].indexOf(word) > -1)
    .map( wordData => wordData[0])
  let known = allWords.find( wordData => wordData[0] === word)
  known = (known || [0,0,[]])[2]

  return Array.from(new Set([...deltas, ...known]))
}


const getPrediction = string => {

}


export {
  getWords,
  getCueWords,
  getDeltas,
  getPrediction
}