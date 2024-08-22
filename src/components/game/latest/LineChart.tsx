import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

type GameLatestLineChartProps = {
  roundCount: number;
  noTileCount: number;
  scores: Scores;
};

type Scores =
  | {
      player: string;
      scores: {
        [key: string]: number;
      };
    }[]
  | [];

type FixedScores = {
  player: string;
  score: number[];
}[];

export const GameLatestLineChart = ({ roundCount, noTileCount, scores }: GameLatestLineChartProps) => {
  const fixedScores: FixedScores = scores.map(({ player, scores }) => {
    const scoresArray = Object.entries(scores);
    const sortedScores = scoresArray.sort((a, b) => parseInt(a[0]) - parseInt(b[0])).map((s) => s[1]);
    return { player: player, score: sortedScores };
  });
  const roundTitles = identifyRoundTitleFromNumber(scores);
  const data = setChartData({ roundTitles, fixedScores });
  const scaleYScores = adjustRangeToNearestFiveThousand(fixedScores);
  const options = setChartOption({ roundCount, noTileCount, scaleYScores });

  return <Line data={data} options={options} width={650} height={325} />;
};

const adjustRangeToNearestFiveThousand = (fixedScores: FixedScores) => {
  const combinedScores = fixedScores.flatMap((fixedScore) => fixedScore.score);
  const minScore = Math.min(...combinedScores);
  const adjustMinScore = minScore == 0 ? 0 : Math.ceil(minScore / 5000 - 1) * 5000;
  const maxScore = Math.max(...combinedScores);
  const adjustMaxScore = Math.ceil(maxScore / 5000) * 5000;

  return { min: adjustMinScore, max: adjustMaxScore };
};

const identifyRoundTitleFromNumber = (scores: Scores) => {
  type Chang = "東" | "南" | "西";
  type Ju = "1" | "2" | "3" | "4";

  const chang: Chang[] = ["東", "南", "西"];
  const ju: Ju[] = ["1", "2", "3", "4"];
  // scoreオブジェクトの順番を000から始まるように並び替える。（何も操作しないと自動で100から始まってしまう）
  // 999のobjは必要ないので排除する。
  const roundNumbers = [...new Set(scores.flatMap(({ scores }) => Object.keys(scores)))].sort((a, b) => Number(a) - Number(b)).filter((a) => a !== "999");
  const roundTitles = roundNumbers.map((roundNumber) => {
    const numbers: number[] = roundNumber.split("").map(Number);
    const [changNum, juNum, benNum] = [...numbers];

    return `${chang[changNum]}${ju[juNum]}局${benNum}本場`;
  });

  return roundTitles;
};

type ChartData = {
  roundTitles: string[];
  fixedScores: { player: string; score: number[] }[];
};

type ChartDataResponse = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
  }[];
};

const setChartData = ({ roundTitles, fixedScores }: ChartData): ChartDataResponse => {
  return {
    // 東1局は25000で固定かつラベルが必要ないので"""を入れている。
    labels: ["", ...roundTitles],
    datasets: [
      {
        label: fixedScores[0]?.player,
        data: fixedScores[0]?.score,
        borderColor: "rgb(255, 127, 127)",
        backgroundColor: "rgba(255, 127, 127, 0.5)",
      },
      {
        label: fixedScores[1]?.player,
        data: fixedScores[1]?.score,
        borderColor: "rgb(127, 191, 255)",
        backgroundColor: "rgba(127, 191, 255, 0.5)",
      },
      {
        label: fixedScores[2]?.player,
        data: fixedScores[2]?.score,
        borderColor: "rgb(52, 183, 142)",
        backgroundColor: "rgba(52, 183, 142, 0.5)",
      },
      {
        label: fixedScores[3]?.player,
        data: fixedScores[3]?.score,
        borderColor: "rgb(255, 191, 127)",
        backgroundColor: "rgba(255, 191, 127, 0.5)",
      },
    ],
  };
};

type ChartOption = {
  roundCount: number;
  noTileCount: number;
  scaleYScores: { min: number; max: number };
};

type ChartOptionResponse = {
  responsive: boolean;
  plugins: {
    legend: {
      position: "top";
      labels: {
        boxWidth: number;
      };
    };
    title: {
      display: boolean;
      text: string;
      padding: {
        top: number;
        bottom: number;
      };
      font: {
        size: number;
      };
    };
  };
  scales: {
    x: {
      title: {
        display: boolean;
        text: string;
      };
    };
    y: {
      min: number;
      max: number;
      title: {
        display: boolean;
        text: string;
      };
    };
  };
};

const setChartOption = ({ roundCount, noTileCount, scaleYScores }: ChartOption): ChartOptionResponse => {
  return {
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
        min: scaleYScores.min,
        max: scaleYScores.max,
        title: {
          display: true,
          text: "得点",
        },
      },
    },
  };
};
