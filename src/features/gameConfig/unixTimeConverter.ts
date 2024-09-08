export const convertUnixTime = (unixtime: number): string => {
  const datetime: Date = new Date(unixtime * 1000)
  const jpTime: string = datetime.toLocaleDateString() + '/' + datetime.toLocaleTimeString()

  return jpTime
}
