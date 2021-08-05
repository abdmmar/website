import * as React from 'react'
import {Dialog} from '@reach/dialog'
import copy from 'copy-to-clipboard'
import '@reach/dialog/styles.css'

import styles from './Share.module.scss'

export default function Share({
  title = 'Abdullah Ammar • Developer',
  description = 'A student and developer',
  text = 'Share this article',
  url = 'https://abdmmar.tech',
}) {
  const [isCopied, setCopied] = React.useState(false)
  const [showDialog, setShowDialog] = React.useState(false)

  const handleShare = () => {
    /* 
      Web Share API
      See: https://css-tricks.com/how-to-use-the-web-share-api/
      Also see: https://css-tricks.com/simple-social-sharing-links/
    */
    if (navigator.share) {
      navigator
        .share({
          title: title,
          text: description,
          url: url,
        })
        .then(() => {
          setCopied(true)
          console.log('Thanks for sharing!')
        })
    } else {
      open()
    }
  }

  const handleCopy = () => {
    copy(url)
    setCopied(true)
    console.log('Thanks for sharing!')
  }

  const handleLink = (url) => {
    socialWindow(url)
    setCopied(true)
    console.log('Thanks for sharing!')
  }

  const open = () => setShowDialog(true)
  const close = () => {
    setShowDialog(false)
    setCopied(false)
  }

  return (
    <>
      <button onClick={handleShare} className={styles.button}>
        {text}
        <svg
          width="18"
          height="18"
          viewBox="0 0 30 33"
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <use href="#icon-arrow" className="icon_default"></use>
        </svg>
      </button>
      <Dialog
        isOpen={showDialog}
        onDismiss={close}
        aria-label="Share this article"
      >
        <div className={styles.dialog}>
          <div className={styles.dialog_header}>
            <h4 className={styles.dialog_title}>Share this posts</h4>
            <button onClick={close} className={styles.dialog_close_btn}>
              Close
            </button>
          </div>
          <ul className={styles.dialog_link}>
            <li>
              <button
                onClick={() =>
                  handleLink(
                    `https://twitter.com/intent/tweet?url=${url}&text=${description}`,
                  )
                }
              >
                Twitter
              </button>
            </li>
            <li>
              <button
                onClick={() =>
                  handleLink(
                    `https://www.linkedin.com/shareArticle?mini=true&url=${url}`,
                  )
                }
              >
                LinkedIn
              </button>
            </li>
            <li>
              <button
                onClick={() =>
                  handleLink(`https://www.facebook.com/sharer.php?u=${url}`)
                }
              >
                Facebook
              </button>
            </li>
            <li>
              <button onClick={handleCopy} className={styles.dialog_copy_btn}>
                Copy Link
              </button>
            </li>
          </ul>
          <p className={styles.dialog_message}>
            {isCopied ? 'Thanks for sharing!' : ''}
          </p>
        </div>
      </Dialog>
    </>
  )
}

function socialWindow(url) {
  const left = (screen.width - 570) / 2
  const top = (screen.height - 570) / 2
  const params = `menubar=no,toolbar=no,status=no,width=570,height=570,top=${top},left=${left}`
  window.open(url, 'NewWindow', params)
}
