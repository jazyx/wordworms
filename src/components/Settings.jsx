import { useContext } from 'react'
import { GameContext } from "../contexts/Game"

import Slider from './Slider'


function Settings() {  
  const {
    unique,
    setUnique
  } = useContext(GameContext)


  const toggleUnique = (event) => {
    const unique = event.target.checked
    setUnique(unique)
  }


  const ignore = (event) => {
    event.preventDefault()
  }


  return (
    <label htmlFor="settings" className="settings">
      <input type="checkbox" name="settings" id="settings" />
      <span className="collapse"></span>
      <span className="show">  Show Level Settings</span>
      <fieldset
        onClick={ignore}
      >
        <Slider />

        {/* <label htmlFor="noSharedLetters">
          <span>No Shared Letters:</span>
          <input
            type="checkbox"
            name="noSharedLetters"
            id="noSharedLetters"
            checked={unique}
            onChange={toggleUnique}
          />
        </label> */}
      </fieldset>
    </label>
  )
}


export default Settings