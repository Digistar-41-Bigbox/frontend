import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const CustomLineChart = () => {
  // Data untuk chart
  const [series, setSeries] = useState([
    {
      name: "Cool ",
      data: [30, 40, 50, 60, 70, 80, 90, 100], // Data untuk "Cool"
    },
    {
      name: "Warm ",
      data: [20, 25, 30, 35, 40, 45, 50, 55], // Data untuk "Warm"
    },
    {
      name: "Hot ",
      data: [10, 20, 25, 30, 35, 40, 45, 50], // Data untuk "Hot"
    },
  ]);

  // Opsi untuk konfigurasi chart
  const [options, setOptions] = useState({
    chart: {
      height: 350,
      type: "area",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      type: "datetime",
      categories: [
        "2024-02-11T00:00:00.000Z",
        "2024-02-13T00:00:00.000Z",
        "2024-02-15T00:00:00.000Z",
        "2024-02-17T00:00:00.000Z",
        "2024-02-19T00:00:00.000Z",
        "2024-02-21T00:00:00.000Z",
        "2024-02-23T00:00:00.000Z",
        "2024-02-25T00:00:00.000Z",
      ],
    },
    tooltip: {
      x: {
        format: "dd MMM yyyy",
      },
    },
    colors: ["#0549CF", "#FAB000", "#F54A45"], // Warna untuk cool, warm, dan hot
    legend: {
      position: "bottom",
      horizontalAlign: "center",
      fontSize: "16px",
      labels: {
        colors: "#000",
      },
    },
  });

  return (
    <div className="chart-container" style={{ width: "100%", height: "400px" }}>
      <ReactApexChart
        options={options}
        series={series}
        type="area"
        height={350}
      />
    </div>
  );
};

export default CustomLineChart;
