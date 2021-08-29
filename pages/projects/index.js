import * as React from 'react'
import cn from 'classnames'

import {Head} from '@components/pages'
import {Card} from '@components/cards'
import {Layout} from '@components/layouts'
import {getAllPosts} from '@lib/mdx'

import styles from './Projects.module.scss'

export default function Projects({posts}) {
  return (
    <Layout>
      <Head title="Projects • Abdullah Ammar • Developer" path="/projects" />

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
                <>
                  <div className={styles.projects_posts_main}>
                    <div className={styles.projects_posts_primary}>
                      <Card
                        key={posts[0].slug}
                        title={posts[0].frontmatter.title}
                        description={posts[0].frontmatter.description}
                        tag={posts[0].frontmatter.tags[0]}
                        date={new Date(
                          posts[0].frontmatter.date,
                        ).getFullYear()}
                        image={posts[0].frontmatter.image}
                        link={
                          posts[0].frontmatter.link == null
                            ? `/projects/${posts[0].slug}`
                            : posts[0].frontmatter.link
                        }
                      />
                    </div>
                    <div className={styles.projects_posts_secondary}>
                      {posts.length > 1 ? (
                        <Card
                          key={posts[1].slug}
                          title={posts[1].frontmatter.title}
                          description={posts[1].frontmatter.description}
                          tag={posts[1].frontmatter.tags[0]}
                          date={new Date(
                            posts[1].frontmatter.date,
                          ).getFullYear()}
                          image={posts[1].frontmatter.image}
                          link={
                            posts[1].frontmatter.link == null
                              ? `/projects/${posts[1].slug}`
                              : posts[1].frontmatter.link
                          }
                        />
                      ) : (
                        ''
                      )}
                    </div>
                  </div>
                  <div className={styles.projects_posts_list}>
                    {posts.map(({slug, frontmatter: meta}, index) => {
                      if (index >= 2) {
                        return (
                          <Card
                            key={slug}
                            title={meta.title}
                            description={meta.description}
                            tag={meta.tags[0]}
                            date={new Date(meta.date).getFullYear()}
                            link={
                              meta.link == null
                                ? `/projects/${slug}`
                                : meta.link
                            }
                          />
                        )
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
