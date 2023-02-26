import Link from 'next/link'

import {Head} from '@components/seo'
import {Card} from '@components/cards'
import {Layout} from '@components/layouts'
import {InteractiveTitle} from '@components/features'
import {getAllPosts} from '@lib/mdx'
import formatDate from '@lib/format-date'
import useWindowSize from '@hooks/useWindowSize'

import styles from './Index.module.scss'
import classNames from 'classnames'

export default function Home({posts}) {
  const {width: windowWidth} = useWindowSize()

  return (
    <Layout>
      <Head />

      <main className={styles.main}>
        <div className={styles.hero_container}>
          <div className={styles.hero_desc}>
            <p className={styles.hero_desc__text}>
              a software engineer from small town in Central Java, Indonesia. I likes to build and
              experiment things around the ❉ web and ⚘ design. Currently learning <sup>(1)</sup>
              creative coding, <sup>(2)</sup>crafting zine, <sup>(3)</sup>writing poetry, and{' '}
              <sup>(4)</sup>trying photography.
            </p>
            <div className={styles.hero_desc__social}>
              <a href="mailto: abd.ammar.mar@gmail.com">Email</a>
              <span>/</span>
              <a href="https://www.github.com/abdmmar" rel="noreferrer" target="_blank">
                GitHub
              </a>
              <span>/</span>
              <a href="https://www.twitter.com/abdmmar" rel="noreferrer" target="_blank">
                Twitter
              </a>
            </div>
          </div>
          <div className={styles.hero_ascii}>
            <pre className={classNames(styles.hero_ascii__item, styles.hero_ascii__coffee)}>
              {`
   (
   ) )
 _(((__
|||   ||__
|||~~~|| \\\\
|||###|| ||
|||###||_//
\\======/`}
            </pre>
            <pre className={styles.hero_ascii__item}>
              {`              
       _________________
      |  _____________  |_
      | ||||||||||||||| |||
      | ||||||||||||||| |||\\\\
      | ||||> start|||| |||||||
      | ||||||exit||||| |||===|
      | ||||||||||||||| |||===|
      | |=============| |||///
      |_________________|||||
        |______________||||=
 _______(_____________))______
|       (------)  ________()  |\\\\\\\\
|                |[_____=_]|  ||||||
|_______________ |_.-____=_|  ||||||
 )||||||||||||||||_________|__|////
`}
            </pre>
            <pre className={classNames(styles.hero_ascii__item, styles.hero_ascii__flower)}>
              {`
    _--_
  _/    \\_
 /_ /\\/\\ _\\
 \\_ \\__/ _/
   \\_  _/
     --
     ||
  __ ||
 /__\\|| __
     ||/__\\
     ||
 ____||____
|==========|
||||#####|#|
\\\\\\\\\\####/#/
 \\\\\\\\\\####/`}
            </pre>
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
