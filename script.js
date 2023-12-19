import * as chart from "./chart.js";
import { chartSummary } from "./StockChartDetails.js";
//

// Fetching data from API

async function bookValueandProfit() {
  try {
    const response = await fetch(
      "https://stocks3.onrender.com/api/stocks/getstockstatsdata"
    );

    if (!response.ok) {
      throw new Error("Could not get the Book value and Profit data");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

// Stocks Array

let Stocks = [
  "AAPL",
  "MSFT",
  "GOOGL",
  "AMZN",
  "PYPL",
  "TSLA",
  "JPM",
  "NVDA",
  "NFLX",
  "DIS",
];

// Creating Elements
const stockListElement = document.getElementById("stockList");

//

const data = await bookValueandProfit();

//

// Creating button and buttton details

for (let i = 0; i < Stocks.length; i++) {
  const stockBtnDetail = document.createElement("div");
  stockBtnDetail.classList.add("stockBtnDetail");
  stockListElement.appendChild(stockBtnDetail);

  //

  const stockButton = document.createElement("button");
  stockButton.textContent = Stocks[i];
  stockButton.classList.add("stockBtn", "btn");
  stockBtnDetail.appendChild(stockButton);

  // Finding Book Value and Profit
  const stockBookvalue =
    "$" + data["stocksStatsData"][0][Stocks[i]]["bookValue"];
  const stockProfit =
    Math.round(data["stocksStatsData"][0][Stocks[i]]["profit"] * 10 ** 2) /
      10 ** 2 +
    "%";

  const bookValueCreate = document.createElement("p");
  bookValueCreate.textContent = stockBookvalue;
  stockBtnDetail.appendChild(bookValueCreate);

  const profitCreate = document.createElement("p");
  const stockProfitPer = data["stocksStatsData"][0][Stocks[i]]["profit"];
  if (
    Math.round(data["stocksStatsData"][0][Stocks[i]]["profit"] * 10 ** 2) /
      10 ** 2 >
    0
  ) {
    profitCreate.style.color = "green";
  } else {
    profitCreate.style.color = "red";
  }
  profitCreate.textContent = stockProfit;
  stockBtnDetail.appendChild(profitCreate);

  stockButton.addEventListener("click", () => {
    chart.chartData(stockButton.innerText, "5y");
    chart.timeperiodBtnFunction(stockButton.innerText);
    chartSummary(stockButton.innerText, stockBookvalue, stockProfitPer);
  });
}

// export { stockBookvalue, stockProfit };
