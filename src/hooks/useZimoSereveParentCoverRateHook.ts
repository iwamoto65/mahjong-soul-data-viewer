import { fixFloatNumber } from "@/utils/fixFloatNumber"

export const useZimoSereveParentCoverRateHook = (parentCoverScores: number[]) => {
  if (parentCoverScores.length === 0) return 0

  let sereveParentCoverCount: number = 0

  parentCoverScores.forEach((score) => { if (Math.abs(score) >= 3900) sereveParentCoverCount++ })

  return fixFloatNumber((sereveParentCoverCount / parentCoverScores.length) * 100)
}
