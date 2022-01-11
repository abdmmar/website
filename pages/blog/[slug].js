import * as React from 'react'
import Image from 'next/image'
import {getMDXComponent} from 'mdx-bundler/client'

import {Head} from '@components/seo'
import {Share} from '@components/buttons'
import {Layout} from '@components/layouts'
import {Callout, Link, Paragraph} from '@components/mdx'
import {getAllPosts, getSinglePost} from '@lib/mdx'

import styles from './[slug].module.scss'
import formatDate from '@lib/format-date'

const FOLDER = 'blog'

export default function DetailBlog({code, meta, readTime, slug}) {
  const Component = React.useMemo(() => getMDXComponent(code, {Callout}), [code])

  const last_modified =
    meta.modified_date != null
      ? formatDate(meta.modified_date, {
          dateStyle: 'long',
        })
      : meta.published_date

  return (
    <Layout>
      <Head
        title={`Abdullah Ammar • ${meta.title}`}
        path={`/blog/${slug}`}
        description={meta.description}
        type="article"
        image={meta.image}
        image_alt={meta.image_alt}
        keywords={meta.keywords}
        published_date={meta.published_date}
        modified_date={meta.modified_date}
      />

      <main className={styles.main}>
        <div className={styles.hero_container}>
          <div className={styles.hero}>
            <div className={styles.hero_header}>
              <span>{meta.category}</span>
              <span>{formatDate(meta.published_date, {dateStyle: 'long'})}</span>
            </div>
            <h2 className={styles.hero_title}>{meta.title}</h2>
            <Image
              src={meta.image}
              alt={meta.image_alt}
              objectFit="cover"
              height="450px"
              width="900px"
            />
            <div className={styles.hero_info_container}>
              <dl className={styles.hero_info}>
                <div className={styles.hero_info_desc}>
                  <dt>Author</dt>
                  <dd>{meta.author}</dd>
                </div>
                <div>
                  <dt>Read time</dt>
                  <dd>{readTime.text}</dd>
                </div>
                <div>
                  <dt>Status</dt>
                  <dd>{meta.status}</dd>
                </div>
                <div>
                  <dt>Last Update</dt>
                  <dd>{last_modified}</dd>
                </div>
                <div>
                  <dt>Tags</dt>
                  <dd>{meta.keywords.join(', ')}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        <div className={styles.content_container}>
          <div className={styles.content}>
            <article className={styles.content_article}>
              {meta.subtitle != null || meta.subtitle != '' ? (
                <p className={styles.content_subtitle}>{meta.subtitle}</p>
              ) : (
                ''
              )}
              <Component
                components={{
                  a: Link,
                  p: Paragraph,
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
              url={process.browser ? document.location.href : 'https://abdmmar.tech/blog/' + slug}
            />
          </div>
        </div>
      </main>
    </Layout>
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
