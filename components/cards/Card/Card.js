import * as React from 'react'
import Link from 'next/link'

import {Image} from '@components/mdx'
import isURL from '@lib/is-url'

import styles from './Card.module.scss'

const Card = ({title, description = null, tag, date, image = null, imageAlt = title, link}) => {
  return (
    <div className={styles.card}>
      {image != null && <Image src={image} alt={imageAlt} objectFit="cover" />}
      <div className={styles.info}>
        <small className={styles.tag}>{tag}</small>
        <small className={styles.date}>{date}</small>
      </div>
      {isURL(link) ? (
        <a href={href} target="_blank" rel="noreferrer">
          <h3>{children}</h3>
        </a>
      ) : (
        <h3>
          <Link href={link} passHref>
            <a className={styles.title}>{title}</a>
          </Link>
        </h3>
      )}

      {description != null && description.length !== 0 ? (
        <p className={styles.desc}>{description}</p>
      ) : (
        ''
      )}
    </div>
  )
}

export default Card
