import React, { FormEvent, useContext } from 'react'
import Letters from './Letters'
import { LETTERS } from '../../constants'
import { GameContext } from '../../context/GameContext'
import { GameOptions } from '../../interfaces'

type ConfigurationProps = {
  setupGame: (gameOptions: GameOptions) => void;
}

const COMP_MAP = {
  [LETTERS]: Letters
}

const Configuration = ({ setupGame }: ConfigurationProps) => {
  const { setGame, game } = useContext(GameContext)

  const selectGame = (event: FormEvent<HTMLSelectElement>) => {
    setGame((event.target as HTMLSelectElement).value)
  }

  let gameConfig = null

  if (game) {
    const GameConfig = COMP_MAP[game as keyof typeof COMP_MAP]

    gameConfig = <GameConfig setupGame={setupGame} />
  }

  return (
    <>
      <select value={game} onChange={selectGame} >
        <option value="">--- Please Select a Game ---</option>
        <option value={LETTERS}>Letters</option>
      </select>
      {gameConfig}
    </>
  )

}

export default Configuration
