export default function formatDate(date, options = {}) {
  const {locale = 'id-ID', ...option} = options

  return new Intl.DateTimeFormat(locale, {
    dateStyle: 'medium',
    ...option,
  }).format(new Date(date))
}
