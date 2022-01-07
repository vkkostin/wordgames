import React, { CSSProperties, useState } from 'react';
import AppBar from './components/AppBar';
import AppMain from './components/AppMain';
import GameContextProvider from './context/GameContext'

function App() {
  const [isPlaying, setIsPlaying] = useState(false)

  const toggleScreen = () => setIsPlaying(prevState => !prevState)

  return (
    <GameContextProvider>
      <>
        <AppBar goBack={toggleScreen} isPlaying={isPlaying} />
        <AppMain startGame={toggleScreen} isPlaying={isPlaying} />
      </>
    </GameContextProvider>
  );
}

export default App;
