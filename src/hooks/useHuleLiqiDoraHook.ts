export const useHuleLiqiDoraHook = (hule: { liqi: boolean, liDora: number }[]): number => {
  let liqiDoraCount: number = 0

  hule.forEach((h) => {
    if (h.liqi && h.liDora > 0) liqiDoraCount++
  })

  return liqiDoraCount
}
