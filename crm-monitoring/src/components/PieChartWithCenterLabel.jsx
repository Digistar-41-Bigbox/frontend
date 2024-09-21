import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { PieChart } from "@mui/x-charts/PieChart";
import { useDrawingArea } from "@mui/x-charts/hooks";
import { styled } from "@mui/material/styles";

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
  fontSize: 24,
  fontWeight: "bold",
}));

function PieCenterLabel({ total }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <>
      <StyledText x={left + width / 2} y={top + height / 2 - 10}>
        Total Customer
      </StyledText>
      <StyledNumberText x={left + width / 2} y={top + height / 2 + 20}>
        {total}
      </StyledNumberText>
    </>
  );
}

export default function PieChartWithCenterLabel() {
  const [data, setData] = useState([]);
  const [totalLeads, setTotalLeads] = useState(0);

  useEffect(() => {
    // Fetch data from API
    axios.get("https://backend-dev-eosin.vercel.app/api/v1/lead/get-total-lead-status")
      .then((response) => {
        const apiData = response.data.data;
        const chartData = [
          { value: apiData.Hot, label: "Hot", color: "#F54A45" }, // Red for Hot
          { value: apiData.Warm, label: "Warm", color: "#FAB000" }, // Orange for Warm
          { value: apiData.Cold, label: "Cold", color: "#0549CF" }, // Blue for Cold
        ];
        setData(chartData);
        setTotalLeads(apiData.Total); // Set the total leads count
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  return (
    <PieChart
      series={[
        {
          data,
          innerRadius: 80,
          color: ["#F54A45", "#FAB000", "#0549CF"],
        },
      ]}
      {...size}
    >
      <PieCenterLabel total={totalLeads} />
    </PieChart>
  );
}
