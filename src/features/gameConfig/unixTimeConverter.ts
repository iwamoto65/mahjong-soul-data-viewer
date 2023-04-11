export const convertUnixTime = (unixtime: number): string => {
  const datetime = new Date(unixtime * 1000)
  const jpTime = datetime.toLocaleDateString() + '/' + datetime.toLocaleTimeString()

  return jpTime
}
