import { useState } from "react";
import { setField } from './../../../../utils/state';

interface GameRecordStats {
  finalPoint: number;
  gradingScore: number;
  place: number;
};

export const useGameRecordStats = () => {
  const [gameRecordStats, setGameRecordStats] = useState<GameRecordStats>({
    finalPoint: 0,
    gradingScore: 0,
    place: 0,
  });

  const setGameRecordField = (field: keyof GameRecordStats, value: number) => setField(setGameRecordStats, field, value);

  return { gameRecordStats, setGameRecordField }
}
