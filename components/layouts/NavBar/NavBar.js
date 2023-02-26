import * as React from 'react'
import Link from 'next/link'

import {SelectTheme} from '@components/features'
import styles from './NavBar.module.scss'

export default function NavBar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_container}>
        <div>
          ✤ Hi! I&apos;m <span>Ammar</span>
        </div>
        <div className={styles.navbar_menu}>
          <ul className={styles.menu}>
            <li className={styles.menu_item}>
              <Link href="/">
                <a>Home</a>
              </Link>
            </li>
            <li className={styles.menu_item}>
              <Link href="/projects">
                <a>Projects</a>
              </Link>
            </li>
            <li className={styles.menu_item}>
              <Link href="/blog">
                <a>Blog</a>
              </Link>
            </li>
          </ul>
          <div className={styles.navbar_theme}>
            <SelectTheme />
          </div>
        </div>
      </div>
    </nav>
  )
}
