import { createContext, useState } from 'react'
import { getWords, getCueWords } from '../api/getWords'


export const GameContext = createContext()


export const GameProvider = ({ children }) => {
  const [ playState, setPlayState ] = useState("play")

  const [ player, setPlayer ] = useState(0)
  const [ players, setPlayers ] = useState([
    { name: "Easy",
      level: 1,
      unique: false,
      words: getWords(1, true)
    },
    { name: "Hard",
      level: 5,
      unique: false,
      words: getWords(5, false)
    },
    { name: "Grim",
      level: 9,
      unique: true,
      words: getWords(9, true)
    }
  ])
  const playerNames = players.map(playerData => (
    playerData.name.toLowerCase()
  ))
  const tempLevel = (players[0] || {}).level || 1.0

  const [ level, setLevel ] = useState(tempLevel)
  const [ unique, setUnique ] = useState(false)

  
  const createCueWords = (isInit) => {
    const excluded = players
      .map(playerData => (
        playerData.words
      ))
      .flat()

    const count = 5
    const cueWords = getCueWords(excluded, count)

    if (isInit) {
      return cueWords
    }
    setCueWords(cueWords)
  }

  const [ cueWords, setCueWords ] = useState(createCueWords(true))


  const adjustLevel = (level) => {
    const playerData = players[player] || {}
    playerData.level = level
    setPlayers([...players])
    setLevel(level)
  }


  const playerNameIsTaken = (playerName) => {
    playerName = playerName.toLowerCase()
    const isTaken = playerNames.indexOf(playerName) > -1

    return isTaken
  }


  const addPlayer = (name) => {
    if (playerNameIsTaken(name)) {
      return
    }

    const words = getWords(level * 10, unique)
    const playerData = {
      name,
      level,
      unique,
      words
    }

    players.push(playerData)
    setPlayers([...players]) // array at new RAM address
    selectPlayer(players.length - 1)
  }


  const selectPlayer = (index) => {
    const level = players[index].level
    setLevel(level)
    setPlayer(index)
  }


  const deletePlayer = index => {
    players.splice(index, 1)
    setPlayers([...players])
  }

    
  const generateWords = () => {
    // TODO: Send lists of words of all players except
    // current player, so that they will be excluded
    // from allWords, and the same word will never be
    // given to two different players
    const words = getWords(level, unique)
    players[player].words = words
    setPlayers([...players])
  }


  const refreshPlayerWords = () => {
    players.forEach(playerData => {
      const { level, unique } = playerData
      playerData.words = getWords(level, unique)
    })

    setPlayers([...players])
  }


  const newGame = () => {
    createCueWords()
    refreshPlayerWords()
  }


  const togglePlay = event => {
    setPlayState(event.target.id)
  }
  

  return (
    <GameContext.Provider
      value ={{
        player,
        selectPlayer,
        deletePlayer,
        players,
        setPlayers,
        playerNameIsTaken,
        addPlayer,
        level,
        adjustLevel,
        unique,
        setUnique,
        generateWords,
        cueWords,
        newGame,
        playState,
        togglePlay
      }}
    >
      {children}
    </GameContext.Provider>
  )
}