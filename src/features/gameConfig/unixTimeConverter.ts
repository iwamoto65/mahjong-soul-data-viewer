export const convertUnixTime = (unixtime: number): string => {
  const locale = 'ja-JP'
  const options = { timeZone: 'Asia/Tokyo' }
  const datetime: Date = new Date(unixtime * 1000)
  const jpTime: string = datetime.toLocaleDateString(locale, options) + '/' + datetime.toLocaleTimeString(locale, options)

  return jpTime
}
