import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import DescriptionIcon from "@mui/icons-material/Description";
import { GameLatestConfirmModal as ConfirmModal } from "@/components/game/latest/ConfirmModal";
import type { GameLatestData } from "@/hooks/page/game/latest/useGameLatest";

export const GameLatestSheet = ({
  paifuUrl,
  modeState,
  gameMainStats,
  gameRecordStats,
  huleStats,
  unrongStats,
  noTileStats,
  liqiStats,
  unzimoStats,
}: GameLatestData) => {
  const [sheetId, setSheetId] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalState, setModalState] = useState<"success" | "failure" | "loading">("loading");
  const { status } = useSession();

  const outputSheet = async () => {
    if (status !== "authenticated") {
      signIn("google");
      return;
    }

    try {
      setIsModalOpen(true);

      const data: (string | number)[][] = buildSheetData({
        paifuUrl,
        modeState,
        gameMainStats,
        gameRecordStats,
        huleStats,
        unrongStats,
        noTileStats,
        liqiStats,
        unzimoStats,
      });
      const response = await fetch("/api/google/sheets/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data }),
      });
      checkResponse(response);

      const result = await response.json();
      if (result) {
        setSheetId(result.sheetId);
        setModalState("success");
      }
    } catch (error) {
      setModalState("failure");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalState("loading");
  };

  return (
    <div className="hoge absolute right-0 top-0">
      <DescriptionIcon onClick={() => outputSheet()} className="cursor-pointer" style={{ fontSize: 26, color: "#4CAF50" }} />
      <ConfirmModal modalState={modalState} isModalOpen={isModalOpen} closeModal={closeModal} sheetId={sheetId} />
    </div>
  );
};

const buildSheetData = ({
  paifuUrl,
  modeState,
  gameMainStats,
  gameRecordStats,
  huleStats,
  unrongStats,
  noTileStats,
  liqiStats,
  unzimoStats,
}: GameLatestData) => {
  return [
    ["牌譜URL", paifuUrl],
    ["対局モード", modeState.type + modeState.room],
    ["局数", modeState.format],
    ["人数", modeState.people],
    ["総局数", gameMainStats.round],
    ["順位", gameRecordStats.place],
    ["点数", gameRecordStats.finalPoint],
    ["和了", gameMainStats.hule],
    ["放銃", gameMainStats.unrong],
    ["立直ツモ", huleStats.zimoWithLiqi],
    ["黙聴ツモ", huleStats.zimoWithUnliqiUnming],
    ["副露ツモ", huleStats.zimoWithMing],
    ["立直ロン", huleStats.rongWithLiqi],
    ["黙聴ロン", huleStats.rongWithUnliqiUnming],
    ["副露ロン", huleStats.rongWithMing],
    ["放銃", gameMainStats.unrong],
    ["立直時被ロン", unrongStats.afterLiqi],
    ["黙聴時被ロン", unrongStats.unming],
    ["副露時被ロン", unrongStats.ming],
    ["立直", gameMainStats.liqi],
    ["和了", huleStats.liqi],
    ["放銃", unrongStats.afterLiqi],
    ["流局", noTileStats.afterLiqi],
    ["収入", liqiStats.income],
    ["支出", liqiStats.expenditure],
    ["収支", liqiStats.incomeAndExpenditure],
    ["先制", liqiStats.preemption],
    ["追っかけ", liqiStats.chasing],
    ["追っかけられ", liqiStats.chased],
    ["良型", liqiStats.goodShape],
    ["愚形", liqiStats.badShape],
    ["振聴", liqiStats.zhenting],
    ["一発", liqiStats.firstTurnHule],
    ["裏ドラ回数", liqiStats.dora],
    ["副露", gameMainStats.chiPengGang],
    ["和了", huleStats.ming],
    ["放銃", unrongStats.ming],
    ["流局", noTileStats.afterMing],
    ["流局", gameMainStats.noTile],
    ["流局聴牌", noTileStats.tingpai],
    ["親被り", unzimoStats.parentCover],
    ["親被り点数", unzimoStats.parentCoverScore],
  ];
};

const checkResponse = (res: Response) => {
  if (!res.ok) {
    throw new Error("Google Sheetsの出力に失敗しました。");
  }
};
