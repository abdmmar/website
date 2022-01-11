import * as React from 'react'
import cn from 'classnames'

import {Head} from '@components/seo'
import {Card} from '@components/cards'
import {Layout} from '@components/layouts'
import {getAllPosts} from '@lib/mdx'

import styles from './Projects.module.scss'

export default function Projects({posts}) {
  return (
    <Layout>
      <Head title="Abdullah Ammar • Projects" path="/projects" />

      <main className={styles.main}>
        <div className={styles.projects_container}>
          <div className={styles.projects}>
            <div className={styles.projects_header}>
              <h2 className={styles.projects_header_title}>Projects</h2>
              <p className={styles.projects_header_desc}>
                Here are some of my work for assignments, organizations, events, and initiative.
              </p>
            </div>
            <div
              className={cn({
                [styles.projects_posts]: posts.length > 0,
                [styles.projects_empty]: posts.length === 0,
              })}
            >
              {posts.length !== 0 ? (
                <>
                  <div className={styles.projects_posts_main}>
                    <div className={styles.projects_posts_primary}>
                      <Card
                        {...posts?.at(0)}
                        date={new Date(posts?.at(0).published_date).getFullYear()}
                      />
                    </div>
                    <div className={styles.projects_posts_secondary}>
                      <Card
                        {...posts?.at(1)}
                        date={new Date(posts?.at(1).published_date).getFullYear()}
                      />
                    </div>
                  </div>
                  <div className={styles.projects_posts_list}>
                    {posts.map((post, index) => {
                      if (index >= 2) {
                        return <Card {...post} date={new Date(post.published_date).getFullYear()} />
                      }
                    })}
                  </div>
                </>
              ) : (
                <h4>🚧 Projects is under construction 🚧</h4>
              )}
            </div>
          </div>
        </div>
      </main>
    </Layout>
  )
}

export async function getStaticProps() {
  const posts = getAllPosts('projects')
  return {
    props: {posts},
  }
}
