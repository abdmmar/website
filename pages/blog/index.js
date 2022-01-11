import * as React from 'react'

import {Head} from '@components/seo'
import {Card} from '@components/cards'
import {Layout} from '@components/layouts'
import formatDate from '@lib/format-date'
import {getAllPosts} from '@lib/mdx'

import styles from './Blog.module.scss'

export default function Blog({posts}) {
  return (
    <Layout>
      <Head title="Abdullah Ammar • Blog" path="/blog" />

      <main className={styles.main}>
        <div className={styles.blog_container}>
          <div className={styles.blog}>
            <div className={styles.blog_header}>
              <h2 className={styles.blog_header_title}>Blog</h2>
              <p className={styles.blog_header_desc}>
                My thought about web development, technology, life, and everything in between.
              </p>
            </div>
            <div className={styles.blog_posts}>
              {posts.map((post) => {
                return (
                  <Card
                    key={post.slug}
                    title={post.title}
                    description={''}
                    category={post.category}
                    date={formatDate(post.published_date)}
                    image={post.image}
                    imageWidth="320px"
                    imageHeight="320px"
                    link={post.link == null ? `/blog/${post.slug}` : post.link}
                  />
                )
              })}
            </div>
          </div>
        </div>
      </main>
    </Layout>
  )
}

export async function getStaticProps() {
  const posts = getAllPosts('blog')
  return {
    props: {posts},
  }
}
