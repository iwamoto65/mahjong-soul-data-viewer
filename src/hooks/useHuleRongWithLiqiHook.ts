export const useHuleRongWithLiqiHook = (hules: { zimo: boolean, liqi: boolean }[]): number => {
  let count: number = 0

  hules.forEach((hule) => { if (!hule.zimo && hule.liqi) count++ })

  return count
}
