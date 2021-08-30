export default function SplitText({children}) {
  return children.split(' ').map((word, i) => {
    return (
      <span
        className="word"
        data-word={word}
        aria-hidden="true"
        key={word + i}
      >
        {word.split('').map((char, j) => {
          return (
            <span key={word + char + i + j} className="char">
              {char}
            </span>
          )
        })}
        <span className="whitespace"> </span>
      </span>
    )
  })
}
