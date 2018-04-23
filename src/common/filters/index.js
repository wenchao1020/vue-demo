import moment from 'moment'

export function formatTime (time, format) {
  if (!time) {
    return null
  }
  let formatStr = format || 'YYYY-MM-DD'
  return moment(time).format(formatStr)
}
