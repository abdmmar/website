import * as React from 'react'
import cn from 'classnames'

import Head from '@components/Head'
import {Card} from '@components/Card'
import {NavBar, Footer} from '@components/Layout'
import {getAllPosts} from '@lib/mdx'

import styles from './Projects.module.scss'

export default function Projects({posts}) {
  console.log(posts)
  return (
    <div className={styles.container}>
      <Head title="Projects • Abdullah Ammar • Developer" path="/projects" />

      <header className={styles.header}>
        <NavBar />
      </header>

      <main className={styles.main}>
        <div className={styles.projects_container}>
          <div className={styles.projects}>
            <div className={styles.projects_header}>
              <h2 className={styles.projects_header_title}>Projects</h2>
              <p className={styles.projects_header_desc}>
                Here are some of my work for assignments, organizations,
                events, and initiative.
              </p>
            </div>
            <div
              className={cn({
                [styles.projects_posts]: posts.length > 0,
                [styles.projects_empty]: posts.length === 0,
              })}
            >
              {posts.length !== 0 ? (
                posts.map(({slug, frontmatter: meta}) => {
                  return (
                    <Card
                      key={slug}
                      title={meta.title}
                      description={''}
                      tag={meta.tags[0]}
                      date={meta.date}
                      image={meta.thumbnail}
                      imageWidth="320px"
                      imageHeight="320px"
                      link={
                        meta.link == null ? `/projects/${slug}` : meta.link
                      }
                    />
                  )
                })
              ) : (
                <h4>🚧 Projects is under construction 🚧</h4>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export async function getStaticProps() {
  const posts = getAllPosts('projects')
  return {
    props: {posts},
  }
}
