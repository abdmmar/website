import Link from 'next/link'
import isURL from '@lib/is-url'

import style from './Link.module.scss'

export default function NextLink({href, children}) {
  if (href.startsWith('#') && typeof children != 'string') {
    return <a href={href}>{children}</a>
  }

  if (isURL(href)) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={style.link}>
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className={style.link}>
      {children}
    </Link>
  )
}
