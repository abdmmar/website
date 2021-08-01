import * as React from 'react'
import Link from 'next/link'
import {
  Menu,
  // MenuList,
  MenuButton,
  MenuItem,
  MenuPopover,
  MenuItems,
} from '@reach/menu-button'
import {positionRight} from '@reach/popover'
import '@reach/menu-button/styles.css'

import styles from './NavBar.module.scss'

export default function NavBar() {
  // const [theme, setTheme] = React.useState('auto')
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
            <Link href="/blog">
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
      <div className={styles.navbar_theme}>
        <Menu>
          <MenuButton className={styles.menu_btn} ariaLabel="Open theme menu">
            <svg
              width="20px"
              height="20px"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              color="#000000"
              focusable="false"
            >
              <use href="#icon-sun"></use>
            </svg>
          </MenuButton>
          <MenuPopover
            className={styles.menu_popover}
            position={positionRight}
          >
            <MenuItems className={styles.menu_items}>
              <MenuItem onSelect={() => console.log('System')}>
                System
              </MenuItem>
              <MenuItem onSelect={() => console.log('Light')}>Light</MenuItem>
              <MenuItem onSelect={() => console.log('Dark')}>Dark</MenuItem>
            </MenuItems>
          </MenuPopover>
        </Menu>
      </div>
    </nav>
  )
}
