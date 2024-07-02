export const CulcHuleRongWithUnliqiUnming = (hules: { zimo: boolean, liqi: boolean, ming: [] | string[] }[]): number => {
  let count: number = 0

  hules.forEach((hule) => { if (!hule.zimo && !hule.liqi && hule.ming.length == 0) count++ })

  return count
}
