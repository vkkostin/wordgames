import React, { FormEvent, useState } from 'react'
import getWord from '../../words'
import { LetterOptions } from '../../interfaces'

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
} from '../../constants'

type LettersProps = {
  setupGame: ({ word, attempts }: LetterOptions) => void
}

const Letters = ({ setupGame }: LettersProps) => {
  const [difficulty, setDifficulty] = useState(MEDIUM)
  const [dialect, setDialect] = useState(ENGLISH)
  const [length, setLength] = useState(5)
  const [attempts, setAttempts] = useState(6)

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

  return (
    <>
      <label>Please Select a Difficulty Level</label>
      <select value={difficulty} onChange={onDifficultyChange} >
        <option value={EASY}>Easy</option>
        <option value={MEDIUM}>Medium</option>
        <option value={HARD}>Hard</option>
        <option value={IMPOSSIBLE}>Very Hard</option>
      </select>
      <br />
      <label>Please Select a Dialect</label>
      <select value={dialect} onChange={onDialectChange}>
        <option value={AMERICAN}>American</option>
        <option value={AUSTRALIAN}>Australian</option>
        <option value={BRITISH}>British</option>
        <option value={CANADIAN}>Canadan</option>
        <option value={ENGLISH}>English</option>
      </select>
      <br />
      <input type="number" value={length} placeholder="Word Length (optional)..." onChange={onWordLengthChange} />
      <input type="number" value={attempts} placeholder="Attempts (optional)..." onChange={onAttemptsChange} />
      <button onClick={setWord}>Start Game</button>
    </>
  )
}

export default Letters
