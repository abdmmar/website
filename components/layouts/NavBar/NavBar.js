import * as React from 'react'
import Link from 'next/link'

import {SelectTheme} from '@components/features'
import styles from './NavBar.module.scss'

export default function NavBar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_container}>
        <p className={styles.navbar_title}>
          ✤ Hi! I&apos;m <em>Ammar</em>,
        </p>
        <div className={styles.navbar_menu__container}>
          <ul className={styles.navbar_menu}>
            <li className={styles.navbar_menu__item}>
              <Link href="/">❉ Home</Link>
            </li>
            <li className={styles.navbar_menu__item}>
              <Link href="/projects">✦ Projects</Link>
            </li>
            <li className={styles.navbar_menu__item}>
              <Link href="/blog">✿ Blog</Link>
            </li>
          </ul>
          <SelectTheme />
        </div>
      </div>
    </nav>
  )
}
