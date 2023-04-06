import db from '../../firebase'
import { doc, setDoc } from 'firebase/firestore'
import type { PlayerResult } from './distributeData'

export const sendGameResult = (result: PlayerResult) => {
  const docRef = doc(db, 'paifu', result.uuid)
  setDoc(docRef, result)
}
