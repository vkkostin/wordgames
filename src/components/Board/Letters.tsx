import React, { useEffect, useState, useReducer, FormEvent } from 'react'
import { ACTIVE, DISABLED, VALID, INVALID, MISPLACED, SUBMIT, INPUT } from '../../constants'

import './Board.css'

type Column = {
  guess: string;
  value: string;
  status: string;
}

type BoardAction = {
  type: string;
  currentAttempt?: number;
  guess?: string;
  row?: number;
  column?: number;
}

type BoardProps = {
  word: string;
  attempts: number;
}

const reducer = (board: Column[][], action: BoardAction) => {
  switch(action.type) {
    case SUBMIT: {
      const { currentAttempt } = action

      if (currentAttempt === undefined) {
        return board
      }

      const currentRow = board[currentAttempt]

      const activeColumns = currentRow.filter((column: Column ) => column.guess !== column.value)
      const hasWon = activeColumns.length === 0

      const newRow = currentRow.map((column: Column ) => {
        if (column.guess === column.value) {
          return {
            ...column,
            status: VALID,
          }
        } else if (activeColumns.find(({ value }: Column) => column.guess === value)) {
          return {
            ...column,
            status: MISPLACED,
          }
        } else {
          return {
            ...column,
            status: INVALID,
          }
        }
      })

      const newState = [...board]

      newState[currentAttempt] = newRow

      if (!hasWon && currentAttempt < board.length - 1) {
        const nextRow = newRow.map((column: Column ) => ({
          ...column,
          status: ACTIVE,
          guess: column.status === VALID ? column.guess : '',
        }))
  
        newState[currentAttempt + 1] = nextRow
      }

      return newState
    }

    case INPUT: {
      const { guess, row, column } = action

      if (
        guess === undefined ||
        row === undefined ||
        column === undefined
      ) {
        return board
      }

      const newRow = [...(board[row])]

      newRow[column] = {
        ...board[row][column],
        status: ACTIVE,
        guess,
      }

      const newState = [...board]

      newState[row] = newRow

      return newState
    }

    default:
      return board
  }
}

const Board = ({ word, attempts }: BoardProps) => {
  const rows = [...Array(attempts).keys()]
  const columns = word.split('')

  const initialBoard: Column[][] = rows.map((_, rowIndex): Column[] => 
    columns.map((value: string): Column => ({
      guess: '',
      value,
      status: rowIndex === 0 ? ACTIVE : DISABLED,
    }))
  )

  const [currentAttempt, setCurrentAttempt] = useState(0)
  const [hasWon, setHasWon] = useState(false)
  const [hasLost, setHasLost] = useState(false)

  const [board, dispatch] = useReducer(reducer, initialBoard)

  useEffect(() => {
    const firstRow = document.querySelectorAll('.board__row')[0];
    const firstInput = firstRow.childNodes[0];
    (firstInput as HTMLElement).focus();
  }, [])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      switch(e.code) {
        case 'Enter':
          dispatch({
            type: SUBMIT,
            currentAttempt,
          })
      
          if (board[currentAttempt].every(({ guess, value }) => guess === value)) {
            setHasWon(true)
          } else {
            if (currentAttempt < board.length - 1) {
              setCurrentAttempt(prevState => prevState + 1);
              const nextRow = document.querySelectorAll('.board__row')[currentAttempt + 1];
              const [firstInput] = nextRow.childNodes;
        
              (firstInput as HTMLElement).focus();
              (firstInput as HTMLInputElement).select()
            } else {
              setHasLost(true)
            }
          }

          break
        
        case 'Backspace':
          if (!(document.activeElement as HTMLInputElement).value && document.activeElement?.previousSibling) {
            (document.activeElement?.previousSibling as HTMLElement).focus()
          }

          break

        case 'ArrowRight': {
          if (document.activeElement?.nextSibling) {
            (document.activeElement.nextSibling as HTMLElement).focus()
          }

          break
        }

        case 'ArrowLeft': {
          if (document.activeElement?.previousSibling) {
            (document.activeElement.previousSibling as HTMLElement).focus()
          }

          break
        }

        default: // noop
      }
    }

    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [currentAttempt, board])

  const inputHandler = (row: number, column: number) => (event: FormEvent<HTMLInputElement>) => {
    dispatch({
      type: INPUT,
      guess: (event.target as HTMLInputElement).value,
      row,
      column,
    })
    
    if ((event.target as HTMLInputElement).value) {
      if (column < word.length - 1) {
        const nextInput = document.querySelectorAll('.board__row')[row].childNodes[column + 1];

        (nextInput as HTMLElement).focus();
        (nextInput as HTMLInputElement).select();
      }
    }
  }

  return (
    <div className="board">
      {hasWon ? <div>You Won!</div> : null}
      {hasLost ? <div>You Lost! The word was : {word}</div> : null}
      {board.map((row, rowIndex: number) => {
        return (
          <div className="board__row" key={rowIndex}>
            {row.map((column, columnIndex: number) => {
              return (
                <input
                  key={columnIndex}
                  value={column.guess}
                  className={`board__column board__column--${column.status}`}
                  maxLength={1}
                  type="text"
                  disabled={rowIndex !== currentAttempt || hasWon || hasLost}
                  onInput={inputHandler(rowIndex, columnIndex)}
                />
              )
            })}
        </div>
        )
      })}
    </div>
  )

}

export default Board
