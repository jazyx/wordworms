import { useContext } from 'react'
import { GameContext } from "../contexts/Game"


function PlayerWords() {
  const {
    player,
    players,
    generateWords
  } = useContext(GameContext)

  const getWordList = () => {
    const words = (players[player] || {}).words || []

    const wordList = words.map( wordData => {
      const [ word, score, deltas] = wordData
      return (
        <li
          key={word}
        >
          <span className="score">{score}</span>
          <span className="word">{word}</span>
          <span className="deltas">{deltas.length}</span>
        </li>
      )
    })

    return (
      <ul
        className="words"
      >
        {wordList}
      </ul>
    )
  }


  const wordList = getWordList()
  const playerName = (players[player] || {}).name
  

  return (
    <div className="player">
      {wordList}

      <button
        className="generate"
        onClick={generateWords}
      >
        Generate words for {playerName}
      </button>
    </div>
  )
}

export default PlayerWords