import { useState } from "react";
import { setField } from './../../../../utils/state';

export interface NoTileStats {
  afterLiqi: number;
  afterMing: number;
  tingpai: number;
}

export const useNoTileStats = () => {
  const [noTileStats, setNoTileStats] = useState<NoTileStats>({
    afterLiqi: 0,
    afterMing: 0,
    tingpai: 0
  })

  const setNoTileStatsField = (field: keyof NoTileStats, value: number) => setField(setNoTileStats, field, value);

  return { noTileStats, setNoTileStatsField }
}
