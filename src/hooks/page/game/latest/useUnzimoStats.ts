import { useState } from "react";
import { setField } from './../../../../utils/state';

interface UnzimoStats {
  parentCover: number;
  parentCoverScore: number;
}

export const useUnzimoStats = () => {
  const [unzimoStats, setUnzimoStats] = useState<UnzimoStats>({ parentCover: 0, parentCoverScore: 0 })

  const setUnzimoField = (field: keyof UnzimoStats, value: number) => setField(setUnzimoStats, field, value);

  return { unzimoStats, setUnzimoField }
}
