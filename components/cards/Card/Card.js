import * as React from 'react'
import Link from 'next/link'

import {Image} from '@components/mdx'
import isURL from '@lib/is-url'

import styles from './Card.module.scss'

const Card = ({title, description, category, date, image, imageAlt, repository, link}) => {
  return (
    <div className={styles.card}>
      {image && <Image src={image} alt={imageAlt || title} objectFit="cover" />}
      <div className={styles.info}>
        <small className={styles.tag}>
          {category}
          {repository && (
            <>
              {' • '}
              <a className={styles.repository} href={repository} target="_blank" rel="noreferrer">
                <small>repository</small>
              </a>
            </>
          )}
        </small>
        <small className={styles.date}>{date}</small>
      </div>
      {isURL(link) ? (
        <h3>
          <a className={styles.title} href={link} target="_blank" rel="noreferrer">
            {title}
          </a>
        </h3>
      ) : (
        <h3>
          <Link href={link} passHref className={styles.title}>
            {title}
          </Link>
        </h3>
      )}

      {description && <p className={styles.desc}>{description}</p>}
    </div>
  )
}

export default Card
