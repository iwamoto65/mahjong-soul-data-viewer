import { useState } from "react";
import { setField } from './../../../../utils/state';

export interface LiqiStats {
  income: number;
  expenditure: number;
  incomeAndExpenditure: number;
  preemption: number;
  chasing: number;
  chased: number;
  goodShape: number;
  badShape: number;
  zhenting: number;
  firstTurnHule: number;
  dora: number;
};

export const useLiqiStats = () => {
  const [liqiStats, setLiqiStats] = useState<LiqiStats>({
    income: 0,
    expenditure: 0,
    incomeAndExpenditure: 0,
    preemption: 0,
    chasing: 0,
    chased: 0,
    goodShape: 0,
    badShape: 0,
    zhenting: 0,
    firstTurnHule: 0,
    dora: 0,
  });

  const setLiqiStatsField = (field: keyof LiqiStats, value: number) => setField(setLiqiStats, field, value);

  return { liqiStats, setLiqiStatsField }
}
