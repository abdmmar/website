import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import isURL from '@lib/is-url'

import styles from './Card.module.scss'

const Card = ({
  title,
  description = null,
  tag,
  date,
  image = null,
  imageWidth = null,
  imageHeight = null,
  link,
}) => {
  return (
    <div className={styles.card}>
      {image != null ? (
        <Image
          src={image}
          alt={title}
          width={imageWidth}
          height={imageHeight}
          objectFit="cover"
        />
      ) : (
        ''
      )}
      <div className={styles.info}>
        <span className={styles.tag}>{tag}</span>
        <span className={styles.date}>{date}</span>
      </div>
      {isURL(link) ? (
        <a href={href} target="_blank" rel="noreferrer">
          {children}
        </a>
      ) : (
        <Link href={link}>
          <a className={styles.title}>
            <span>{title}</span>
          </a>
        </Link>
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
