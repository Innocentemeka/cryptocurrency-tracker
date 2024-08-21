import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { CoinContext } from "./Context";

const Header = () => {
  const { setCurrency } = useContext(CoinContext);

  const handleCurrency = (event) => {
    switch (event.target.value) {
      case "usd": {
        setCurrency({ name: "usd", Symbol: "$" });
        break;
      }
      case "eur": {
        setCurrency({ name: "eur", Symbol: "€" });
        break;
      }
      case "inr": {
        setCurrency({ name: "inr", Symbol: "₹" });
        break;
      }
      default: {
        setCurrency({ name: "usd", Symbol: "$" });
        break;
      }
    }
  };

  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <div>
        <select onChange={handleCurrency}>
          <option value="usd">USD</option>
          <option value="inr">INR</option>
          <option value="eur">EUR</option>
        </select>
      </div>
    </nav>
  );
};

export default Header;
