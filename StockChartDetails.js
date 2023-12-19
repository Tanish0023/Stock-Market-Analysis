async function chartSummary(name, bookValue, profit) {
  try {
    const response = await fetch(
      "https://stocks3.onrender.com/api/stocks/getstocksprofiledata"
    );

    if (!response.ok) {
      throw new Error("Could not get the chart data Summary");
    }

    const data = await response.json();
    stockDetailDisplay(data, name, bookValue, profit);
  } catch (error) {
    console.error(error);
  }
}

function stockDetailDisplay(data, name, bookValue, profit) {
  const stockDetailElement = document.getElementById("stockDetail");
  stockDetailElement.innerHTML = "";
  const stockNameBookvalueProfitCreate = document.createElement("div");
  stockNameBookvalueProfitCreate.classList.add("stockNameBookvalueProfit");
  stockDetailElement.appendChild(stockNameBookvalueProfitCreate);

  //
  const stockNameCreate = document.createElement("p");
  stockNameCreate.textContent = name;
  stockNameBookvalueProfitCreate.appendChild(stockNameCreate);

  const stockProfitCreate = document.createElement("p");
  if (profit > 0) {
    stockProfitCreate.style.color = "green";
  } else {
    stockProfitCreate.style.color = "red";
  }
  stockProfitCreate.textContent = profit + "%";
  stockNameBookvalueProfitCreate.appendChild(stockProfitCreate);

  const stockBookvalueCreate = document.createElement("p");
  stockBookvalueCreate.textContent = bookValue;
  stockNameBookvalueProfitCreate.appendChild(stockBookvalueCreate);

  const stockSummaryCreate = document.createElement("p");
  stockSummaryCreate.textContent =
    data["stocksProfileData"][0][name]["summary"];
  stockDetailElement.appendChild(stockSummaryCreate);
}

export { chartSummary };
