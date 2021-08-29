import * as React from 'react'
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  MenuPopover,
} from '@reach/menu-button'
import {positionRight} from '@reach/popover'
import '@reach/menu-button/styles.css'

import {
  redraw,
  disableTransition,
  enableTheme,
  disableTheme,
} from '@lib/theme'
import styles from './SelectTheme.module.scss'

export default function SelectTheme() {
  const [theme, setTheme] = React.useState(
    process.browser && localStorage.getItem('theme') != null
      ? localStorage.getItem('theme')
      : 'system',
  )

  React.useEffect(() => {
    if (process.browser) {
      const css = disableTransition()

      if (theme === 'system') {
        disableTheme()
        redraw(css)
        return
      }

      enableTheme(theme)
      redraw(css)
    }
  }, [theme])

  const selectTheme = (preference) => {
    setTheme(preference)
  }

  return (
    <Menu>
      <MenuButton className={styles.menu_btn} aria-label="Open theme menu">
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
      <MenuPopover className={styles.menu_popover} position={positionRight}>
        <MenuItems className={styles.menu_items}>
          <MenuItem onSelect={() => selectTheme('system')}>System</MenuItem>
          <MenuItem onSelect={() => selectTheme('light')}>Light</MenuItem>
          <MenuItem onSelect={() => selectTheme('dark')}>Dark</MenuItem>
        </MenuItems>
      </MenuPopover>
    </Menu>
  )
}
