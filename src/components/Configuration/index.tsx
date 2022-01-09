import React, { FormEvent, useContext, useState } from 'react'
import Letters from './Letters'
import { LETTERS } from '../../constants'
import { GameContext } from '../../context/GameContext'
import { GameOptions } from '../../interfaces'
import Select from '../UI/Select'

import './Configuration.css'

type ConfigurationProps = {
  setupGame: (gameOptions: GameOptions) => void;
}

const COMP_MAP = {
  [LETTERS]: Letters
}

const GAME_OPTIONS = [
  { value: LETTERS, label: LETTERS },
]

const Configuration = ({ setupGame }: ConfigurationProps) => {
  const { setGame, game } = useContext(GameContext)
  const [showSettings, setShowSettings] = useState(false)

  const selectGame = (event: FormEvent<HTMLSelectElement>) => {
    setGame((event.target as HTMLSelectElement).value)
  }

  const toggleSettings = () => setShowSettings(prevState => !prevState)

  let gameConfig = null

  if (game) {
    const GameConfig = COMP_MAP[game as keyof typeof COMP_MAP]

    gameConfig = <GameConfig setupGame={setupGame} showSettings={showSettings} />
  }

  return (
    <div className="configuration">
      <div className="configuration__game-select">
        <Select
          label="Game"
          options={GAME_OPTIONS}
          value={game}
          onChange={selectGame}
        />
      </div>
      <button className="configuration-__settings-toggle" onClick={toggleSettings}>
        --- {showSettings ? 'Close' : 'Change'} Game Settings ---
      </button>
      <div className="configuration__game-configuration">
        {gameConfig}
      </div>
    </div>
  )

}

export default Configuration
