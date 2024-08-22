import { fixFloatNumber } from "@/utils/fixFloatNumber"

export const useLiqiChasingRateHook = (liqi: number, preemption: number) => {
  if (liqi === 0) return 0

  return fixFloatNumber(100 - (preemption / liqi * 100))
}
