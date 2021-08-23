export const enableTheme = (theme) => {
  document.documentElement.setAttribute('data-theme', theme)
  localStorage.setItem('theme', theme)
}

export const disableTheme = () => {
  document.documentElement.removeAttribute('data-theme')
  localStorage.removeItem('theme')
}

/* 
  Disable theme transitions
  See: https://paco.sh/blog/disable-theme-transitions
*/
export const disableTransition = () => {
  const css = document.createElement('style')
  css.appendChild(
    document.createTextNode(
      `* {
        -webkit-transition: none !important;
        -moz-transition: none !important;
        -o-transition: none !important;
        -ms-transition: none !important;
        transition: none !important;
      }`,
    ),
  )
  document.head.appendChild(css)
  return css
}

// Calling getComputedStyle forces the browser to redraw
export const redraw = (cssElem) => {
  window.getComputedStyle(cssElem).opacity
  document.head.removeChild(cssElem)
}
