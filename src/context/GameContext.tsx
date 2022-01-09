import React, { createContext, useState } from 'react'
import { LETTERS } from '../constants'

export const GameContext = createContext({
  game: '',
  setGame: (game: string) => {}
})

GameContext.displayName = 'GameContext'

type GameContextProps = {
  children: JSX.Element;
}

const GameContextProvider = ({ children }: GameContextProps) => {
  const [game, setGame] = useState(LETTERS)

  return (
    <GameContext.Provider value={{ game, setGame: game => setGame(game) }}>
      {children}
    </GameContext.Provider>
  )
}

export default GameContextProvider
