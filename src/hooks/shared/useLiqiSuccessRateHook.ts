import { fixFloatNumber } from "@/utils/fixFloatNumber"

export const useLiqiSuccessRateHook = (huleWithLiqi: number, liqi: number) => {
  if (huleWithLiqi === 0) return 0

  return fixFloatNumber(huleWithLiqi / liqi * 100)
}
