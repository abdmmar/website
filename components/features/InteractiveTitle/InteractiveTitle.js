import * as React from 'react'

import {SplitText} from '@components/features'
import {getRandomNumber} from '@lib/number'
import {isLowercase, getRandomChar} from '@lib/string'
import {
  fontFamilyList,
  fontWeightList,
  fontStyleList,
  aList,
  iList,
  uList,
  eList,
  oList,
} from './constant'

import styles from './InteractiveTitle.module.scss'

export default function InteractiveTitle() {
  React.useEffect(() => {
    if (process.browser) {
      const chars = document.querySelectorAll('.char')
      for (const char of chars) {
        char.addEventListener('mouseover', (event) => {
          const c = event.target
          c.textContent =
            isLowercase(c.textContent) && getRandomNumber(25) % 3 === 0
              ? c.textContent.toUpperCase()
              : c.textContent.toLowerCase()
          c.textContent = getRandomChar(aList, c.textContent)
          c.textContent = getRandomChar(iList, c.textContent)
          c.textContent = getRandomChar(uList, c.textContent)
          c.textContent = getRandomChar(eList, c.textContent)
          c.textContent = getRandomChar(oList, c.textContent)

          c.style.fontWeight =
            fontWeightList[getRandomNumber(fontWeightList.length)]
          c.style.fontFamily =
            fontFamilyList[getRandomNumber(fontFamilyList.length)]
          c.style.fontStyle =
            fontStyleList[getRandomNumber(fontStyleList.length)]
        })
      }
    }
  }, [])

  return (
    <h2
      className={styles.title}
      aria-label="Hi! I'm Ammar, a student and developer who passionate to build something fun and useful."
      role="heading"
    >
      <span className={styles.title_name}>
        <SplitText>Hi! I&apos;m </SplitText>
        <span className={styles.me}>
          <SplitText>Ammar,</SplitText>
        </span>
      </span>
      <br className={styles.break} />
      <SplitText>a</SplitText>
      <SplitText>student</SplitText>
      and{' '}
      <span className={styles.mono}>
        <SplitText>developer</SplitText>
      </span>
      <br className={styles.break} />
      <SplitText>who</SplitText>{' '}
      <span className={styles.passion}>
        <SplitText>passionate to build</SplitText>
      </span>
      <br className={styles.break} />
      <SplitText>something</SplitText>{' '}
      <span className={styles.serif}>
        <SplitText>fun</SplitText>
      </span>{' '}
      and{' '}
      <span className={styles.serif}>
        <SplitText>useful.</SplitText>
      </span>
    </h2>
  )
}
