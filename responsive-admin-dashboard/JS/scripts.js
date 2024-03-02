// Function to open the sidebar
function openSidebar() {
  document.getElementById("sidebar").style.width = "250px";
}

// Function to close the sidebar
function closeSidebar() {
  document.getElementById("sidebar").style.width = "0";
}

// Custom JavaScript for your dashboard can be added here

// Example: Fetch data for the charts using ApexCharts
document.addEventListener("DOMContentLoaded", function () {
  // Sample data for demonstration purposes
  const chartData = {
    categories: [
      "Priya Shufi",
      "Rich Dad Poor Dad",
      "The wolf",
      "King of Forest",
      "White House",
    ],
    series: [44, 55, 13, 43, 22],
  };

  // Bar Chart
  const barChartOptions = {
    chart: {
      type: "bar",
      height: 350,
    },
    xaxis: {
      categories: chartData.categories,
    },
    series: [
      {
        name: "Quantity",
        data: chartData.series,
      },
    ],
  };

  const barChart = new ApexCharts(
    document.querySelector("#bar-chart"),
    barChartOptions
  );
  barChart.render();

  // Area Chart
  const areaChartOptions = {
    chart: {
      type: "area",
      height: 350,
    },
    xaxis: {
      categories: chartData.categories,
    },
    series: [
      {
        name: "Sales",
        data: [30, 40, 25, 50, 49],
      },
      {
        name: "Purchase",
        data: [20, 35, 18, 40, 30],
      },
    ],
  };

  const areaChart = new ApexCharts(
    document.querySelector("#area-chart"),
    areaChartOptions
  );
  areaChart.render();
});
