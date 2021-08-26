import Link from 'next/link'

import Head from '@components/Head'
import {Card} from '@components/Card'
import {NavBar, Footer} from '@components/Layout'
import {getAllPosts} from '@lib/mdx'
import formatDate from '@lib/format-date'
import useWindowSize from '@hooks/useWindowSize'

import styles from './Index.module.scss'

export default function Home({posts}) {
  const {width: windowWidth} = useWindowSize()

  return (
    <div className={styles.container} id="top">
      <Head />

      <header className={styles.header}>
        <NavBar />
      </header>

      <main className={styles.main}>
        <div className={styles.hero_container}>
          <div className={styles.hero}>
            <div className={styles.hero_content}>
              <div className={styles.hero_desc}>
                <h2 className={styles.hero_desc_title}>
                  <span className={styles.hero_desc_title_name}>
                    Hi! I&apos;m Ammar,
                  </span>
                  <br />
                  a student and developer
                  <br /> who passionate to build <br />
                  something fun and useful.
                </h2>
              </div>
            </div>
          </div>
          <div className={styles.hero_info}>
            <div className={styles.hero_cta}>
              <a href="#projects" className={styles.hero_cta_link}>
                <p className={styles.hero_cta_link_text}>Learn more</p>
                <span>
                  <svg
                    width="25"
                    height="33"
                    viewBox="0 0 30 33"
                    fill="white"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <use href="#icon-arrow"></use>
                  </svg>
                </span>
              </a>
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
                  tag={posts?.projects[0].frontmatter.tags[0]}
                  date={new Date(
                    posts?.projects[0].frontmatter.date,
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
                        tag={meta.tags[0]}
                        date={new Date(meta.date).getFullYear()}
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
                    tag={meta.tags[0]}
                    date={formatDate(meta.date)}
                    image={meta.image}
                    imageAlt={meta.image_alt}
                    link={meta.link == null ? `/blog/${slug}` : meta.link}
                  />
                )
              })}
            </div>
            {windowWidth <= 768 ? (
              <Link href="/projects">
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
      <Footer />
    </div>
  )
}

export async function getStaticProps() {
  const blog = getAllPosts('blog')
  const projects = getAllPosts('projects')

  return {
    props: {posts: {blog, projects}},
  }
}
