import React, { useContext } from 'react'
import ModeToggle from '../ModeToggle'
import './AppBar.css'
import { GameContext } from '../../context/GameContext'
import { ICONS } from '../../constants'
import IconButton from '../../components/UI/IconButton'

type AppBarProps = {
  goBack: () => void;
  isPlaying: boolean;
}

const AppBar = ({ goBack, isPlaying }: AppBarProps) => {
  const { game } = useContext(GameContext)

  let backButton = null
  let title = 'Word Games'

  if (isPlaying) {
    backButton = <IconButton size='large' icon={ICONS.LEFT_ARROW} onClick={goBack} />

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
