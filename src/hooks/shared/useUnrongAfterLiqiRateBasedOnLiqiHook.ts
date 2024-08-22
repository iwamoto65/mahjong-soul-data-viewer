import { fixFloatNumber } from "@/utils/fixFloatNumber"

export const useUnrongAfterLiqiRateBasedOnLiqiHook = (liqi: number, unrongAfterLiqi: number) => {
  if (liqi === 0) return 0

  return fixFloatNumber(unrongAfterLiqi / liqi * 100)
}
