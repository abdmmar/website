import * as React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import {getMDXComponent} from 'mdx-bundler/client'

import {NavBar} from '@components/Layout'
import {getAllPosts, getSinglePost} from '@lib/mdx'
import {Callout, Paragraph, Link} from '@components/Blog'

import styles from './Blog.module.scss'

const FOLDER = 'blog'

export default function Blog({code, frontmatter: meta, readTime, slug}) {
  const Component = React.useMemo(
    () => getMDXComponent(code, {Callout}),
    [code],
  )

  return (
    <div className={styles.container}>
      <Head>
        <title>{meta.title} • Abdullah Ammar • Developer</title>
        <link rel="icon" href="/favicon.ico" />
        {/* https://ahrefs.com/blog/open-graph-meta-tags/ */}
        <meta name="description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta
          property="og:image"
          content="https://ahrefs.com/blog/wp-content/uploads/2020/01/fb-open-graph-1.jpg"
        />
        <meta
          property="og:url"
          content={`https://abdmmar.tech/blog/${slug}`}
        />
        <meta property="og:locale" content="id_ID" />
        <meta property="og:type" content="article" />
      </Head>

      <header className={styles.header}>
        <NavBar />
      </header>

      <main className={styles.main}>
        <div className={styles.hero_container}>
          <div className={`${styles.hero_row} ${styles.row_one}`}>
            <div></div>
            <div className={styles.hero_content}>
              <Image
                src="/Blue.jpg"
                alt="Header"
                objectFit="cover"
                height="450px"
                width="900px"
              />
            </div>
            <div></div>
          </div>
          <div className={`${styles.hero_row} ${styles.row_two}`}>
            <div></div>
            <div className={styles.hero_info}>
              <h2 className={styles.info_title}>{meta.title}</h2>
              <dl className={styles.info_detail}>
                <div>
                  <dt>Date</dt>
                  <dd>{meta.date}</dd>
                </div>
                <div>
                  <dt>Words</dt>
                  <dd>{meta.author}</dd>
                </div>
                <div>
                  <dt>Reading Time</dt>
                  <dd>{readTime.text}</dd>
                </div>
                <div>
                  <dt>Category</dt>
                  <dd>{meta.category}</dd>
                </div>
                <div>
                  <dt>Tags</dt>
                  <dd>{meta.tag}</dd>
                </div>
              </dl>
            </div>
            <div></div>
          </div>
        </div>

        <div className={styles.content_container}>
          <div className={styles.content}>
            <article className={styles.content_article}>
              <p className={styles.content_article_deck}>
                {meta.description}
              </p>
              <Component
                components={{
                  img: Image,
                  p: Paragraph,
                  a: Link,
                }}
              />
            </article>
          </div>
        </div>
      </main>
    </div>
  )
}

export async function getStaticPaths() {
  const paths = getAllPosts(FOLDER).map(({slug}) => ({
    params: {slug},
  }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({params}) {
  const post = await getSinglePost(`${FOLDER}/${params.slug}`)
  return {
    props: {...post, slug: params.slug},
  }
}
