import { useState } from "react";

type PaifuUrl = string

type EndTimeState = string

type RankLevel = string

type Scores = {
  player: string;
  scores: {
    [key: string]: number;
  }
}[] | [];

export const useGameMeta = () => {
  const [paifuUrl, setPaifuUrl] = useState<PaifuUrl>("");
  const [endTimeState, setEndTimeState] = useState<EndTimeState>("")
  const [rankLevel, setRankLevel] = useState<RankLevel>("");
  const [scores, setScores] = useState<Scores>([]);

  return {
    paifuUrl,
    setPaifuUrl,
    endTimeState,
    setEndTimeState,
    rankLevel,
    setRankLevel,
    scores,
    setScores,
  };
};
