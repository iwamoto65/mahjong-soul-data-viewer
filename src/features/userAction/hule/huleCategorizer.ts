export const categorizeHule = (seat: number, recordHule: any[]) => {
  let huleData: { ming: string[] | [], zimo: boolean, qinjia: boolean, liqi: boolean, dadian: number, deltaScore: number, liDora: number }[] = []

  recordHule.forEach((record) => {
    record.result.data.hules.forEach((hule: {
      seat: number,
      ming?: string[],
      zimo: boolean,
      qinjia: boolean,
      liqi: boolean,
      dadian: number,
      fans: { val: number, id: number }[]
    }) => {
      if (hule.seat === seat) {
        let liDoraCount: number = 0
        hule.fans.forEach((fan) => { if (fan.id === 33) liDoraCount = fan.val })

        huleData.push({
          ming: hule.ming || [],
          zimo: hule.zimo,
          qinjia: hule.qinjia,
          liqi: hule.liqi,
          dadian: hule.dadian,
          deltaScore: record.result.data.delta_scores[seat],
          liDora: liDoraCount
        })
      }
    })
  })

  return huleData
}
