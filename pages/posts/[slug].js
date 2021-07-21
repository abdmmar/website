import * as React from 'react'
import Link from 'next/link'
import {getMDXComponent} from 'mdx-bundler/client'
import {getAllPosts, getSinglePost} from '@lib/mdx'
import isURL from '@lib/is-url'
import {Callout, Image} from '@components/Blog'

function Paragraph({children}) {
  if (children?.type?.name === 'Image') {
    const {src, alt} = children.props
    return <Image src={src} alt={alt} />
  }

  return <p>{children}</p>
}

function NextLink({href, children}) {
  if (isURL(href)) {
    return (
      <a href={href} target="_blank" rel="noreferrer">
        {children}
      </a>
    )
  }

  return (
    <Link href={href}>
      <a>{children}</a>
    </Link>
  )
}

export default function Post({code, frontmatter: meta, readTime}) {
  const Component = React.useMemo(
    () => getMDXComponent(code, {Callout}),
    [code],
  )

  return (
    <div className="container">
      <h2>{meta.title}</h2>
      <p>{readTime.text}</p>
      <Component
        components={{
          img: Image,
          p: Paragraph,
          a: NextLink,
        }}
      />
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
