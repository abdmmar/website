import NextImage from 'next/legacy/image'
import styles from './Image.module.scss'

export default function Image({src, alt, ...props}) {
  return (
    <div className={styles.container}>
      <NextImage src={src} alt={alt} layout="fill" className={styles.img} {...props} />
    </div>
  )
}
