export const categorizeHule = (seat: number, recordHule: any[]) => {
  let huleData: { ming: string[] | [], zimo: boolean, qinjia: boolean, liqi: boolean, dadian: number }[] = []

  recordHule.forEach((record) => {
    record.result.data.hules.forEach((hule: {
      seat: number,
      ming?: string[],
      zimo: boolean,
      qinjia: boolean,
      liqi: boolean,
      dadian: number
    }) => {
      if (hule.seat === seat) {
        huleData.push({ ming: hule.ming || [], zimo: hule.zimo, qinjia: hule.qinjia, liqi: hule.liqi, dadian: hule.dadian })
      }
    })
  })

  return huleData
}
