import { Line } from "react-chartjs-2";
import { LineChartContainer } from "./styles";
import { format } from "date-fns";
import zoomPlugin from "chartjs-plugin-zoom";
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

interface AssetsChartProps {
  lineData: any;
  onZoomChange: (zoomRange: string) => void;
  setCumulativeSum: (sum: number) => void;
}

export default function AssetsChart(props: AssetsChartProps) {
  const { lineData, onZoomChange, setCumulativeSum } = props;

  const handleZoomComplete = (e: any) => {
    const xScale = e.chart.scales.x as any;
    const rawData = e.chart.data.datasets[0].data as {
      deposit: number;
      withdrawal: number;
      balance: number;
    }[];
    const labels = e.chart.data.labels as string[];

    const minIndex = Math.floor(xScale.min);
    const maxIndex = Math.ceil(xScale.max);
    const validMinIndex = Math.max(0, minIndex);
    const validMaxIndex = Math.min(rawData.length - 1, maxIndex);

    // 선택된 구간의 출금액 합계 계산
    const withdrawalSum = lineData.datasets[0].data
      .slice(validMinIndex, validMaxIndex + 1)
      .reduce((acc: any, val: any) => acc + (val.withdrawal || 0), 0);

    // 출금액 합계를 상위 컴포넌트에 전달 (100원 단위로 반올림)
    setCumulativeSum(Math.round(withdrawalSum / 100) * 100);

    const minDate = format(new Date(labels[validMinIndex]), "M월 dd일");
    const maxDate = format(new Date(labels[validMaxIndex]), "M월 dd일");
    const newZoomRange = `${minDate}부터 ${maxDate}까지`;

    onZoomChange(newZoomRange);
  };

  // 데이터 변환: 잔액만 표시하도록 수정
  const chartData = lineData
    ? {
        ...lineData,
        datasets: [
          {
            label: "계좌 잔액",
            data: lineData.datasets[0].data.map((item: any) => item.balance),
            fill: true,
            borderColor: "#2A9D8F",
            backgroundColor: "rgba(42, 157, 143, 0.3)",
            tension: 0.5,
          },
        ],
      }
    : null;

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
          callback: (value, index) => {
            const date = new Date(lineData.labels[index]);
            return format(date, "M월 dd일");
          },
        },
      },
      y: {
        ticks: {
          callback: (value) => {
            return value.toLocaleString() + "원";
          },
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
          onZoomComplete: handleZoomComplete,
        },
        pan: {
          enabled: true,
          mode: "x",
        },
      },
      tooltip: {
        displayColors: false,
        callbacks: {
          title: (context) => {
            const date = new Date(lineData.labels[context[0].dataIndex]);
            return format(date, "M월 dd일");
          },
          label: (context) => {
            const dataIndex = context.dataIndex;
            const originalData = lineData.datasets[0].data[dataIndex];

            return [
              `잔액: ${originalData.balance.toLocaleString()} 원`,
              `입금액: ${originalData.deposit.toLocaleString()} 원`,
              `출금액: ${originalData.withdrawal.toLocaleString()} 원`,
            ];
          },
        },
      },
    },
    animation: {
      duration: 1500,
      easing: "easeInOutQuad",
    },
  };

  return (
    <LineChartContainer>
      {chartData && <Line data={chartData} options={lineOptions} />}
    </LineChartContainer>
  );
}
