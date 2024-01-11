export const translate = (intl, id, values) =>
  intl && intl.formatMessage({ id: `omnishipping.${id}` }, values)

export const translateDate = (intl, value) =>
  intl.formatDate(value, {
    weekday: 'long',
    year: 'numeric',
    day: 'numeric',
    month: 'long',
  })

export const translateTime = (intl, value) =>
  intl.formatTime(value, {
    timeZone: 'UTC',
  })
