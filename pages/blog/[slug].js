import * as React from 'react'
import Image from 'next/image'
import {getMDXComponent} from 'mdx-bundler/client'

import Head from '@components/Head'
import {Share} from '@components/Button'
import {NavBar, Footer} from '@components/Layout'
import {Callout, Paragraph, Link} from '@components/MDX'
import {getAllPosts, getSinglePost} from '@lib/mdx'

import styles from './[slug].module.scss'
import formatDate from '@lib/format-date'

const FOLDER = 'blog'

export default function DetailBlog({
  code,
  frontmatter: meta,
  readTime,
  slug,
}) {
  const Component = React.useMemo(
    () => getMDXComponent(code, {Callout}),
    [code],
  )

  const [category, ...tags] = meta.tags

  return (
    <div className={styles.container}>
      <Head
        title={`${meta.title} • Abdullah Ammar • Developer`}
        path={`/blog/${slug}`}
        description={meta.description}
        type="article"
      />

      <header className={styles.header}>
        <NavBar />
      </header>

      <main className={styles.main}>
        <div className={styles.hero_container}>
          <div className={styles.hero}>
            <div className={styles.hero_header}>
              <span>{category}</span>
              <span>{formatDate(meta.date, {dateStyle: 'long'})}</span>
            </div>
            <h2 className={styles.hero_title}>{meta.title}</h2>
            <Image
              src={meta.image}
              alt={meta.image_alt}
              objectFit="cover"
              height="450px"
              width="900px"
            />
            <div className={styles.hero_info}>
              <span>{`${meta.author} • ${readTime.text}`}</span>
              <span>{tags.join(', ')}</span>
            </div>
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

        <div className={styles.footer_content_container}>
          <div className={styles.footer_sharing}>
            <span>Thanks for reading!</span>
            <hr />
            <Share
              title={meta.title}
              description={meta.description}
              url={
                process.browser
                  ? document.location.href
                  : 'https://abdmmar.tech/blog/' + slug
              }
            />
          </div>
        </div>
      </main>

      <Footer />
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
