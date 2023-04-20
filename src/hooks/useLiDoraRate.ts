import { fixFloatNumber } from "@/utils/fixFloatNumber"

export const CulcLidoraRate = (liDoras: number[]) => {
  if (liDoras.length === 0) return 0

  const liqiCount: number = liDoras.length
  const lidoraCount: number = liDoras.filter((liDora: number) => liDora > 0).length

  return fixFloatNumber((lidoraCount / liqiCount) * 100)
}
