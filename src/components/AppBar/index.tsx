import React, { useContext } from 'react'
import ModeToggle from '../ModeToggle'
import './AppBar.css'
import { GameContext } from '../../context/GameContext'

type AppBarProps = {
  goBack: () => void;
  isPlaying: boolean;
}

const AppBar = ({ goBack, isPlaying }: AppBarProps) => {
  const { game } = useContext(GameContext)

  let backButton = null
  let title = 'Word Games'

  if (isPlaying) {
    backButton = (
      <button className="app-bar__back" onClick={goBack}>
        &#8592;
      </button>
    )

    title = game
  }

  return (
    <header className="app-bar">
      {backButton}
      {title}
      <ModeToggle />
    </header>
  )
}

export default AppBar
