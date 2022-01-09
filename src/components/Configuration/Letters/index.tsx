import React, { FormEvent, useState } from 'react'
import getWord from '../../../words'
import { LetterOptions } from '../../../interfaces'
import Select from '../../UI/Select'
import Input from '../../UI/Input'
import StartButton from '../../UI/StartButton'

import {
  EASY,
  MEDIUM,
  HARD,
  IMPOSSIBLE,
  ENGLISH,
  AMERICAN,
  AUSTRALIAN,
  CANADIAN,
  BRITISH,
} from '../../../constants'

import './Letters.css'

type LettersProps = {
  showSettings: boolean;
  setupGame: ({ word, attempts }: LetterOptions) => void
}

const Letters = ({ setupGame, showSettings }: LettersProps) => {
  const [difficulty, setDifficulty] = useState(MEDIUM)
  const [dialect, setDialect] = useState(ENGLISH)
  const [length, setLength] = useState(5)
  const [attempts, setAttempts] = useState(6)

  const DIFFICULTY_OPTIONS = [
    { value: EASY, label: EASY },
    { value: MEDIUM, label: MEDIUM },
    { value: HARD, label: HARD },
    { value: IMPOSSIBLE, label: IMPOSSIBLE },
  ]

  const DIALECT_OPTIONS = [
    { value: AMERICAN, label: AMERICAN },
    { value: AUSTRALIAN, label: AUSTRALIAN },
    { value: BRITISH, label: BRITISH },
    { value: CANADIAN, label: CANADIAN },
    { value: ENGLISH, label: ENGLISH },
  ]

  const setWord = async () => {
    const word = await getWord({
      difficulty,
      dialect,
      length,
    })

    setupGame({ word, attempts })
  }

  const onAttemptsChange = (event: FormEvent<HTMLInputElement>) => setAttempts(Number((event.target as HTMLInputElement).value))
  const onDifficultyChange = (event: FormEvent<HTMLSelectElement>) => setDifficulty((event.target as HTMLSelectElement).value)
  const onDialectChange = (event: FormEvent<HTMLSelectElement>) => setDialect((event.target as HTMLSelectElement).value)
  const onWordLengthChange = (event: FormEvent<HTMLInputElement>) => setLength(Number((event.target as HTMLInputElement).value))

  let settingsPanel = null

  if (showSettings) {
    settingsPanel = (
      <div className="letters-configuration__panel">
        <Select
          label="Difficulty"
          options={DIFFICULTY_OPTIONS}
          value={difficulty}
          onChange={onDifficultyChange}
        />
        <Select
          label="Dialect"
          options={DIALECT_OPTIONS}
          value={dialect}
          onChange={onDialectChange}
        />
        <Input
          label="Word Length"
          value={length}
          type="number"
          placeholder="Word Length"
          onChange={onWordLengthChange}
        />
        <Input
          label="Attempts"
          value={attempts}
          type="number"
          placeholder="Word Length"
          onChange={onAttemptsChange}
        />
      </div>
    )
  }

  return (
    <div className="letters-configuration">
      {settingsPanel}
      <StartButton onClick={setWord} />
    </div>
  )
}

export default Letters
