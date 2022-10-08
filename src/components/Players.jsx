import { useContext } from 'react'
import { GameContext } from "../contexts/Game"
import AddPlayer from './AddPlayer';



function Players(){
  const {
    player,
    players,
    selectPlayer,
    deletePlayer
  } = useContext(GameContext)

  const getPlayerList = () => {
    const playerItems = players.map(( playerData, index ) => {
      const { name, level } = playerData
      const className = (index === player)
                      ? "selected"
                      : ""

      return (
        <li
          key={name}
          onClick={() => selectPlayer(index)}
          className={className}
        >
          <span className="name">{name}</span>
          <span className="level">{level}</span>
          <button
            className="delete"
            onClick={() => deletePlayer(index)}
          >
            ✕
          </button>
        </li>
      )
    })

    return <ul>{playerItems}</ul>
  }

  const playerList = getPlayerList()
  
  return (
    <div className="players">
      <AddPlayer />
      {playerList}
    </div>
  )
}


export default Players