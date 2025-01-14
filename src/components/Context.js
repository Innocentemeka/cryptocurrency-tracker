import { createContext, useEffect, useState } from "react";

export const CoinContext = createContext();

const CoinContextProvider = (props) => {
  const [Coins, setCoins] = useState([]);
  const [currency, setCurrency] = useState({
    name: "usd",
    Symbol: "$",
  });

  const fetchCoins = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-CHCbLEwmkZG8ztm2ivPtE9yh",
      },
    };

    fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`,
      options
    )
      .then((response) => response.json())
      .then((response) => setCoins(response))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const contextValue = {
    Coins,
    currency,
    setCurrency,
  };
  return (
    <CoinContext.Provider value={contextValue}>
      {props.children}
    </CoinContext.Provider>
  );
};

export default CoinContextProvider;
