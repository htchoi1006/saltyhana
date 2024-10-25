import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import zoomPlugin from "chartjs-plugin-zoom";
import { subDays, format } from "date-fns";
import character from "../../images/personal_asset_character.svg";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title as ChartTitle,
  Filler,
  ChartOptions,
} from "chart.js";

import {
  Account,
  AssetDescription,
  AssetDiv,
  AssetGuideDiv,
  AssetTitle,
  CharacterIcon,
  ChartsContainer,
  CumulativeSum,
  LineChartContainer,
  PageContainer,
  Title,
} from "./styles";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartTitle,
  Filler,
  zoomPlugin,
);

const AssetsPage: React.FC = () => {
  const [lineData, setLineData] = useState<any>(null);
  const [cumulativeSum, setCumulativeSum] = useState<number>(0);
  const [zoomedRange, setZoomedRange] = useState<string>(""); // 기간을 저장하는 state 추가

  const generateLineData = () => {
    let labels = [];
    let endDate = new Date();
    let startDate = subDays(endDate, 30);

    const diffDays = Math.ceil(
      (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24),
    );
    labels = Array.from({ length: diffDays }, (_, i) =>
      format(subDays(endDate, diffDays - i - 1), "MMM dd"),
    );

    const data = labels.map(() => Math.floor(Math.random() * 1000));
    const sum = data.reduce((a, b) => a + b, 0);
    setCumulativeSum(sum);

    const minDate = format(new Date(labels[0]), "M월 dd일");
    const maxDate = format(new Date(labels[labels.length - 1]), "M월 dd일");
    setZoomedRange(`${minDate}부터 ${maxDate}까지`);

    return {
      labels,
      datasets: [
        {
          label: "Asset Change",
          data: data,
          fill: true,
          borderColor: "#2A9D8F",
          backgroundColor: "rgba(42, 157, 143, 0.3)",
        },
      ],
    };
  };

  const lineOptions: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        bottom: 20,
        left: 10,
        right: 10,
      },
    },
    scales: {
      x: {
        type: "category",
        ticks: {
          padding: 5,
        },
      },
      y: {
        ticks: {
          padding: 5,
        },
      },
    },
    plugins: {
      zoom: {
        zoom: {
          drag: {
            enabled: true,
            backgroundColor: "rgba(42, 157, 143, 0.2)",
            borderColor: "rgba(42, 157, 143, 1)",
          },
          mode: "x",
          onZoomComplete: (e) => {
            const xScale = e.chart.scales.x as any;
            const yData = e.chart.data.datasets[0].data as number[];
            const labels = e.chart.data.labels as string[];

            const minIndex = Math.floor(xScale.min);
            const maxIndex = Math.ceil(xScale.max);

            const validMinIndex = Math.max(0, minIndex);
            const validMaxIndex = Math.min(yData.length - 1, maxIndex);

            const sum = yData
              .slice(validMinIndex, validMaxIndex + 1)
              .reduce(
                (acc, val) => acc + (typeof val === "number" ? val : 0),
                0,
              );

            setCumulativeSum(sum);

            // 한국어 형식으로 기간을 출력
            const minDate = format(new Date(labels[validMinIndex]), "M월 dd일");
            const maxDate = format(new Date(labels[validMaxIndex]), "M월 dd일");
            setZoomedRange(`${minDate}부터 ${maxDate}까지`);
          },
        },
        pan: {
          enabled: true,
          mode: "x",
        },
      },
    },
  };

  useEffect(() => {
    const newData = generateLineData();
    setLineData(newData);
  }, []);

  return (
    <PageContainer>
      <Account accountNumber={"352-000-0000-01"} balance={2005333} />
      <ChartsContainer>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginRight: "auto",
          }}
        >
          <AssetDiv>
            <CharacterIcon src={character} />
            <AssetGuideDiv>
              <AssetTitle>돈을 얼마나 썼을까?</AssetTitle>
              <AssetDescription>
                확인하고 싶은 기간을 드래그하여 지출 금액을 확인하세요!
              </AssetDescription>
              <CumulativeSum>
                {zoomedRange} 총 {cumulativeSum.toLocaleString()}원을 쓰셨네요
              </CumulativeSum>
            </AssetGuideDiv>
          </AssetDiv>
        </div>
        <LineChartContainer>
          <Title></Title>
          {lineData && <Line data={lineData} options={lineOptions} />}
        </LineChartContainer>
      </ChartsContainer>
    </PageContainer>
  );
};

export default AssetsPage;
