import Link from 'next/link'
import isURL from '@lib/is-url'

import style from './Link.module.scss'

export default function NextLink({href, children}) {
  if (isURL(href)) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={style.link}>
        {children}
      </a>
    )
  }

  return (
    <Link href={href}>
      <a className={style.link}>{children}</a>
    </Link>
  )
}
