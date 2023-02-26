import Link from 'next/link'

import styles from './Footer.module.scss'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.social}>
          <Link href="/" className={styles.logo_container}>
            <p className="sr-only">Back to homepage</p>
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
          </Link>
          <ul className={styles.social_link}>
            <li>
              <a href="https://www.github.com/abdmmar" rel="noreferrer" target="_blank">
                Github
              </a>
            </li>
            <li>
              <a href="https://www.figma.com/@abdmmar" rel="noreferrer" target="_blank">
                Figma
              </a>
            </li>
            <li>
              <a href="https://www.twitter.com/abdmmar" rel="noreferrer" target="_blank">
                Twitter
              </a>
            </li>
            <li>
              <Link href="/rss/feed.xml">RSS</Link>
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
