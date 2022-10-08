import { useContext } from 'react'
import { GameContext } from "../contexts/Game"



function NewGame() {
  const {
    cueWord,
    newGame
  } = useContext(GameContext)
  
  return (
    <>
      <p>
        <span>Starting word: </span>
        <span className="cue">
          {cueWord}
        </span>
      </p>
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