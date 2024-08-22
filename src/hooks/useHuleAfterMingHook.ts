export const useHuleAfterMingHook = (hule: { ming: string[] | [] }[]): number => {
  let huleMingCount: number = 0

  hule.forEach((h) => { if (h.ming.length > 0) huleMingCount++ })

  return huleMingCount
}
