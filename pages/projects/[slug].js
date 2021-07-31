import * as React from 'react'
import Image from 'next/image'
import {getMDXComponent} from 'mdx-bundler/client'

import Head from '@components/Head'
import {NavBar} from '@components/Layout'
import {Callout, Paragraph, Link} from '@components/MDX'
import {getAllPosts, getSinglePost} from '@lib/mdx'

import styles from './[slug].module.scss'

const FOLDER = 'projects'

export default function DetailProjects({code, frontmatter: meta, slug}) {
  const Component = React.useMemo(
    () => getMDXComponent(code, {Callout}),
    [code],
  )

  return (
    <div className={styles.container}>
      <Head
        title={`${meta.title} • Abdullah Ammar • Developer`}
        path={`/projects/${slug}`}
        description={meta.description}
        type="article"
      />

      <header className={styles.header}>
        <NavBar />
      </header>

      <main className={styles.main}>
        <div className={styles.hero_container}>
          <div className={`${styles.hero_row} ${styles.row_one}`}>
            <div></div>
            <div className={styles.hero_content}>
              <Image
                src={meta.hero_image}
                alt={meta.hero_alt}
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
                  <dt>Website</dt>
                  <dd>
                    <a href={meta.website} target="_blank" rel="noreferrer">
                      {meta.title}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt>Tags</dt>
                  <dd>{meta.tags.join(', ')}</dd>
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
