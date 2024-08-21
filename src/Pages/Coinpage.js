import "./Coinpage.css";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CoinContext } from "../components/Context";
import LineChart from "../components/LineChart";

const Coinpage = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const { currency } = useContext(CoinContext);
  const [dataHistory, setDataHistory] = useState();

  const fetchData = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-CHCbLEwmkZG8ztm2ivPtE9yh",
      },
    };

    fetch(`https://api.coingecko.com/api/v3/coins/${id}`, options)
      .then((response) => response.json())
      .then((response) => setData(response))
      .catch((err) => console.error(err));
  };

  const fetchDataHistory = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-CHCbLEwmkZG8ztm2ivPtE9yh",
      },
    };

    fetch(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`,
      options
    )
      .then((response) => response.json())
      .then((response) => setDataHistory(response))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchData();
    fetchDataHistory();
  }, [currency]);

  if (data && dataHistory) {
    return (
      <div className="coin">
        <div className="coin-name">
          <img src={data.image.large} alt="coin-image" />
          <p>
            <b>
              {data.name} ({data.symbol.toUpperCase()})
            </b>
          </p>
        </div>
        <div className="coin-chart">
          <LineChart dataHistory={dataHistory} />
        </div>
        <div className="coin-info">
          <ul>
            <li>Current Price</li>
            <li>
              {currency.Symbol}{" "}
              {data.market_data.current_price[currency.name].toLocaleString()}
            </li>
          </ul>
          <ul>
            <li>Market Cap</li>
            <li>
              {currency.Symbol}{" "}
              {data.market_data.market_cap[currency.name].toLocaleString()}
            </li>
          </ul>
          <ul>
            <li>24 Hour high</li>
            <li>
              {currency.Symbol}{" "}
              {data.market_data.high_24h[currency.name].toLocaleString()}
            </li>
          </ul>
          <ul>
            <li>24 Hour low</li>
            <li>
              {currency.Symbol}{" "}
              {data.market_data.low_24h[currency.name].toLocaleString()}
            </li>
          </ul>
        </div>
      </div>
    );
  } else {
    return (
      <div className="spinner">
        <div className="spin"></div>
      </div>
    );
  }
};

export default Coinpage;
