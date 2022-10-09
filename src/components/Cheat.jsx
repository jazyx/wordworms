import { useState } from "react";
import { useContext } from 'react'
import { GameContext } from "../contexts/Game"
import {
  getPrediction,
  getDeltas
} from '../api/getWords'

function Cheat() {
  const { cueWord } = useContext(GameContext)
  const [ cue, setCue ] = useState(cueWord);
  const tempDeltas = getDeltas(cue)

  const [ searchWord, setSearchWord ] = useState("")
  const [ ready, setReady ] = useState(false)
  const [ deltas, setDeltas ] = useState(tempDeltas)
  
  

  const lookUpWords = (sourceWord) => {
    if (!sourceWord) {
      sourceWord = searchWord
  
      if (!ready) {
        return
      }
    }

    const deltas = getDeltas(sourceWord)
    setCue(sourceWord)
    setDeltas(deltas)
    if (deltas.length) {
      setSearchWord("")
      setReady(false)
    }
  };


  const checkInput = (event) => {
    const isEnter = event.code === "Enter"

    const acceptable = [
      0,
      "Delete",
      "Backspace",
      "ArrowLeft",
      "ArrowRight",
      "ArrowUp",
      "ArrowDown"
    ]
    const ignoreReady = 
       acceptable.indexOf(event.code) > 0
    || window.getSelection().toString().length

    if (ignoreReady) {
      return
    }

    if (ready || isEnter) {
      event.preventDefault();
    }

    if (ready && isEnter) {
      lookUpWords()
    }    
  };


  const lookAhead = (event) => {
    const searchWord = event.target.value;
    const ready = searchWord.length === 4

    setSearchWord(searchWord)
    setReady(ready)
  };


  const checkListedWord = event => {
    const word = event.target.innerHTML
    lookUpWords(word)
  }


  const getDeltaList = () => {
    let deltaItems = deltas.map( word => (
      <li
        key={word}
        onClick={checkListedWord}
      >
        {word}
      </li>
    ))

    if (!deltaItems.length) {
      deltaItems = <li>No words found</li>
    }

    return (
      <ul className="deltas">
        {deltaItems}
      </ul>
    )
  }


  const deltaList = getDeltaList()


  return (
    <>
      <label htmlFor="findDeltas">
        <input
          type="text"
          name="findDeltas"
          id="findDeltas"
          onKeyDown={checkInput}
          onChange={lookAhead}
          value={searchWord}
        />
        <button
          disabled={!ready}
        >
          Find words
        </button>
      </label>
      <h3>Words like <span className="cue">{cue}</span></h3>
      {deltaList}
    </>
  );
}

export default Cheat;
