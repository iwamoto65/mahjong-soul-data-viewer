import { useState } from "react";
import { setField } from './../../../../utils/state';

export interface UnrongStats {
  afterLiqi: number;
  unming: number;
  ming: number;
}

export const useUnrongStats = () => {
  const [unrongStats, setUnrongStats] = useState<UnrongStats>({
    afterLiqi: 0,
    unming: 0,
    ming: 0,
  })

  const setUnrongStatsField = (field: keyof UnrongStats, value: number) => setField(setUnrongStats, field, value);

  return { unrongStats, setUnrongStatsField }
}
