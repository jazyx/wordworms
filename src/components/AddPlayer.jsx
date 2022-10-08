import { useContext, useState } from 'react'
import { GameContext } from "../contexts/Game"



function AddPlayer(){
  const [ name, setName ] = useState("")
  
  const {
    addPlayer, playerNameIsTaken
  } = useContext(GameContext)


  const disabled = !name || playerNameIsTaken(name)


  const checkForEnter = (event) => {
    if (event.code === "Enter") {
      event.preventDefault()
      addNewPlayer()
    }
  }


  const updatePlayerName = (event) => {
    const name = event.target.value
    setName(name)
  }


  const addNewPlayer = () => {
    if (disabled) {
      return
    }

    addPlayer(name)
    setName("")
  }


  return (
    <label
      htmlFor="toggleAdd"
    >
      <input type="checkbox" id="toggleAdd" />
      <span className="unselectable toggle"></span>

      <div className="addWidget">
        <input
          type="text"
          name="addPlayer"
          id="addPlayer"
          placeholder="Player Name"
          value={name}
          onKeyDown={checkForEnter}
          onChange={updatePlayerName}
        /><button
          disabled={disabled}
          onClick={addNewPlayer}
        >
          Add
        </button>
      </div>
    </label>
  )
}


export default AddPlayer