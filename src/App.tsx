import { useState } from "react";
import "./styles/app.style.scss";

function App() {
  const [amount, setAmount] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [currency, setCurrency] = useState("BRL");
  const [currencyTarget, setCurrencyTarget] = useState("USD");

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  const handleCurrencyChangeTarget = (event) => {
    setCurrencyTarget(event.target.value);
  };

  const convertCurrency = async () => {
    try {
      const response = await fetch(
        `https://open.er-api.com/v6/latest/${currency}`
      );
      const data = await response.json();
      let conversionRate;
      if (currencyTarget === "USD") {
        conversionRate = data.rates.USD;
      } else if (currencyTarget === "BRL") {
        conversionRate = data.rates.BRL;
      } else if (currencyTarget === "EUR") {
        conversionRate = data.rates.EUR;
      }
      const convertedValue = amount * conversionRate;
      setConvertedAmount(convertedValue.toFixed(2));
    } catch (error) {
      console.error("Erro ao converter moeda:", error);
    }
  };

  return (
    <div className="converter-container">
      <h1>Conversor de Moeda</h1>
      <div>
        <input
          type="number"
          value={amount}
          onChange={handleAmountChange}
          placeholder="Digite o valor"
        />
        <select value={currency} onChange={handleCurrencyChange}>
          <option value="BRL">Real Brasileiro</option>
          <option value="USD">Dólar Americano</option>
          <option value="EUR">Euro</option>
        </select>{" "}
        <select value={currencyTarget} onChange={handleCurrencyChangeTarget}>
          <option value="USD">Dólar Americano</option>
          <option value="BRL">Real Brasileiro</option>
          <option value="EUR">Euro</option>
        </select>
        <button onClick={convertCurrency}>Converter</button>
      </div>
      <div>
        <h2>Valor Convertido:</h2>
        {currencyTarget === "USD" ? (
          <p>{convertedAmount} USD</p>
        ) : currencyTarget === "BRL" ? (
          <p>{convertedAmount} BRL</p>
        ) : (
          <p>{convertedAmount} EUR</p>
        )}
      </div>
    </div>
  );
}

export default App;
