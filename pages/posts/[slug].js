import * as React from 'react'
import {getMDXComponent} from 'mdx-bundler/client'
import {getAllPosts, getSinglePost} from '@lib/mdx'
import {Callout} from '@components/Blog'

export default function Post({code, frontmatter: meta}) {
  const Component = React.useMemo(
    () => getMDXComponent(code, {Callout}),
    [code],
  )

  return (
    <div className="container">
      <h2>{meta.title}</h2>
      <Component components={{blockquote: 'h4'}} />
    </div>
  )
}

export async function getStaticPaths() {
  const paths = getAllPosts().map(({slug}) => ({params: {slug}}))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({params}) {
  const post = await getSinglePost(params.slug)
  return {
    props: {...post},
  }
}
