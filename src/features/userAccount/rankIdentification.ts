export const identifyRank = (seat: number, userAccounts: []) => {
  let rank: { level: string, point: number } = { level: '', point: 0 }

  userAccounts.forEach((account: { seat: number, level: { id: number, score: number }}) => {
    if (account.seat === seat) {
      rank.level = getRankName(account.level.id)
      rank.point = account.level.score
    }
  })

  return rank
}

const getRankName = (rankId: number) => {
  let rankName: string = ''

  switch (rankId) {
    case 10101:
      rankName = '四麻初心1'
      break
    case 10102:
      rankName = '四麻初心2'
      break
    case 10103:
      rankName = '四麻初心3'
      break
    case 10201:
      rankName = '四麻雀士1'
      break
    case 10202:
      rankName = '四麻雀士2'
      break
    case 10203:
      rankName = '四麻雀士3'
      break
    case 10301:
      rankName = '四麻雀傑1'
      break
    case 10302:
      rankName = '四麻雀傑2'
      break
    case 10303:
      rankName = '四麻雀傑3'
      break
    case 10401:
      rankName = '四麻雀豪1'
      break
    case 10402:
      rankName = '四麻雀豪2'
      break
    case 10403:
      rankName = '四麻雀豪3'
      break
    case 10501:
      rankName = '四麻雀聖1'
      break
    case 10502:
      rankName = '四麻雀聖2'
      break
    case 10503:
      rankName = '四麻雀聖3'
      break
    case 10701:
      rankName = '四麻魂天Lv1'
      break
    case 20101:
      rankName = '三麻初心1'
      break
    case  20102:
      rankName = '三麻初心2'
      break
    case  20103:
      rankName = '三麻初心3'
      break
    case  20201:
      rankName = '三麻雀士1'
      break
    case  20202:
      rankName = '三麻雀士2'
      break
    case  20203:
      rankName = '三麻雀士3'
      break
    case  20301:
      rankName = '三麻雀傑1'
      break
    case  20302:
      rankName = '三麻雀傑2'
      break
    case  20303:
      rankName = '三麻雀傑3'
      break
    case  20401:
      rankName = '三麻雀豪1'
      break
    case  20402:
      rankName = '三麻雀豪2'
      break
    case  20403:
      rankName = '三麻雀豪3'
      break
    case  20501:
      rankName = '三麻雀聖1'
      break
    case  20502:
      rankName = '三麻雀聖2'
      break
    case  20503:
      rankName = '三麻雀聖3'
      break
    case  20701:
      rankName = '三麻魂天Lv1'
      break
  }

  return rankName
}
