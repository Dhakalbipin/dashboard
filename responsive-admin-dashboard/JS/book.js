document.addEventListener("DOMContentLoaded", function () {
  function fetchData() {
    fetch("http://localhost:3000/api/book")
      .then((response) => response.json())
      .then((data) => displayData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }

  function fetchBookData(bookId) {
    return fetch("http://localhost:3000/api/book/" + bookId)
      .then((response) => response.json())
      .catch((error) => console.error("Error fetching book data:", error));
  }

  function sendPutRequest(url, data) {
    return fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => response.json());
  }

  function deleteBookData(bookId) {
    return fetch("http://localhost:3000/api/book/" + bookId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      // You can include credentials if needed (e.g., for authentication)
      // credentials: 'include',
    })
      .then((response) => {
        if (response.ok) {
          if (response.status === 204) {
            return null;
          }
          return response.json();
        } else {
          console.log(response.statusText);
          return Promise.reject("Error deleting book: " + response.statusText);
        }
      })
      .catch((error) => Promise.reject(error));
  }
  function displayData(books) {
    console.log({ books });
    var tableBody = document.getElementById("bookTableBody");
    console.log({ tableBody });
    tableBody.innerHTML = "";
    let i = 1;
    books.forEach(function (book) {
      console.log({ book });
      var row = tableBody.insertRow();
      row.insertCell().innerHTML = i;
      i += 1;
      row.insertCell().innerHTML = book.bookName;
      row.insertCell().innerHTML = book.author;
      row.insertCell().innerHTML = book.genre;
      row.insertCell().innerHTML = book.bookId;
      row.insertCell().innerHTML = book.description;
      row.insertCell().innerHTML = book.stock;
      // row.insertCell().innerHTML = book.aStock;
      row.insertCell().innerHTML = book.photo;
      row.insertCell().innerHTML = book.bookValue;
      row.insertCell().innerHTML = book.venderName;
      row.insertCell().innerHTML = book.rating;
      var editCell = row.insertCell();
      var editButton = document.createElement("button");
      editButton.className = "btn btn-link edit-btn";
      editButton.innerHTML = '<i class="fa fa-pencil"></i>';
      editButton.setAttribute("data-toggle", "modal");
      editButton.addEventListener("click", function () {
        openEditModal(book._id);
      });
      editCell.appendChild(editButton);

      var deleteCell = row.insertCell();
      var deleteButton = document.createElement("button");
      console.log({ deleteButton });
      deleteButton.className = "btn btn-link delete-btn";
      deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
      deleteButton.addEventListener("click", function () {
        openDeleteModal(book._id);
      });
      deleteCell.appendChild(deleteButton);
    });
  }
  function openDeleteModal(bookId) {
    var deleteModal = new bootstrap.Modal(document.getElementById("delete"));
    console.log({ deleteModal });
    deleteModal.show();
    console.log("Delete book with ID:", bookId);
    // Listen to the "Yes" button click to perform the delete action
    document
      .getElementById("deleteYesBtn")
      .addEventListener("click", function () {
        deleteBookData(bookId)
          .then((response) => {
            console.log("Book deleted successfully:", response);

            deleteModal.hide();
          })
          .catch((error) => console.error("Error deleting Book:", error));
      });
  }
  function openEditModal(bookId) {
    console.log("Edit Book with ID:", bookId);
    fetchBookData(bookId).then((book) => {
      document.getElementById("editId").value = bookId;
      document.getElementById("editBookName").value = book.bookName;
      document.getElementById("editAuthor").value = book.author;
      document.getElementById("editGenre").value = book.genre;
      // document.getElementById("edituUserId").value = user.userId;
      document.getElementById("editDescription").value = book.description;
      document.getElementById("editStock").value = book.stock;
      document.getElementById("editPhoto").value = book.photo;
      document.getElementById("editBookValue").value = book.bookValue;
      document.getElementById("editVendorName").value = book.vendorName;
      document.getElementById("editRating").value = book.rating;

      var editModal = new bootstrap.Modal(document.getElementById("edit"));
      editModal.show();
    });
  }
  function getEditedBookData() {
    var editedBookData = {
      _id: document.getElementById("editId").value,
      bookName: document.getElementById("editBookName").value,
      author: document.getElementById("editAuthor").value,
      genre: document.getElementById("editGenre").value,
      // user_id: document.getElementById("editUserId").value,
      description: document.getElementById("editDescription").value,
      stock: document.getElementById("editStock").value,
      // aStock: document.getElementById("editAStock").value,
      photo: document.getElementById("editPhoto").value,
      bookName: document.getElementById("editBookValue").value,
      venderName: document.getElementById("editVendorName").value,
      rating: document.getElementById("editRating").value,
    };
    return editedBookData;
  }
  // Add event listener for "Save Changes" button

  document.getElementById("saveBookBtn").addEventListener("click", function () {
    var editedBookData = getEditedBookData();
    sendPutRequest(
      "http://localhost:3000/api/book/" + editedBookData._id,
      editedBookData
    )
      .then((response) => {
        console.log("PUT request successful:", response);
        var editModal = document.getElementById("edit");
        editModal.classList.remove("show");
        editModal.style.display = "none";
        document.body.classList.remove("modal-open");
        document.body.style.paddingRight = "0";
        document.querySelector(".modal-backdrop").remove();
      })
      .catch((error) => console.error("Error sending PUT request:", error));
  });
  // Add book into database
  document.getElementById("addBookBtn").addEventListener("click", function () {
    // Create FormData object to store form data
    var formData = new FormData(document.getElementById("addBookForm"));
    //   event.preventDefault();
    console.log(formData);

    // Perform a POST request to your backend endpoint
    fetch("http://localhost:3000/api/book/", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.status === 201) {
          console.log("Book Added successful:", response.json());
          document.getElementById("addBookForm").reset();
        }
      })
      .catch((error) => {
        console.error("Error during Book adding:", error);
        // Handle errors, display an alert, etc.
      });
  });
  fetchData();
});
