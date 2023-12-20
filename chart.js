async function chartData(name, timeperiod) {
  try {
    const response = await fetch(
      "https://stocks3.onrender.com/api/stocks/getstocksdata"
    );

    if (!response.ok) {
      throw new Error("Could not get the chart data");
    }

    const data = await response.json();

    graphPlot(data, name, timeperiod);
  } catch (error) {
    console.error(error);
  }
}

function graphPlot(data, name, timeperiod) {
  const timeStamp = data["stocksData"][0][name][timeperiod]["timeStamp"];
  let new_timestamp = [];

  for (let i = 0; i < timeStamp.length; i++) {
    const time = new Date(timeStamp[i] * 1000).toLocaleDateString();
    new_timestamp[i] = time;
  }
  console.log(new_timestamp);
  const xValues = new_timestamp;
  const yValues = data["stocksData"][0][name][timeperiod]["value"];

  new Chart("myChart", {
    type: "line",

    data: {
      labels: xValues,
      datasets: [
        {
          label: `Stock Profit Chart of ${name} during ${timeperiod}`,
          backgroundColor: "rgba(0,0,255,1.0)",
          borderColor: "rgba(0,0,255,0.1)",
          data: yValues,
          fill: false,
          pointHoverRadius: 5,
          pointRadius: 1,
          backgroundColor: "rgba(153, 153, 255, 1)",
        },
      ],
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: `Stock Profit Chart of ${name} during ${timeperiod}`,
      },
      tooltips: {
        mode: "label",
      },
      hover: {
        mode: "dataset",
      },
      
      responsive: true,
      scales: {
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: "Profit",
            },
            ticks: { display: false },
          },
        ],
        xAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: "Time Period",
            },
            ticks: { display: false },
          },
        ],
      },
    },
  });
}

function timeperiodBtnFunction(name) {
  const timeperiodBtnsElement = document.getElementById("stockTimeperiodBtn");
  timeperiodBtnsElement.innerHTML = "";
  const month1 = document.createElement("button");
  month1.textContent = "1 Month";
  month1.classList.add("stockTimeperiodBtn", "btn");
  timeperiodBtnsElement.appendChild(month1);
  month1.addEventListener("click", () => chartData(name, "1mo"));

  const month3 = document.createElement("button");
  month3.textContent = "3 Month";
  month3.classList.add("stockTimeperiodBtn", "btn");
  timeperiodBtnsElement.appendChild(month3);
  month3.addEventListener("click", () => chartData(name, "3mo"));

  const year1 = document.createElement("button");
  year1.textContent = "1 Year";
  year1.classList.add("stockTimeperiodBtn", "btn");
  timeperiodBtnsElement.appendChild(year1);
  year1.addEventListener("click", () => chartData(name, "1y"));

  const year5 = document.createElement("button");
  year5.textContent = "5 Years";
  year5.classList.add("stockTimeperiodBtn", "btn");
  timeperiodBtnsElement.appendChild(year5);
  year5.addEventListener("click", () => chartData(name, "5y"));
}

export { chartData, graphPlot, timeperiodBtnFunction };
