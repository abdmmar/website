import {NavBar, Footer} from '@components/layouts'

import styles from './Layout.module.scss'

const Layout = ({children}) => {
  return (
    <div className={styles.container} id="top">
      <header className={styles.header}>
        <NavBar />
      </header>

      {children}

      <Footer />
    </div>
  )
}

export default Layout
