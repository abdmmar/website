import * as React from 'react'

import Head from '@components/Head'
import {Card} from '@components/Card'
import {NavBar, Footer} from '@components/Layout'
import {getAllPosts} from '@lib/mdx'

import styles from './Blog.module.scss'
import formatDate from '@lib/format-date'

export default function Blog({posts}) {
  return (
    <div className={styles.container}>
      <Head title="Blog • Abdullah Ammar • Developer" path="/blog" />

      <header className={styles.header}>
        <NavBar />
      </header>

      <main className={styles.main}>
        <div className={styles.blog_container}>
          <div className={styles.blog}>
            <div className={styles.blog_header}>
              <h2 className={styles.blog_header_title}>Blog</h2>
              <p className={styles.blog_header_desc}>
                My thought about web development, technology, life, and
                everything in between.
              </p>
            </div>
            <div className={styles.blog_posts}>
              {posts.map(({slug, frontmatter: meta}) => {
                return (
                  <Card
                    key={slug}
                    title={meta.title}
                    description={''}
                    tag={meta.tags[0]}
                    date={formatDate(meta.date)}
                    image={meta.image}
                    imageWidth="320px"
                    imageHeight="320px"
                    link={meta.link == null ? `/blog/${slug}` : meta.link}
                  />
                )
              })}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export async function getStaticProps() {
  const posts = getAllPosts('blog')
  return {
    props: {posts},
  }
}
