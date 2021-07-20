import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import {bundleMDX} from 'mdx-bundler'

export const POSTS_PATH = path.join(process.cwd(), 'posts')

export const getSourceFile = (filename) => {
  return fs.readFileSync(path.join(POSTS_PATH, filename))
}

export const getAllPosts = () => {
  const fileNames = fs.readdirSync(POSTS_PATH)
  const posts = fileNames.map((fileName) => {
    const source = getSourceFile(fileName)
    const slug = fileName.replace(/\.mdx?$/, '')
    const {data} = matter(source)

    return {
      frontmatter: data,
      slug: slug,
    }
  })
  return posts
}

export const getSinglePost = async (slug) => {
  const source = getSourceFile(`${slug}.mdx`)

  const {code, frontmatter} = await bundleMDX(source, {
    cwd: process.cwd(),
    globals: {
      '@components/Blog/Callout': 'Callout',
    },
  })

  return {
    frontmatter,
    code,
  }
}
