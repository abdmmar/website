import * as React from 'react'
import Image from 'next/image'
import {getMDXComponent} from 'mdx-bundler/client'

import {Head} from '@components/pages'
import {Share} from '@components/buttons'
import {Layout} from '@components/layouts'
import {Callout, Link, Image as CustomImage} from '@components/mdx'
import {getAllPosts, getSinglePost} from '@lib/mdx'
import formatDate from '@lib/format-date'

import styles from './[slug].module.scss'

const FOLDER = 'projects'

export default function DetailProjects({code, frontmatter: meta, slug}) {
  const Component = React.useMemo(
    () => getMDXComponent(code, {Callout}),
    [code],
  )

  return (
    <Layout>
      <Head
        title={`${meta.title} • Abdullah Ammar • Developer`}
        path={`/projects/${slug}`}
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
              <span>{meta.category}</span>
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
            <div className={styles.hero_info_container}>
              <dl className={styles.hero_info}>
                <div>
                  <dt>Repository</dt>
                  <dd>
                    <a
                      href={meta.repository}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Github
                    </a>
                  </dd>
                </div>
                <div>
                  <dt>Demo</dt>
                  <dd>
                    <a href={meta.website} target="_blank" rel="noreferrer">
                      {meta.title}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt>Status</dt>
                  <dd>{meta.status}</dd>
                </div>
                <div>
                  <dt>Author</dt>
                  <dd>{meta.author.join(', ')}</dd>
                </div>
                <div>
                  <dt>Tags</dt>
                  <dd>{meta.tags.join(', ')}</dd>
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
              title={process.browser ? document.title : meta.title}
              description={meta.description}
              url={
                process.browser
                  ? document.location.href
                  : 'https://abdmmar.tech/projects/' + slug
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
