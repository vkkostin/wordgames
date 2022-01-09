import React, { useState, useContext } from 'react'
import Configuration from '../Configuration'
import Letters from '../Board/Letters'
import { LETTERS } from '../../constants'
import { GameContext } from '../../context/GameContext'
import { GameOptions } from '../../interfaces'

import './AppMain.css'

type GameProps = {
  startGame: () => void;
  isPlaying: boolean;
}

const COMP_MAP = {
  [LETTERS]: Letters
}

const Game = ({ startGame, isPlaying }: GameProps) => {
  const { game } = useContext(GameContext)
  const [gameOptions, setGameOptions] = useState({})

  const setupGame = (gameOptions: GameOptions) => {
    setGameOptions(gameOptions)
    startGame()
  }

  let screen = <Configuration setupGame={setupGame} />

  if (isPlaying) {
    const Board = COMP_MAP[game as keyof typeof COMP_MAP]

    screen = <Board {...gameOptions as GameOptions} />
  }

  return (
    <main className="app-main">
      {screen}
    </main>
  )
}

export default Game
