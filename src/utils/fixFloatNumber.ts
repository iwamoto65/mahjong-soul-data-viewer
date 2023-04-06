export const fixFloatNumber = (n: number) => {
  if (n === 0 || n === 100) {
    return n.toFixed(0)
  } else {
    return n.toFixed(2)
  }
}
