import db from '../../firebase'
import { doc, setDoc } from 'firebase/firestore'
import type { PlayerResult } from './distributeDataType'

export const sendGameResult = async (result: PlayerResult) => {
  let res: { status: 'ok' | 'failed' } = { status: 'failed' }
  const docRef = doc(db, 'paifu', result.uuid)

  await setDoc(docRef, result)
    .then(() => res = { status: 'ok' })
    .catch(() => res = { status: 'failed' })

  return res
}
