import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

const ColumnChart = ({ chartData, chartOptions }) => {
  const [state, setState] = useState({
    chartData: [],
    chartOptions: {}
  });

  useEffect(() => {
    setState({
      chartData: chartData,
      chartOptions: chartOptions
    });
  }, [chartData, chartOptions]);

  return (
    <Chart
      options={state.chartOptions}
      series={state.chartData}
      type='bar'
      width='100%'
      height='100%'
    />
  );
};

export default ColumnChart;
