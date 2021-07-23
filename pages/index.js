import Head from 'next/head'
import Link from 'next/link'
import {getAllPosts} from '@lib/mdx'
import styles from './Index.module.scss'
import {NavBar} from '@components/Layout'

export default function Home({posts}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Abdullah Ammar | Developer</title>
        <meta
          name="description"
          content="Hi! I'm Ammar, a computer science student and graphic design enthusiast who passionate to build something fun and useful. Currently remote working as Developer Intern at Telkom DDB, learning about technology, software engineering, and web development, and trying to contribute to open source."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <NavBar />
      </header>

      <main className={styles.main}>
        <div className={styles.hero}>
          <div className={styles.hero_grid_one}>
            <div></div>
            <div className={styles.hero_content}>
              <div className={styles.hero_desc}>
                <h2 className={styles.hero_desc_title}>
                  <span className={styles.hero_desc_title_name}>
                    Hi! I&apos;m Ammar,
                  </span>
                  <br />
                  a student and developer
                  <br /> who passionate to build <br />
                  something fun and useful.
                </h2>
              </div>
            </div>
            <div></div>
          </div>
          <div className={styles.hero_grid_two}>
            <div></div>
            <div className={styles.hero_cta}>
              <a href="#projects" className={styles.hero_cta_link}>
                <span>Learn more</span>
                <span>
                  <svg
                    width="30"
                    height="33"
                    viewBox="0 0 30 33"
                    fill="white"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <use href="#icon-arrow"></use>
                  </svg>
                </span>
              </a>
            </div>
            <div></div>
          </div>
        </div>
        <div className={styles.projects} id="projects"></div>
        <div className={styles.blog}>
          <h1>Test</h1>
          <ul>
            {posts.map(({slug, frontmatter: meta}) => {
              return (
                <li key={slug}>
                  <Link href={`/posts/${slug}`}>{meta.title}</Link>
                </li>
              )
            })}
          </ul>
        </div>
      </main>
      <footer></footer>
    </div>
  )
}

export async function getStaticProps() {
  const posts = getAllPosts()
  return {
    props: {posts},
  }
}
