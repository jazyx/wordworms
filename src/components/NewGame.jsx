import { useContext } from 'react'
import { GameContext } from "../contexts/Game"



function NewGame() {
  const {
    cueWords,
    newGame
  } = useContext(GameContext)


  const getCueWordsList = () => {
    const cueWordItems = cueWords.map( word => (
      <li
        key={word}
      >
        {word}
      </li>
    ))

    return <ul className="cue">{cueWordItems}</ul>
  }


  const cueWordList = getCueWordsList()


  
  return (
    <>
      <p>Starting words:</p>
      {cueWordList}
      <button
        className="generate"
        onClick={newGame}
      >
        Generate Words For New Game
      </button>
    </>
  )
}


export default NewGame