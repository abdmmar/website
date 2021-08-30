// https://github.com/vercel/next.js/discussions/18739

import NextImage from 'next/image'
import styles from './Image.module.scss'

export default function Image({src, alt, ...props}) {
  return (
    <div className={styles.container}>
      <NextImage
        src={src}
        alt={alt}
        layout="fill"
        className={styles.img}
        {...props}
      />
    </div>
  )
}
