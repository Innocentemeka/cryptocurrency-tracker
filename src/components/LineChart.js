import { useEffect, useState } from "react";
import Chart from "react-google-charts";

const LineChart = ({ dataHistory }) => {
  const [data, setData] = useState([["Date", "Prices"]]);

  useEffect(() => {
    let dataCopy = [["Date", "Prices"]];
    if (dataHistory.prices) {
      dataHistory.prices.map((item) => {
      return  dataCopy.push([
          `${new Date(item[0]).toLocaleDateString().slice(0, -5)}`,
          item[1],
        ]);
      });

      setData(dataCopy);
    }
  }, [dataHistory]);

  return <Chart chartType="LineChart" data={data} height="100%" legendToggle />;
};

export default LineChart;
