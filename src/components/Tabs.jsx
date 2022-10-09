import { useContext } from 'react'
import { GameContext } from "../contexts/Game"
import Play from './Play';
import Cheat from './Cheat';




function Tabs(){
  const {
    togglePlay,
    playState
  } = useContext(GameContext)


  const Component = playState === "play"
                  ? Play
                  : Cheat


  const getTabItems = () => {
    const tabItems = ["Play", "Cheat"].map( state => {
      const id = state.toLowerCase()
      const className = id === playState
                      ? "selected"
                      : ""
      return (
        <li
          key={id}
          id={id}
          className={className}
        >
          {state}
        </li>
      )
    })

    return (
      <ul
        className="tabs"
        onClick={togglePlay}
        onTouchEnd={togglePlay}
      >
        {tabItems}
      </ul>

    )
  }


  const tabList = getTabItems()

  return (
    <>
      {tabList}
      <Component />
    </>
  )
}



export default Tabs