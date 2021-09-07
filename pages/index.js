import Link from 'next/link'

import {Head} from '@components/pages'
import {Card} from '@components/cards'
import {Layout} from '@components/layouts'
import {getAllPosts} from '@lib/mdx'
import formatDate from '@lib/format-date'
import useWindowSize from '@hooks/useWindowSize'
import {InteractiveTitle} from '@components/features'

import styles from './Index.module.scss'

export default function Home({posts}) {
  const {width: windowWidth} = useWindowSize()

  return (
    <Layout>
      <Head />

      <main className={styles.main}>
        <div className={styles.hero_container}>
          <div className={styles.hero}>
            <div className={styles.hero_content}>
              <div className={styles.hero_desc}>
                <InteractiveTitle />
              </div>
            </div>
          </div>
          <div className={styles.hero_info}>
            <div className={styles.hero_social}>
              <div className={styles.hero_social_link}>
                <span>Email</span>
                <a href="mailto: abd.ammar.mar@gmail.com">Say Hi!</a>
              </div>
              <div className={styles.hero_social_link}>
                <span>Github</span>
                <a
                  href="https://www.github.com/abdmmar"
                  rel="noreferrer"
                  target="_blank"
                >
                  abdmmar
                </a>
              </div>
              <div className={styles.hero_social_link}>
                <span>Twitter</span>
                <a
                  href="https://www.twitter.com/abdmmar"
                  rel="noreferrer"
                  target="_blank"
                >
                  @abdmmar
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.projects_container} id="projects">
          <div className={styles.projects}>
            <div className={styles.projects_header}>
              <h3 className={styles.projects_header_title}>Projects</h3>
              <p className={styles.projects_header_desc}>
                Here are some of my work for assignments, organizations,
                events, and initiative.
              </p>
              <Link href="/projects">
                <a className={styles.projects_header_link}>
                  See all projects
                  <svg
                    width="24"
                    height="30"
                    viewBox="0 0 30 33"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <use href="#icon-arrow"></use>
                  </svg>
                </a>
              </Link>
            </div>
            <div className={styles.projects_content}>
              <div className={styles.projects_main_content}>
                <Card
                  title={posts?.projects[0].frontmatter.title}
                  description={posts?.projects[0].frontmatter.description}
                  tag={posts?.projects[0].frontmatter.category}
                  date={new Date(
                    posts?.projects[0].frontmatter.published_date,
                  ).getFullYear()}
                  image={posts?.projects[0].frontmatter.image}
                  imageAlt={posts?.projects[0].frontmatter.image_alt}
                  link={
                    posts?.projects[0].frontmatter.link == null
                      ? `/projects/${posts?.projects[0].slug}`
                      : posts?.projects[0].frontmatter.link
                  }
                />
              </div>
              <div className={styles.projects_aside_content}>
                {posts?.projects
                  ?.slice(1, 3)
                  .map(({slug, frontmatter: meta}) => {
                    return (
                      <Card
                        key={slug}
                        title={meta.title}
                        description={meta.description}
                        tag={meta.category}
                        date={new Date(meta.published_date).getFullYear()}
                        link={
                          meta.link == null ? `/projects/${slug}` : meta.link
                        }
                      />
                    )
                  })}
              </div>
            </div>
            {windowWidth <= 768 ? (
              <Link href="/projects">
                <a className={styles.projects_header_link}>
                  See all projects
                  <svg
                    width="24"
                    height="30"
                    viewBox="0 0 30 33"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <use href="#icon-arrow"></use>
                  </svg>
                </a>
              </Link>
            ) : (
              ''
            )}
          </div>
        </div>
        <div className={styles.blog_container} id="blog">
          <div className={styles.projects}>
            <div className={styles.projects_header}>
              <h3 className={styles.projects_header_title}>Blog</h3>
              <p className={styles.projects_header_desc}>
                My thought about web development, technology, life, and
                everything in between.
              </p>
              <Link href="/blog">
                <a className={styles.projects_header_link}>
                  See all posts
                  <svg
                    width="24"
                    height="30"
                    viewBox="0 0 30 33"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <use href="#icon-arrow"></use>
                  </svg>
                </a>
              </Link>
            </div>
            <div className={styles.blog_content}>
              {posts?.blog?.slice(0, 3)?.map(({slug, frontmatter: meta}) => {
                return (
                  <Card
                    key={slug}
                    title={meta.title}
                    description={''}
                    tag={meta.category}
                    date={formatDate(meta.published_date)}
                    image={meta.image}
                    imageAlt={meta.image_alt}
                    link={meta.link == null ? `/blog/${slug}` : meta.link}
                  />
                )
              })}
            </div>
            {windowWidth <= 768 ? (
              <Link href="/blog">
                <a className={styles.projects_header_link}>
                  See all posts
                  <svg
                    width="24"
                    height="30"
                    viewBox="0 0 30 33"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <use href="#icon-arrow"></use>
                  </svg>
                </a>
              </Link>
            ) : (
              ''
            )}
          </div>
        </div>
      </main>
    </Layout>
  )
}

export async function getStaticProps() {
  const blog = getAllPosts('blog')
  const projects = getAllPosts('projects')

  return {
    props: {posts: {blog, projects}},
  }
}
