import { useState } from "react";
import { setField } from './../../../../utils/state';

interface GameMainStats {
  round: number;
  hule: number;
  liqi: number;
  unrong: number;
  chiPengGang: number;
  noTile: number;
};

export const useGameMainStats = () => {
  const [gameMainStats, setGameMainStats] = useState<GameMainStats>({
    round: 0,
    hule: 0,
    liqi: 0,
    unrong: 0,
    chiPengGang: 0,
    noTile: 0,
  });

  const setGameMainStatsField = (field: keyof GameMainStats, value: number) => setField(setGameMainStats, field, value);

  return { gameMainStats, setGameMainStatsField }
}
