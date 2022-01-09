import React from 'react'

export const EASY: string = 'easy'
export const MEDIUM: string = 'medium'
export const HARD: string = 'hard'
export const IMPOSSIBLE: string = 'impossible'

export const DIFFICULTY_MAP = {
  [EASY]: [10, 20],
  [MEDIUM]: [35, 40],
  [HARD]: [50, 55],
  [IMPOSSIBLE]: [60, 70],
}

export const ENGLISH: string = 'english'
export const CANADIAN: string = 'canadian'
export const BRITISH: string = 'british'
export const AUSTRALIAN: string = 'australian'
export const AMERICAN: string = 'american'

export const ACTIVE: string = 'active'
export const DISABLED: string = 'disabled'
export const VALID: string = 'valid'
export const INVALID: string = 'invalid'
export const MISPLACED: string = 'misplaced'

export const SUBMIT: string = 'submit'
export const INPUT: string = 'input'

export const LIGHT: string = 'light'
export const DARK: string = 'dark'

export const LETTERS: string = 'LETTERS'

export const ICONS = {
  LEFT_ARROW: <span>&#8592;</span>,
  DOWN_CHEVRON: <span>&#8744;</span>,
  LEFT_CHEVRON: <span>&#8826;</span>,
  RIGHT_CHEVRON: <span>&#8827;</span>,
}