import {generate, getRandomNumber} from './number'

// Generate ASCII number for lowercase
export const lowercaseAlphabet = Array.from(generate(97, 122))

export const isLowercase = (char) => {
  const c = char.charCodeAt()
  if (lowercaseAlphabet.includes(c)) {
    return true
  }
  return false
}

export const getRandomChar = (list, char) => {
  if (list.includes(char)) {
    return list[getRandomNumber(list.length)]
  }
  return char
}
