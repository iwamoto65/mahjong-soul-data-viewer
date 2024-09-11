import { useState } from "react";
import { setField } from './../../../../utils/state';

interface HuleStats {
  liqi: number;
  zimoWithLiqi: number;
  rongWithLiqi: number;
  zimoWithUnliqiUnming: number;
  rongWithUnliqiUnming: number;
  ming: number;
  zimoWithMing: number;
  rongWithMing: number;
};

export const useHuleStats = () => {
  const [huleStats, setHuleStats] = useState<HuleStats>({
    liqi: 0,
    zimoWithLiqi: 0,
    rongWithLiqi: 0,
    zimoWithUnliqiUnming: 0,
    rongWithUnliqiUnming: 0,
    ming: 0,
    zimoWithMing: 0,
    rongWithMing: 0,
  });

  const setHuleStatsField = (field: keyof HuleStats, value: number) => setField(setHuleStats, field, value);

  return { huleStats, setHuleStatsField }
}
