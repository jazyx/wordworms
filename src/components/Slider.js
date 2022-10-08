import {
  useContext,
  useRef,
  useState,
  useEffect
} from 'react'
import { GameContext } from "../contexts/Game"


function Slider() {
  const {
    level,
    adjustLevel
  } = useContext(GameContext)

  const rangeRef = useRef()
  const sliderRef = useRef()
  const [ left, setLeft ] = useState(0)
  const [ width, setWidth ] = useState(0)
  const [ start, setStart ] = useState(0)
  // const [ startX, setStartX ] = useState(0)
  

  
  const getPageX = (event) => {
    if (event.targetTouches && event.targetTouches.length) {
      event = event.targetTouches[0] || {}
    }

    return event.pageX
  }


  const jumpToLevel = event => {
    const pageX = getPageX(event)

    const fractions = 1 // 10, if you want 1.0 - 9.0
    const s = [9, .5, 1].map(number => number * fractions)
    
    // Ensure that the slider is centred on the click
    let level = ((pageX - left) / width * s[0]) + s[1]

    // Keep within range
    level = Math.round(
      Math.max(
        s[2], Math.min(
          level, s[0]
        )
      ) 
    ) / s[2] // 1.0 - 9.0
    adjustLevel(level)
  }


  const startDrag = event => {
    // const pageX = getPageX(event)
    // TODO
  }


  const determineBoundaries = () => {
    const rangeElement = rangeRef.current
    const rangeRect = rangeElement.getBoundingClientRect()
    const { left, width } = rangeRect
    setLeft(left)
    setWidth(width)
  }


  const setSliderRect = () => {
    const start = (((level - 1) * 100) / 9) +"%"
    setStart(start);
  }


  const initializeSlider = () => {
    determineBoundaries()
    setSliderRect()
  }


  const stepLevel = (event) => {
    const level = event.target.value
    adjustLevel(level)
  }


  useEffect(initializeSlider)


  return (
    <div className="level">
      <span>Level:</span>
      
      <div
        ref={rangeRef}
        className="range"
        onTouchStart={jumpToLevel}
        onMouseDown={jumpToLevel}
      >
        <div
          ref={sliderRef}
          className="slider"
          style={{left: start}}
          onTouchStart={startDrag}
          onMouseDown={startDrag}
        ></div>
      </div>

      <input
        type="number"
        id="number"
        max="9.0"
        min="1.0"
        step="0.1"
        value={level}  
        onChange={stepLevel}
      />
    </div>
  )
}

export default Slider