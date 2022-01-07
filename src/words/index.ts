import { ENGLISH, DIFFICULTY_MAP, MEDIUM } from "../constants"

const getWord = async ({
  difficulty = MEDIUM,
  dialect = ENGLISH,
  length = 6,
} = {}) => {
  let words = await Promise.all(DIFFICULTY_MAP[difficulty].map(code => import(`./${dialect}-words-${code}.json`)))

  words = words.flatMap(module => module.default)
  
  if (length) {
    words = words.filter(word => word.length === length)
  }

  const randomIndex = Math.floor(Math.random() * words.length)

  return words[randomIndex].toLowerCase()
}

export default getWord
