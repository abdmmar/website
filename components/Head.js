import NextHead from 'next/head'

const DOMAIN = 'https://abdmmar.tech'

export default function Head({
  path = '/',
  title = 'Abdullah Ammar • Developer',
  description = "Hi! I'm Ammar, a computer science student and graphic design enthusiast who passionate to build something fun and useful. Currently remote working as Developer Intern at Telkom DDB, learning about technology, software engineering, and web development, and trying to contribute to open source.",
  type = 'website',
  locale = 'id_ID',
}) {
  const url = DOMAIN + path
  const image = classifyMetaImage(path)

  return (
    <NextHead>
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* https://ahrefs.com/blog/open-graph-meta-tags/ */}
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:locale" content={locale} />
      <meta property="og:type" content={type} />

      <meta name="twitter:url" content={url} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:site" content="@abdmmar" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@abdmmar" />

      <link rel="icon" href="/favicon.ico" />
    </NextHead>
  )
}

function classifyMetaImage(path) {
  let image = `${DOMAIN}/static`

  if (path === '/') {
    image += '/home.jpg'
  } else if (path === '/blog') {
    image += '/blog.jpg'
  } else if (path === '/projects') {
    image += '/projects.jpg'
  } else if (path.startsWith('/blog/')) {
    image = image + path + '/meta.jpg'
  } else if (path.startsWith('/projects/')) {
    image = image + path + '/meta.jpg'
  } else {
    image += 'home.jpg'
  }

  return image
}
