document.addEventListener("DOMContentLoaded", function () {
  function fetchData() {
    fetch("http://localhost:3000/api/order")
      .then((response) => response.json())
      .then((data) => displayData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }
  function displayData(orders) {
    console.log({ orders });
    var tableBody = document.getElementById("rentTableBody");
    console.log({ tableBody });
    tableBody.innerHTML = "";
    let i = 1;
    orders.forEach(function (order) {
      console.log({ order });
      var row = tableBody.insertRow();
      row.insertCell().innerHTML = i;
      i += 1;
      row.insertCell().innerHTML = order.userId;
      row.insertCell().innerHTML = order.bookId;
      row.insertCell().innerHTML = order.rentDate;
      row.insertCell().innerHTML = order.deadline;
      row.insertCell().innerHTML = order.address;
      row.insertCell().innerHTML = order.returnStatus;
      row.insertCell().innerHTML = order.Price;
      // var editCell = row.insertCell();
      // // // var editButton = document.createElement("button");
      // // // editButton.className = "btn btn-link edit-btn";
      // // // editButton.innerHTML = '<i class="fa fa-pencil"></i>';
      // // editButton.setAttribute("data-toggle", "modal");
      // // editButton.addEventListener("click", function () {
      // //   openEditModal(user._id);
      // // });
      // editCell.appendChild(editButton);
      // var deleteCell = row.insertCell();
      // var deleteButton = document.createElement("button");
      // console.log({ deleteButton });
      // deleteButton.className = "btn btn-link delete-btn";
      // deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
      // deleteButton.addEventListener("click", function () {
      //   openDeleteModal(user._id);
      // });
      // deleteCell.appendChild(deleteButton);
    });
  }
  fetchData();
});
