import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import zoomPlugin from "chartjs-plugin-zoom";
import { subDays, format } from "date-fns";
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

  // const calculateCumulativeSum = (e: any) => {
  //   const xScale = e.chart.scales.x as any; // Cast to any type for easier access
  //   const yData = e.chart.data.datasets[0].data as number[];

  //   // Get the indices of the visible X-axis range
  //   const minIndex = Math.floor(xScale.min);
  //   const maxIndex = Math.ceil(xScale.max);

  //   // Ensure indices are within valid range
  //   const validMinIndex = Math.max(0, minIndex);
  //   const validMaxIndex = Math.min(yData.length - 1, maxIndex);

  //   // Calculate the sum of Y values in the visible range
  //   const sum = yData.slice(validMinIndex, validMaxIndex + 1)
  //     .reduce((acc, val) => acc + (typeof val === 'number' ? val : 0), 0);

  //   setCumulativeSum(sum);
  // };

  const lineOptions: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 40,
        bottom: 40,
        left: 30,
        right: 30,
      },
    },
    scales: {
      x: {
        type: "category",
        ticks: {
          padding: 10,
        },
      },
      y: {
        ticks: {
          padding: 10,
        },
      },
    },
    plugins: {
      zoom: {
        zoom: {
          wheel: {
            enabled: true,
          },
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
        <LineChartContainer>
          <Title>Asset Change Over Time</Title>
          {lineData && <Line data={lineData} options={lineOptions} />}
        </LineChartContainer>
      </ChartsContainer>
      <CumulativeSum>
        Cumulative Sum of Visible Data: {cumulativeSum}
      </CumulativeSum>
    </PageContainer>
  );
};

export default AssetsPage;
