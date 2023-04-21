import { fixFloatNumber } from "@/utils/fixFloatNumber"

export const CulcLiqiPreemptionRate = (liqi: number, preemption: number) => {
  if (liqi === 0) return 0

  return fixFloatNumber((preemption / liqi) * 100)
}
