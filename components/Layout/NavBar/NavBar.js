import * as React from 'react'
import Link from 'next/link'

import styles from './NavBar.module.scss'

export default function NavBar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_menu}>
        <Link href="/">
          <a className={styles.logo}>
            <div className={styles.square}></div>
          </a>
        </Link>
        <ul className={styles.menu}>
          <li className={styles.menu_item}>
            <Link href="/projects">
              <a>Projects</a>
            </Link>
          </li>
          <li className={styles.menu_item}>
            <Link href="blog">
              <a>Blog</a>
            </Link>
          </li>
          <li className={styles.menu_item}>
            <Link href="/resources">
              <a>Resources</a>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

// eslint-disable-next-line no-unused-vars
const MenuItem = ({title, children}) => {
  const [toggle, setToggle] = React.useState(false)

  const toggleMenu = () => {
    setToggle(!toggle)
  }

  if (process.browser) {
    document.addEventListener('click', (e) => {
      if (!document.getElementById(`menu-${title}`).contains(e.target)) {
        if (toggle === true) {
          setToggle(!toggle)
        }
      }
    })
  }

  const closeOnEscKey = (e) => {
    if (e.keyCode === 27) {
      if (toggle === true) {
        setToggle(!toggle)
      }
    }
  }

  return (
    <li
      id={`menu-${title}`}
      className={styles.menu_item}
      onKeyUp={closeOnEscKey}
    >
      <button
        className={styles.menu_item_btn}
        onClick={toggleMenu}
        aria-expanded={toggle}
        aria-controls={`menu-item-${title}-dropdown`}
        id={`menu-item-${title}-btn`}
      >
        <span className={styles.menu_item_text}>{title}</span>
        <svg
          width="18px"
          height="18px"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className={styles.icon_chevron_down}
        >
          <use href="icon-chevron-down" />
        </svg>
      </button>
      <ul
        id={`menu-item-${title}-dropdown`}
        className={styles.dropdown_menu}
        aria-hidden={!toggle}
      >
        {children}
      </ul>
    </li>
  )
}
