import React from 'react'

import './StartButton.css'

type StartButtonProps = {
  onClick: () => void
}

const StartButton = ({ onClick }: StartButtonProps) =>
  <button className="start-button" onClick={onClick}>Start Game</button>

export default StartButton
