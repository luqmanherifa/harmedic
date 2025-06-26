$(document).ready(function () {
  let editingUserId = null;

  // Handle form submit
  $("#userForm").on("submit", function (e) {
    e.preventDefault();
    const name = $("#name").val();
    const email = $("#email").val();

    const payload = JSON.stringify({ name, email });

    if (editingUserId) {
      // Update user
      $.ajax({
        url: `/update_user/${editingUserId}`,
        type: "PUT",
        contentType: "application/json",
        data: payload,
        success: function () {
          resetForm();
          loadUsers();
        },
        error: function () {
          alert("Gagal mengupdate user.");
        },
      });
    } else {
      // Tambah user
      $.ajax({
        url: "/add_user",
        type: "POST",
        contentType: "application/json",
        data: payload,
        success: function () {
          resetForm();
          loadUsers();
        },
        error: function () {
          alert("Gagal menambahkan user.");
        },
      });
    }
  });

  // Reset form ke mode tambah
  function resetForm() {
    $("#name").val("");
    $("#email").val("");
    editingUserId = null;
    $("#userForm button")
      .text("Add User")
      .removeClass("bg-green-600")
      .addClass("bg-blue-600");
  }

  // Muat data user
  function loadUsers() {
    $.get("/get_users", function (data) {
      let rows = "";
      data.users.forEach((user) => {
        rows += `<tr>
                  <td class="border px-4 py-2">${user.id}</td>
                  <td class="border px-4 py-2">${user.name}</td>
                  <td class="border px-4 py-2">${user.email}</td>
                  <td class="border px-4 py-2">
                    <button class="edit-btn bg-yellow-500 text-white px-2 py-1 rounded mr-2" data-id="${user.id}" data-name="${user.name}" data-email="${user.email}">Edit</button>
                    <button class="delete-btn bg-red-600 text-white px-2 py-1 rounded" data-id="${user.id}">Delete</button>
                  </td>
                </tr>`;
      });
      $("#userTable tbody").html(rows);
    });
  }

  // Delegasi klik tombol edit
  $("#userTable").on("click", ".edit-btn", function () {
    const btn = $(this);
    const id = btn.data("id");
    const name = btn.data("name");
    const email = btn.data("email");

    $("#name").val(name);
    $("#email").val(email);
    editingUserId = id;
    $("#userForm button")
      .text("Update User")
      .removeClass("bg-blue-600")
      .addClass("bg-green-600");
  });

  // Delegasi klik tombol delete
  $("#userTable").on("click", ".delete-btn", function () {
    const id = $(this).data("id");
    if (confirm("Yakin ingin menghapus user ini?")) {
      $.ajax({
        url: `/delete_user/${id}`,
        type: "DELETE",
        success: function () {
          loadUsers();
        },
        error: function () {
          alert("Gagal menghapus user.");
        },
      });
    }
  });

  loadUsers();
});
