import Link from 'next/link'

import styles from './Footer.module.scss'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.social}>
          <Link href="/">
            <a className={styles.logo}>
              <div className={styles.square}></div>
            </a>
          </Link>
          <ul className={styles.social_link}>
            <li>
              <a
                href="https://www.github.com/abdmmar"
                rel="noreferrer"
                target="_blank"
              >
                Github
              </a>
            </li>
            <li>
              <a
                href="https://www.figma.com/@abdmmar"
                rel="noreferrer"
                target="_blank"
              >
                Figma
              </a>
            </li>
            <li>
              <a
                href="https://www.twitter.com/abdmmar"
                rel="noreferrer"
                target="_blank"
              >
                Twitter
              </a>
            </li>
            <li>
              <Link href="/rss">
                <a>RSS</a>
              </Link>
            </li>
          </ul>
        </div>
        <a href="#top" className={styles.back_to_top}>
          Back to top
          <svg
            width="16"
            height="16"
            viewBox="1 0 30 33"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <use href="#icon-arrow"></use>
          </svg>
        </a>
      </div>
    </footer>
  )
}
