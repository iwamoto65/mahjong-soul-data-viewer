"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { distributeData } from "@/features/distributeData";
import { CulcHuleRate } from "@/hooks/useHuleRate";
import { CulcUnrongRate } from "@/hooks/useUnrongRate";
import { CulcChiPengGangRate } from "@/hooks/useChiPengGangRate";
import { GameLatestCard } from "@/components/game/latest/card";

export default function GameLatestPage() {
  const [totalRoundCount, setTotalRoundCount] = useState<number>(0);
  const [totalHuleCount, setTotalHuleCount] = useState<number>(0);
  const [totalUnrongCount, setTotalUnrongCount] = useState<number>(0);
  const [totalChiPengGangCount, setTotalChiPengGangCount] = useState<number>(0);
  const [totalNoTileCount, setTotalNoTileCount] = useState<number>(0);

  useEffect(() => {
    const storageData: string | null = window.localStorage.getItem("mahjongsoulpaifu");
    if (typeof storageData != "string") return;
    const paifuResult = distributeData(storageData);
    setTotalRoundCount(paifuResult.totalRound);
    setTotalHuleCount(paifuResult.hule.length);
    setTotalUnrongCount(paifuResult.unrong.total);
    setTotalChiPengGangCount(paifuResult.chiPengGang);
    setTotalNoTileCount(paifuResult.noTile.total);
  }, []);

  return (
    <>
      <section className="flex justify-center">
        <div className="m-10 p-10 rounded-lg bg-white min-w-7/12">
          <div className="flex justify-between">
            <h1 className="m-0 text-xl font-bold" style={{ color: "#00002A" }}>
              最新対局
              <span className="ml-4">2022/01/01 12:33</span>
            </h1>
            <Link href="https://game.mahjongsoul.com/?paipu=230507-09a9caa7-073e-46c1-b6d0-afdce819901a_a419341639" target="_blank" rel="noopener noreferrer">
              <div className="flex">
                <p className="text-xl" style={{ color: "#00002A" }}>
                  牌譜
                </p>
                <svg
                  style={{ width: "26px", height: "26px" }}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                  />
                </svg>
              </div>
            </Link>
          </div>

          <div className="flex flex-row space-x-10 mt-10">
            <div className="basis-1/3">
              <GameLatestCard title="和了" result={CulcHuleRate(totalRoundCount, totalHuleCount)} totalCount={totalHuleCount} totalRound={totalRoundCount} />
            </div>
            <div className="basis-1/3">
              <GameLatestCard
                title="放銃"
                result={CulcUnrongRate(totalRoundCount, totalUnrongCount)}
                totalCount={totalUnrongCount}
                totalRound={totalRoundCount}
              />
            </div>
            <div className="basis-1/3">
              <GameLatestCard
                title="副露"
                result={CulcChiPengGangRate(totalRoundCount, totalChiPengGangCount)}
                totalCount={totalChiPengGangCount}
                totalRound={totalRoundCount}
              />
            </div>
          </div>

          <div className="flex flex-row space-x-10 mt-10">
            <div className="basis-8/12">
              <h1 className="m-0 text-xl font-bold" style={{ color: "#00002A" }}>
                得点推移
              </h1>
              <LineChart roundCount={totalRoundCount} noTileCount={totalNoTileCount} />
            </div>
            <div className="basis-4/12">
              <h1 className="m-0 text-xl font-bold" style={{ color: "#00002A" }}>
                対局結果
              </h1>
              <div className="grid grid-cols-2 gap-y-8 mt-10">
                <p className="text-xl">部屋</p>
                <p className="text-right text-xl">玉の間</p>
                <p className="text-xl">段位</p>
                <p className="text-right text-xl">雀豪</p>
                <p className="text-xl">順位</p>
                <p className="text-right text-xl">1位</p>
                <p className="text-xl">最終持ち点</p>
                <p className="text-right text-xl">54,000</p>
                <p className="text-xl">獲得ポイント</p>
                <p className="text-right text-xl">220</p>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <Tabs>
              <TabList>
                <Tab>和了</Tab>
                <Tab>放銃</Tab>
              </TabList>

              <TabPanel className="grid grid-cols-5 grid-rows-3 grid-flow-row gap-x-12 text-base">
                <div className="flex justify-between">
                  <p>和了率</p>
                  <p>24.07%</p>
                </div>
              </TabPanel>
              <TabPanel className="grid grid-cols-4 grid-rows-3 grid-flow-row text-base">
                <p>aaaaa</p>
              </TabPanel>
            </Tabs>
          </div>
        </div>
      </section>
    </>
  );
}

const LineChart = ({ roundCount, noTileCount }: { roundCount: number; noTileCount: number }) => {
  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

  const data = {
    labels: ["東1", "2", "3", "", "南1", "2", "3"],
    datasets: [
      {
        label: "Aさん",
        data: [25000, 27900, 30000, 14000, 20000, 1000, -1000],
        borderColor: "rgb(255, 127, 127)",
        backgroundColor: "rgba(255, 127, 127, 0.5)",
      },
      {
        label: "Bさん",
        data: [25000, 17900, 30000, 20000, 10000, 0, 1000],
        borderColor: "rgb(127, 191, 255)",
        backgroundColor: "rgba(127, 191, 255, 0.5)",
      },
      {
        label: "Cさん",
        data: [25000, 10000, 20000, 30000, 10000, 5000, 15000],
        borderColor: "rgb(52, 183, 142)",
        backgroundColor: "rgba(52, 183, 142, 0.5)",
      },
      {
        label: "Dさん",
        data: [25000, 900, 4000, 5000, 33000, 33000, 24000],
        borderColor: "rgb(255, 191, 127)",
        backgroundColor: "rgba(255, 191, 127, 0.5)",
      },
    ],
  };

  const options = {
    responsive: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          boxWidth: 12,
        },
      },
      title: {
        display: true,
        text: `総局数 ${roundCount} （流局数 ${noTileCount}）`,
        padding: {
          top: 15,
          bottom: 15,
        },
        font: {
          size: 16,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "局",
        },
      },
      y: {
        min: -1000,
        max: 35000,
        title: {
          display: true,
          text: "得点",
        },
      },
    },
  };

  return <Line data={data} options={options} width={650} height={325} />;
};
