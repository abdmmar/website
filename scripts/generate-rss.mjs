import fs from 'fs'
import path from 'path'
import {Feed} from 'feed'
import matter from 'gray-matter'

const POSTS_PATH = path.join(process.cwd(), 'posts')

const getAllPosts = (folder) => {
  const fileNames = fs.readdirSync(path.join(POSTS_PATH, folder))
  const posts = fileNames
    .map((fileName) => {
      const source = fs.readFileSync(path.join(POSTS_PATH, folder, fileName))
      const slug = fileName.replace(/\.mdx?$/, '')
      const {data} = matter(source)

      return {
        ...data,
        slug: slug,
      }
    })
    .sort((a, b) => new Date(b.published_date).getTime() - new Date(a.published_date).getTime())

  return posts
}

async function generate() {
  const date = new Date()
  const blogList = getAllPosts('blog')
  const siteURL = 'https://www.abdmmar.tech'

  console.log(blogList)

  const author = {
    name: 'Abdullah Ammar',
    email: 'abd.ammar.mar@gmail.com',
    link: 'https://twitter.com/abdmmar',
  }

  const feed = new Feed({
    title: "Abdullah Ammar's Projects and Blog",
    description:
      'Build some stuff and writes personal opinion about web development, technology, life, and everything in between',
    id: siteURL,
    link: siteURL,
    image: `${siteURL}/static/meta.png`,
    favicon: `${siteURL}/favicon.svg`,
    copyright: `All rights reserved ${date.getFullYear()}, Abdullah Ammar`,
    updated: date,
    generator: 'Feed for Node.js',
    feedLinks: {
      rss2: `${siteURL}/rss/feed.xml`,
      json: `${siteURL}/rss/feed.json`,
      atom: `${siteURL}/rss/atom.xml`,
    },
    author,
  })

  blogList.forEach((blog) => {
    const {slug, ...meta} = blog
    const url = `${siteURL}/blog/${slug}`

    addFeedItem({url, ...meta})
  })

  function addFeedItem({url, title, description, published_date}) {
    feed.addItem({
      title: title,
      id: url,
      link: url,
      description: description || title,
      content: description,
      author: [author],
      contributor: [author],
      date: new Date(published_date),
    })
  }

  fs.mkdirSync('./public/rss', {recursive: true})
  fs.writeFileSync('./public/rss/feed.xml', feed.rss2())
  fs.writeFileSync('./public/rss/atom.xml', feed.atom1())
  fs.writeFileSync('./public/rss/feed.json', feed.json1())
}

generate()
