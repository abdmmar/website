import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import {bundleMDX} from 'mdx-bundler'
import readingTime from 'reading-time'

import rehypeSlug from 'rehype-slug'
import rehypeCodeTitles from 'rehype-code-titles'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrism from 'rehype-prism-plus'

export const POSTS_PATH = path.join(process.cwd(), 'posts')

export const getSourceFile = (filename) => {
  return fs.readFileSync(path.join(POSTS_PATH, filename))
}

export const getAllPosts = (folder) => {
  const fileNames = fs.readdirSync(path.join(POSTS_PATH, folder))
  const posts = fileNames
    .map((fileName) => {
      const source = getSourceFile(`${folder}/${fileName}`)
      const slug = fileName.replace(/\.mdx?$/, '')
      const {data} = matter(source)

      return {
        frontmatter: data,
        slug: slug,
      }
    })
    .sort(
      (a, b) =>
        new Date(b.frontmatter.published_date) -
        new Date(a.frontmatter.published_date),
    )

  return posts
}

export const getSinglePost = async (slug) => {
  const source = getSourceFile(`${slug}.mdx`)

  const {code, frontmatter} = await bundleMDX(source, {
    cwd: process.cwd(),
    globals: {
      '@components/mdx/Callout': 'Callout', // https://github.com/kentcdodds/mdx-bundler/issues/53
    },
    xdmOptions: (options) => {
      options.rehypePlugins = [
        ...(options?.rehypePlugins ?? []),
        rehypeSlug,
        rehypeCodeTitles,
        rehypePrism,
        [
          rehypeAutolinkHeadings,
          {
            properties: {
              className: ['anchor'],
            },
          },
        ],
      ]

      return options
    },
  })

  const {content} = matter(source)
  const readTime = readingTime(content)

  return {
    frontmatter,
    code,
    readTime,
  }
}
