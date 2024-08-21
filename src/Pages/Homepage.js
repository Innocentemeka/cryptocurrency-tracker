import { useContext, useEffect, useState } from "react";
import "./Homepage.css";
import { CoinContext } from "../components/Context";
import { Link } from "react-router-dom";

const Homepage = () => {
  const { Coins, currency } = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [inputText, setInputText] = useState("");

  const handleInputText = (event) => {
    setInputText(event.target.value);
    if (event.target.value === "") {
      setDisplayCoin(Coins);
    }
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    const coin = await Coins.filter((item) => {
      return item.name.toLowerCase().includes(inputText.toLowerCase());
    });
    setDisplayCoin(coin);
  };

  useEffect(() => {
    setDisplayCoin(Coins);
  }, [Coins]);

  return (
    <div className="home">
      <div className="hero">
        <form onSubmit={handleSearch}>
          <input
            onChange={handleInputText}
            value={inputText}
            type="text"
            placeholder="Search..."
            required
          />
          <button type="submit">Search</button>
        </form>
        <h1>Deposit Now to Start Trading!</h1>
        <span>
          Over 200 Derivatives Contracts and 270 Spot Pairs available!
        </span>
        <div className="balance">
          <button>Deposit/Buy with Fiat/P2P</button>
        </div>
      </div>
      <div className="table">
        <div className="table-layout">
          <p>Coins</p>
          <p>Price</p>
          <p style={{ textAlign: "center" }}>24H Change</p>
          <p className="market-cap">Market Cap</p>
        </div>
        {displayCoin.slice(0, 10).map((item, index) => (
          <Link to={`/coins/${item.id}`} className="table-layout" key={index}>
            <div>
              <img src={item.image} alt="coin-image" />
              <p>{item.name + " - " + item.symbol}</p>
            </div>
            <p>
              {currency.Symbol} {item.current_price.toLocaleString()}
            </p>
            <p
              className={item.price_change_percentage_24h > 0 ? "green" : "red"}
            >
              {Math.floor(item.price_change_percentage_24h * 100) / 100}
            </p>
            <p className="market-cap">
              {currency.Symbol} {item.market_cap.toLocaleString()}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Homepage;
