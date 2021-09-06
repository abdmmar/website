import * as React from 'react'
import Image from 'next/image'
import {getMDXComponent} from 'mdx-bundler/client'

import {Head} from '@components/pages'
import {Share} from '@components/buttons'
import {Layout} from '@components/layouts'
import {Callout, Link, Image as CustomImage} from '@components/mdx'
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
  const last_modified =
    meta.modified_date != null
      ? ` • Last modified: ${formatDate(meta.modified_date, {
          dateStyle: 'long',
        })}`
      : ''

  return (
    <Layout>
      <Head
        title={`${meta.title} • Abdullah Ammar • Developer`}
        path={`/blog/${slug}`}
        description={meta.description}
        type="article"
        image={meta.image}
        image_alt={meta.image_alt}
        keywords={meta.tags}
        published_date={meta.published_date}
        modified_date={meta.modified_date}
      />

      <main className={styles.main}>
        <div className={styles.hero_container}>
          <div className={styles.hero}>
            <div className={styles.hero_header}>
              <span>{category}</span>
              <span>
                {formatDate(meta.published_date, {dateStyle: 'long'})}
              </span>
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
              <span>
                {`${meta.author} • ${readTime.text}${last_modified} • ${meta.status}`}
              </span>
              <span>{tags.join(', ')}</span>
            </div>
          </div>
        </div>

        <div className={styles.content_container}>
          <div className={styles.content}>
            <article className={styles.content_article}>
              {meta.subtitle != null || meta.subtitle != '' ? (
                <p className={styles.content_article_deck}>{meta.subtitle}</p>
              ) : (
                ''
              )}
              <Component
                components={{
                  img: CustomImage,
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
