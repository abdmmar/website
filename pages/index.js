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
