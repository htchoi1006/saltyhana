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
  onZoomChange: (zoomRange: string) => void; // 줌 범위를 상위 컴포넌트에 전달하는 핸들러
  setCumulativeSum: (sum: number) => void; // 누적 합계를 업데이트하는 핸들러
}

export default function AssetsChart(props: AssetsChartProps) {
  const { lineData, onZoomChange, setCumulativeSum } = props;

  const handleZoomComplete = (e: any) => {
    const xScale = e.chart.scales.x as any;
    const yData = e.chart.data.datasets[0].data as number[];
    const labels = e.chart.data.labels as string[];

    const minIndex = Math.floor(xScale.min);
    const maxIndex = Math.ceil(xScale.max);
    const validMinIndex = Math.max(0, minIndex);
    const validMaxIndex = Math.min(yData.length - 1, maxIndex);
    const sum = yData
      .slice(validMinIndex, validMaxIndex + 1)
      .reduce((acc, val) => acc + (typeof val === "number" ? val : 0), 0);

    // 상위 컴포넌트의 누적 합계 상태 업데이트
    setCumulativeSum(sum);

    const minDate = format(labels[validMinIndex], "M월 dd일");
    const maxDate = format(labels[validMaxIndex], "M월 dd일");
    const newZoomRange = `${minDate}부터 ${maxDate}까지`;

    // 상위 컴포넌트의 줌 범위 상태 업데이트
    onZoomChange(newZoomRange);
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
          callback: (value, index) => {
            // x축 레이블 포맷
            const date = new Date(lineData.labels[index]);
            return format(date, "M월 dd일");
            // return index % 2 === 0 ? format(new Date(lineData.labels[index]), "M월 dd일") : "";
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
    },
    animation: {
      duration: 1500,
      easing: "easeInOutQuad",
    },
  };

  return (
    <LineChartContainer>
      {lineData && <Line data={lineData} options={lineOptions} />}
    </LineChartContainer>
  );
}
