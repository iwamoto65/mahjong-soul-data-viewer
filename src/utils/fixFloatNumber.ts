export const fixFloatNumber = (n: number) => {
  if (n === 0 || n === 100) {
    return Number(n.toFixed(0))
  } else {
    return Number(n.toFixed(2))
  }
}
