import Link from 'next/link'
import isURL from '@lib/is-url'

export default function NextLink({href, children}) {
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
