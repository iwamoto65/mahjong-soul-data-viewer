import { fixFloatNumber } from "@/utils/fixFloatNumber"

export const useChiPengGangRateHook = (totalRound: number, chiPengGangRound: number) => {
  if (totalRound === 0) return 0

  return fixFloatNumber((chiPengGangRound / totalRound * 100))
}
