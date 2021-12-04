import NextHead from 'next/head'

const DOMAIN = 'https://abdmmar.tech'

export default function Head({
  path = '/',
  title = 'Abdullah Ammar',
  description = "Hi! I'm Ammar, a student and developer who passionate to build something fun and useful.",
  type = 'website',
  locale = 'id_ID',
  image = '/static/meta.png',
  image_alt = "text: Hi! I'm Ammar, a student and developer who passionate to build something fun and useful.",
  keywords = ['frontend', 'engineer', 'digital garden', 'blog', 'projects', 'interactive', 'ui'],
  published_date = '2021',
  modified_date,
}) {
  const url = DOMAIN + path
  const image_path = `${DOMAIN}${image}`
  const published_time = new Date(published_date)
  const modified_time = modified_date == null ? published_time : new Date(modified_date)

  return (
    <NextHead>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />

      {/* https://ahrefs.com/blog/open-graph-meta-tags/ */}
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image_path} />
      <meta property="og:image:alt" content={image_alt} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:locale" content={locale} />
      <meta property="og:type" content={type} />

      {type === 'article' ? (
        <>
          <meta property="article:published_time" content={published_time} />
          <meta property="article:modified_time" content={modified_time} />
        </>
      ) : (
        ''
      )}

      <meta name="twitter:url" content={url} />
      <meta name="twitter:image" content={image_path} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:site" content="@abdmmar" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@abdmmar" />

      {/* https://realfavicongenerator.net/ */}
      {/* https://css-tricks.com/svg-favicons-and-all-the-fun-things-we-can-do-with-them/ */}
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#2d89ef" />
      <meta name="theme-color" content="#ffffff" />
    </NextHead>
  )
}
