export const fixFloatNumber = (n: number): number => {
  if (n === 0 || n === 100) {
    return Number((n).toFixed(0))
  } else {
    return Number((n).toFixed(2))
  }
}
