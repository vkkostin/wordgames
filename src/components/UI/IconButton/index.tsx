import React, { ReactElement } from 'react'

import './IconButton.css'

type IconButtonProps = {
  icon: ReactElement;
  onClick: () => void;
  size: string;
  className?: string;
}

const IconButton = ({ icon, onClick, size, className }: IconButtonProps) =>
  <button className={`icon-button icon-button--${size} ${className}`} onClick={onClick}>{icon}</button>

export default IconButton
