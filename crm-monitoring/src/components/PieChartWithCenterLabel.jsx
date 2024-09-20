import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { useDrawingArea } from "@mui/x-charts/hooks";
import { styled } from "@mui/material/styles";

const data = [
  { value: 5, label: "Hot", color: "#F54A45" }, // Merah untuk Hot
  { value: 10, label: "Warm", color: "#FAB000" }, // Oranye untuk Warm
  { value: 15, label: "Cold", color: "#0549CF" }, // Biru untuk Cold
];

const size = {
  width: 400,
  height: 220,
};

const StyledText = styled("text")(({ theme }) => ({
  fill: "gray",
  textAnchor: "middle",
  dominantBaseline: "central",
  fontSize: 20,
}));
const StyledNumberText = styled("text")(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: "middle",
  dominantBaseline: "central",
  fontSize: 24, // Lebih besar untuk jumlah leads
  fontWeight: "bold",
}));

function PieCenterLabel({ total }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <>
      {/* Teks untuk "Total Leads" */}
      <StyledText x={left + width / 2} y={top + height / 2 - 10}>
        Total Customer
      </StyledText>
      {/* Teks untuk jumlah total leads */}
      <StyledNumberText x={left + width / 2} y={top + height / 2 + 20}>
        {total}
      </StyledNumberText>
    </>
  );
}

export default function PieChartWithCenterLabel() {
  // Hitung total leads
  const totalLeads = data.reduce((acc, item) => acc + item.value, 0);

  return (
    <PieChart
      series={[
        {
          data,
          innerRadius: 80,
          color: ["#FF0000", "#FFA500", "#0000FF"],
        },
      ]}
      {...size}
    >
      <PieCenterLabel total={totalLeads} />
    </PieChart>
  );
}
