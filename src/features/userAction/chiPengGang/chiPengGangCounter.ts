import type { RecordChiPengGangActions, Round } from "@/types/userAction"

type ChiPengGangUniqueCount = number

export const countChiPengGang = (rounds: Round[], recordChiPengGang: RecordChiPengGangActions, seat: number): ChiPengGangUniqueCount => {
  let chiPengGangTimes: number[] = []
  let chiPengGangRounds: number[] = []

  recordChiPengGang.forEach((record: { passed: number, result: { data: { seat: number }}}) => {
    if (record.result.data.seat === seat) chiPengGangTimes.push(record.passed)
  })

  rounds.forEach((r) => {
    chiPengGangTimes.forEach((t) => {
      if (r.startTime < t && t < r.endTime) chiPengGangRounds.push(r.round)
    })
  })

  const chiPengGangUniqueCount: ChiPengGangUniqueCount = new Set(chiPengGangRounds).size

  return chiPengGangUniqueCount
}
