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
        )}
      </div>
    </nav>
  )
}

const enableTheme = (theme) => {
  document.documentElement.setAttribute('data-theme', theme)
  localStorage.setItem('theme', theme)
}

const disableTheme = () => {
  document.documentElement.removeAttribute('data-theme')
  localStorage.removeItem('theme')
}

/* 
  Disable theme transitions
  See: https://paco.sh/blog/disable-theme-transitions
*/
const disableTransition = () => {
  const css = document.createElement('style')
  css.appendChild(
    document.createTextNode(
      `* {
        -webkit-transition: none !important;
        -moz-transition: none !important;
        -o-transition: none !important;
        -ms-transition: none !important;
        transition: none !important;
      }`,
    ),
  )
  document.head.appendChild(css)
  return css
}

// Calling getComputedStyle forces the browser to redraw
const redraw = (cssElem) => {
  window.getComputedStyle(cssElem).opacity
  document.head.removeChild(cssElem)
}
