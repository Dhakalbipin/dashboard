document.addEventListener("DOMContentLoaded", function () {
  function fetchData() {
    fetch("http://localhost:3000/api/user")
      .then((response) => response.json())
      .then((data) => displayData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }

  function fetchUserData(userId) {
    return fetch("http://localhost:3000/api/user/" + userId)
      .then((response) => response.json())
      .catch((error) => console.error("Error fetching user data:", error));
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

  function deleteUserData(userId) {
    return fetch("http://localhost:3000/api/user/" + userId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          if (response.status === 204) {
            return null;
          }
          return response.json();
        } else {
          return Promise.reject("Error deleting user: " + response.statusText);
        }
      })
      .catch((error) => Promise.reject(error));
  }

  function displayData(users) {
    console.log({ users });
    var tableBody = document.getElementById("userTableBody");
    console.log({ tableBody });
    tableBody.innerHTML = "";
    let i = 1;
    users.forEach(function (user) {
      console.log({ user });
      var row = tableBody.insertRow();
      row.insertCell().innerHTML = i;
      i += 1;
      row.insertCell().innerHTML = user.name;
      row.insertCell().innerHTML = user.userName;
      row.insertCell().innerHTML = user.email;
      row.insertCell().innerHTML = user.phone;
      row.insertCell().innerHTML = user.address;
      row.insertCell().innerHTML = user.amount;
      row.insertCell().innerHTML = user.userType;

      var editCell = row.insertCell();
      var editButton = document.createElement("button");
      editButton.className = "btn btn-link edit-btn";
      editButton.innerHTML = '<i class="fa fa-pencil"></i>';
      editButton.setAttribute("data-toggle", "modal");
      editButton.addEventListener("click", function () {
        openEditModal(user._id);
      });
      editCell.appendChild(editButton);

      var deleteCell = row.insertCell();
      var deleteButton = document.createElement("button");
      console.log({ deleteButton });
      deleteButton.className = "btn btn-link delete-btn";
      deleteButton.addEventListener("click", function () {
        openDeleteModal(user._id);
      });
      deleteCell.appendChild(deleteButton);
    });
  }

  function openDeleteModal(userId) {
    var deleteModal = new bootstrap.Modal(document.getElementById("delete"));
    console.log({ deleteModal });
    deleteModal.show();
    console.log("Delete user with ID:", userId);

    // Listen to the "Yes" button click to perform the delete action
    document
      .getElementById("deleteYesBtn")
      .addEventListener("click", function () {
        deleteUserData(userId)
          .then((response) => {
            console.log("User deleted successfully:", response);

            deleteModal.hide();
          })
          .catch((error) => console.error("Error deleting user:", error));
      });
  }

  function openEditModal(userId) {
    console.log("Edit user with ID:", userId);
    fetchUserData(userId).then((user) => {
      document.getElementById("editId").value = userId;
      document.getElementById("editName").value = user.name;
      document.getElementById("editUserName").value = user.userName;
      document.getElementById("editPassword").value = user.password;
      document.getElementById("editEmail").value = user.email;
      document.getElementById("editPhone").value = user.phone;
      document.getElementById("editAddress").value = user.address;
      document.getElementById("editUserType").value = user.userType;

      var editModal = new bootstrap.Modal(document.getElementById("edit"));
      editModal.show();
    });
  }

  function getEditedUserData() {
    var editedUserData = {
      _id: document.getElementById("editId").value,
      name: document.getElementById("editName").value,
      userName: document.getElementById("editUserName").value,
      password: document.getElementById("editPassword").value,
      email: document.getElementById("editEmail").value,
      phone: document.getElementById("editPhone").value,
      address: document.getElementById("editAddress").value,
      userType: document.getElementById("editUserType").value,
    };
    return editedUserData;
  }

  // Add event listener for "Save Changes" button
  document
    .getElementById("saveChangesBtn")
    .addEventListener("click", function () {
      var editedUserData = getEditedUserData();
      sendPutRequest(
        "http://localhost:3000/api/user/" + editedUserData._id,
        editedUserData
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

  document
    .getElementById("signupSubmitBtn")
    .addEventListener("click", function () {
      // Create FormData object to store form data
      var formData = new FormData(document.getElementById("userForm"));
      //   event.preventDefault();
      console.log(formData);

      // Perform a POST request to your backend endpoint
      fetch("http://localhost:3000/api/user/", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          console.log("Signup successful:", response.json());
          document.getElementById("userForm").reset();
        })
        .catch((error) => {
          console.error("Error during signup:", error);
          // Handle errors, display an alert, etc.
        });
    });

  fetchData();
});
