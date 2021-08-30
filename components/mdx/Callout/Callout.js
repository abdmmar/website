import styles from './Callout.module.scss'

export default function Callout({children}) {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>
        <svg
          width="20"
          height="20"
          viewBox="0 0 21 21"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.icon_info}
        >
          <use href="#icon-info" className="icon" />
        </svg>
      </div>
      <div>{children}</div>
    </div>
  )
}
