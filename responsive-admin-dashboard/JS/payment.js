document.addEventListener("DOMContentLoaded", function () {
  function fetchData() {
    fetch("http://localhost:3000/api/payment")
      .then((response) => response.json())
      .then((data) => displayData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }
  function displayData(payments) {
    console.log({ payments });
    var tableBody = document.getElementById("paymentTableBody");
    console.log({ tableBody });
    tableBody.innerHTML = "";
    let i = 1;
    payments.forEach(function (payment) {
      console.log({ payment });
      var row = tableBody.insertRow();
      row.insertCell().innerHTML = i;
      i += 1;
      row.insertCell().innerHTML = payments.userId;
      row.insertCell().innerHTML = payments.orderId;
      row.insertCell().innerHTML = payments.amount;
      row.insertCell().innerHTML = payments.paymentMethod;
      row.insertCell().innerHTML = payments.remarks;
    });
  }
  fetchData();
});
