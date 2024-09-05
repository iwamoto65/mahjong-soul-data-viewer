import { useState } from "react";

type PaifuUrl = string

interface ModeState {
  type: string;
  room: string;
  format: string;
  people: number;
};

type EndTimeState = string

interface GameMainStats {
  round: number;
  hule: number;
  liqi: number;
  unrong: number;
  chiPengGang: number;
  noTile: number;
};

interface GameRecordStats {
  finalPoint: number;
  gradingScore: number;
  place: number;
};

type RankLevel = string

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

interface UnrongStats {
  afterLiqi: number;
  unming: number;
  ming: number;
}

interface LiqiStats {
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

interface NoTileStats {
  afterLiqi: number;
  afterMing: number;
  tingpai: number;
}

interface UnzimoStats {
  parentCover: number;
  parentCoverScore: number;
}

type Scores = {
  player: string;
  scores: {
    [key: string]: number;
  }
}[] | [];

export interface GameLatestData {
  paifuUrl: PaifuUrl;
  modeState: ModeState;
  gameMainStats: GameMainStats;
  gameRecordStats: GameRecordStats;
  huleStats: HuleStats;
  unrongStats: UnrongStats;
  noTileStats: NoTileStats;
  liqiStats: LiqiStats;
  unzimoStats: UnzimoStats;
}

export const useGameLatest = () => {
  const [paifuUrl, setPaifuUrl] = useState<PaifuUrl>("");
  const [modeState, setModeState] = useState<ModeState>({
    type: "",
    room: "",
    format: "",
    people: 0,
  });
  const [endTimeState, setEndTimeState] = useState<EndTimeState>("")
  const [gameMainStats, setGameMainStats] = useState<GameMainStats>({
    round: 0,
    hule: 0,
    liqi: 0,
    unrong: 0,
    chiPengGang: 0,
    noTile: 0,
  });
  const [gameRecordStats, setGameRecordStats] = useState<GameRecordStats>({
    finalPoint: 0,
    gradingScore: 0,
    place: 0,
  });
  const [rankLevel, setRankLevel] = useState<RankLevel>("");
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
  const [unrongStats, setUnrongStats] = useState<UnrongStats>({
    afterLiqi: 0,
    unming: 0,
    ming: 0,
  })
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
  const [noTileStats, setNoTileStats] = useState<NoTileStats>({
    afterLiqi: 0,
    afterMing: 0,
    tingpai: 0
  })
  const [unzimoStats, setUnzimoStats] = useState<UnzimoStats>({ parentCover: 0, parentCoverScore: 0 })
  const [scores, setScores] = useState<Scores>([]);

  const setModeField = (field: keyof ModeState, value: string | number) => setField(setModeState, field, value);
  const setGameMainStatsField = (field: keyof GameMainStats, value: number) => setField(setGameMainStats, field, value);
  const setGameRecordField = (field: keyof GameRecordStats, value: number) => setField(setGameRecordStats, field, value);
  const setHuleStatsField = (field: keyof HuleStats, value: number) => setField(setHuleStats, field, value);
  const setUnrongStatsField = (field: keyof UnrongStats, value: number) => setField(setUnrongStats, field, value);
  const setLiqiStatsField = (field: keyof LiqiStats, value: number) => setField(setLiqiStats, field, value);
  const setNoTileStatsField = (field: keyof NoTileStats, value: number) => setField(setNoTileStats, field, value);
  const setUnzimoField = (field: keyof UnzimoStats, value: number) => setField(setUnzimoStats, field, value);

  return {
    paifuUrl,
    setPaifuUrl,
    modeState,
    setModeField,
    endTimeState,
    setEndTimeState,
    gameMainStats,
    setGameMainStatsField,
    gameRecordStats,
    setGameRecordField,
    rankLevel,
    setRankLevel,
    huleStats,
    setHuleStatsField,
    unrongStats,
    setUnrongStatsField,
    liqiStats,
    setLiqiStatsField,
    noTileStats,
    setNoTileStatsField,
    unzimoStats,
    setUnzimoField,
    scores,
    setScores,
  };
};

const setField = <T>(stateSetter: React.Dispatch<React.SetStateAction<T>>, field: keyof T, value: T[keyof T]) => {
  stateSetter(prevState => ({
    ...prevState,
    [field]: value
  }));
};
