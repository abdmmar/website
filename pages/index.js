import Head from 'next/head'
import Link from 'next/link'
import {getAllPosts} from '@lib/mdx'
import styles from './Index.module.scss'
import {NavBar} from '@components/Layout'
import {Card} from '@components/Card'

import ImgBlue from '@public/Blue.jpg'

export default function Home({posts}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Abdullah Ammar • Developer</title>
        <meta
          name="description"
          content="Hi! I'm Ammar, a computer science student and graphic design enthusiast who passionate to build something fun and useful. Currently remote working as Developer Intern at Telkom DDB, learning about technology, software engineering, and web development, and trying to contribute to open source."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <NavBar />
      </header>

      <main className={styles.main}>
        <div className={styles.hero_container}>
          <div className={styles.hero_grid_one}>
            <div></div>
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
            <div></div>
          </div>
          <div className={styles.hero_grid_two}>
            <div></div>
            <div className={styles.hero_cta}>
              <a href="#projects" className={styles.hero_cta_link}>
                <h3 className={styles.hero_cta_link_text}>Learn more</h3>
                <span>
                  <svg
                    width="30"
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
            <div></div>
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
                  title="Koleksi Sinema Indonesia"
                  description="Website sederhana yang berfungsi untuk mencari sinema-sinema
                  Indonesia terkini, dibangun menggunakan Web Component dan
                  TailwindCSS."
                  tag="Web"
                  date="23 Feb 2021"
                  image="/Blue.jpg"
                  imageWidth="500px"
                  imageHeight="300px"
                  link="/blog/koleksi-sinema-indonesia"
                />
              </div>
              <div className={styles.projects_aside_content}>
                <Card
                  title="Cari Karya Seni"
                  description="Simple web app to find any art from Harvard Art Museum."
                  tag="Web"
                  date="2020"
                  link="/blog/koleksi-sinema-indonesia"
                />
                <Card
                  title="Bi-weekly Poster"
                  description="Bi-weekly poster that aims to train sensibility in graphic
                  design"
                  tag="Design"
                  date="2020"
                  link="/blog/koleksi-sinema-indonesia"
                />
                <Card
                  title="Tudu"
                  description="Penanda laman sederhana"
                  tag="API"
                  date="2020"
                  link="/blog/koleksi-sinema-indonesia"
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.blog_container}>
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
              {posts.map(({slug, frontmatter: meta}) => {
                return (
                  <Card
                    key={slug}
                    title={meta.title}
                    description={''}
                    tag={meta.category}
                    date={meta.date}
                    image={ImgBlue}
                    link={meta.link == null ? `/blog/${slug}` : meta.link}
                  />
                )
              })}
              <Card
                title="Sedikit yang saya tau tentang teknologi"
                tag="API"
                date="2020"
                image={ImgBlue}
                link="/blog/koleksi-sinema-indonesia"
              />
              <Card
                title="Ulasan: A Common Sense Guide to Algorithm and Data Structure"
                tag="API"
                date="2020"
                image={ImgBlue}
                link="/blog/koleksi-sinema-indonesia"
              />
            </div>
          </div>
        </div>
      </main>
      <footer></footer>
    </div>
  )
}

export async function getStaticProps() {
  const posts = getAllPosts('blog')
  return {
    props: {posts},
  }
}
