import * as React from 'react'

import {SplitText} from './SplitText'
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
  return (
    <h4 className={styles.title}>
      Hi, I&apos;m <span className={styles.me}>Ammar</span>, <br />a student who likes to build
      things about the web and graphic design. Interested in user interface, accesibility, and web
      performance. Currently learning crafting interpreter and trying to contribute to open source
    </h4>
  )
}

const SplitWord = () => {
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

          c.style.fontWeight = fontWeightList[getRandomNumber(fontWeightList.length)]
          c.style.fontFamily = fontFamilyList[getRandomNumber(fontFamilyList.length)]
          c.style.fontStyle = fontStyleList[getRandomNumber(fontStyleList.length)]
        })
      }
    }
  }, [])

  return (
    <>
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
    </>
  )
}
