import { useContext } from 'react'
import { GameContext } from "../contexts/Game"
import Play from './Play';
import Help from './Help';
import QRCode from './QRCode';




function Tabs(){
  const {
    togglePlay,
    playState
  } = useContext(GameContext)


  let Component
  switch (playState) {
    case "help":
      Component = Help
      break;
    case "qrcode":
      Component = QRCode
      break;
    default:
      Component = Play
      break;
  }


  const getTabItems = () => {
    const tabItems = ["Play", "Help", "QR Code"].map( state => {
      const id = state.toLowerCase()
                      .split("")
                      .filter(char => char !== " ")
                      .join("")

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