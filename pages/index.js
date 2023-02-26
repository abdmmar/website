import Link from 'next/link'

import {Head} from '@components/seo'
import {Card} from '@components/cards'
import {Layout} from '@components/layouts'
import {InteractiveTitle} from '@components/features'
import {getAllPosts} from '@lib/mdx'
import formatDate from '@lib/format-date'
import useWindowSize from '@hooks/useWindowSize'

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
                <a href="https://www.github.com/abdmmar" rel="noreferrer" target="_blank">
                  abdmmar
                </a>
              </div>
              <div className={styles.hero_social_link}>
                <span>Twitter</span>
                <a href="https://www.twitter.com/abdmmar" rel="noreferrer" target="_blank">
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
                Here are some of my work for assignments, organizations, events, and initiative.
              </p>
              <HeaderLink href="/projects" text="See all projects" />
            </div>
            <div className={styles.projects_content}>
              <div className={styles.projects_main_content}>
                <Card
                  {...posts?.projects[0]}
                  date={new Date(posts?.projects[0].published_date).getFullYear()}
                />
              </div>
              <div className={styles.projects_aside_content}>
                {posts?.projects?.slice(1, 4).map((post) => {
                  return (
                    <Card
                      {...post}
                      image=""
                      key={post.slug}
                      date={new Date(post.published_date).getFullYear()}
                    />
                  )
                })}
              </div>
            </div>
            {windowWidth <= 768 && <HeaderLink href="/projects" text="See all projects" />}
          </div>
        </div>
        <div className={styles.blog_container} id="blog">
          <div className={styles.projects}>
            <div className={styles.projects_header}>
              <h3 className={styles.projects_header_title}>Blog</h3>
              <p className={styles.projects_header_desc}>
                My thought about web development, technology, life, and everything in between.
              </p>
              <HeaderLink href="/blog" text="See all posts" />
            </div>
            <div className={styles.blog_content}>
              {posts?.blog?.slice(0, 3)?.map((post) => {
                return (
                  <Card
                    {...post}
                    key={post.slug}
                    description=""
                    date={formatDate(post.published_date)}
                    link={post.link || `/blog/${post.slug}`}
                  />
                )
              })}
            </div>
            {windowWidth <= 768 && <HeaderLink href="/blog" text="See all posts" />}
          </div>
        </div>
      </main>
    </Layout>
  )
}

const HeaderLink = ({href, text}) => {
  return (
    <Link href={href} className={styles.projects_header_link}>
      {text}
      <svg
        width="16"
        height="16"
        viewBox="0 0 30 33"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <use href="#icon-arrow" className="icon_default"></use>
      </svg>
    </Link>
  )
}

export async function getStaticProps() {
  const blog = getAllPosts('blog')
  const projects = getAllPosts('projects')

  return {
    props: {posts: {blog, projects}},
  }
}
