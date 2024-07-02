export const CulcHuleRongWithMing = (hules: { zimo: boolean, ming: [] | string[] }[]): number => {
  let count: number = 0

  hules.forEach((hule) => { if (!hule.zimo && hule.ming.length > 0) count++ })

  return count
}
