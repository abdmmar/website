import * as React from 'react'
import Link from 'next/link'
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuPopover,
  MenuItems,
} from '@reach/menu-button'
import {positionRight} from '@reach/popover'
import '@reach/menu-button/styles.css'

import {
  redraw,
  disableTransition,
  enableTheme,
  disableTheme,
} from '@lib/theme'
import useWindowSize from '@hooks/useWindowSize'
import styles from './NavBar.module.scss'

export default function NavBar() {
  const {width: windowWidth} = useWindowSize()
  const [theme, setTheme] = React.useState(
    process.browser && localStorage.getItem('theme') != null
      ? localStorage.getItem('theme')
      : 'system',
  )

  React.useEffect(() => {
    if (process.browser) {
      const css = disableTransition()

      if (theme === 'dark') {
        enableTheme(theme)
        redraw(css)
        return
      }

      disableTheme()
      redraw(css)
    }
  }, [theme])

  const selectTheme = (preference) => {
    setTheme(preference)
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_menu}>
        <Link href="/">
          <a className={styles.logo_container}>
            <svg
              width="26"
              height="23"
              viewBox="0 0 26 23"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.logo}
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.0974 0.491882L0.291046 22.1045H0.298437C1.68551 19.1103 4.11736 16.6988 7.12606 15.3379L12.791 4.00795L18.456 15.3379C16.7284 14.5565 14.8105 14.1215 12.7911 14.1215C7.25472 14.1215 2.48202 17.391 0.298454 22.1045H3.81517C5.71506 19.159 9.02531 17.2088 12.7911 17.2088C16.5568 17.2088 19.867 19.159 21.7669 22.1045L25.2836 22.1045H25.291L14.4847 0.491882H11.0974Z"
              />
            </svg>
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
        {windowWidth <= 425 ? (
          <Menu>
            <MenuButton
              className={styles.menu_btn}
              aria-label="Open theme menu"
            >
              <svg
                width="20px"
                height="20px"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                focusable="false"
              >
                <use href="#icon-sun" className="icon_default"></use>
              </svg>
            </MenuButton>
            <MenuPopover
              className={styles.menu_popover}
              position={positionRight}
            >
              <MenuItems className={styles.menu_items}>
                <MenuItem onSelect={() => selectTheme('system')}>
                  System
                </MenuItem>
                <MenuItem onSelect={() => selectTheme('light')}>
                  Light
                </MenuItem>
                <MenuItem onSelect={() => selectTheme('dark')}>Dark</MenuItem>
              </MenuItems>
            </MenuPopover>
          </Menu>
        ) : (
          ''
        )}
      </div>
      <div className={styles.navbar_theme}>
        {windowWidth <= 425 ? (
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
        ) : (
          <Menu>
            <MenuButton
              className={styles.menu_btn}
              aria-label="Open theme menu"
            >
              <svg
                width="20px"
                height="20px"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                focusable="false"
              >
                <use href="#icon-theme" className="icon_default"></use>
              </svg>
            </MenuButton>
            <MenuPopover
              className={styles.menu_popover}
              position={positionRight}
            >
              <MenuItems className={styles.menu_items}>
                <MenuItem onSelect={() => selectTheme('system')}>
                  System
                </MenuItem>
                <MenuItem onSelect={() => selectTheme('light')}>
                  Light
                </MenuItem>
                <MenuItem onSelect={() => selectTheme('dark')}>Dark</MenuItem>
              </MenuItems>
            </MenuPopover>
          </Menu>
        )}
      </div>
    </nav>
  )
}
