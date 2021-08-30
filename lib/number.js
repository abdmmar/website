export const getRandomNumber = (max) => {
  return Math.floor(Math.random() * max)
}

export function* generate(start = 0, end = 100, step = 1) {
  while (start <= end) {
    yield start
    start += step
  }
}

// Array.from(generate(10,20,2));
