export const useHuleWithLiqiHook = (hules: { liqi: boolean }[]): number => {
  let count: number = 0

  hules.forEach((hule) => { if (hule.liqi) count++ })

  return count
}
