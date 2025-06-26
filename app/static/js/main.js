$(document).ready(function () {
  function loadUsers() {
    api.getUsers().then((data) => dom.renderTable(data.users));
  }

  // Tombol "Add User" diklik
  $("#openAddModal").on("click", function () {
    dom.resetForm();
    $("#formModalTitle").text("Add User");
    $("#userForm button[type='submit']")
      .text("Save")
      .removeClass()
      .addClass("bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700");
    $("#cancelForm")
      .text("Cancel")
      .removeClass()
      .addClass("bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600");
    $("#formModal").removeClass("hidden").addClass("flex");
  });

  // Cancel di dalam modal
  $("#cancelForm").on("click", function () {
    $("#formModal").addClass("hidden").removeClass("flex");
  });

  // Submit form Add/Edit user
  $("#userForm").on("submit", function (e) {
    e.preventDefault();
    const data = dom.getFormData();

    const action = dom.editingUserId
      ? api.updateUser(dom.editingUserId, data)
      : api.addUser(data);

    action
      .then(() => {
        dom.resetForm();
        $("#formModal").addClass("hidden").removeClass("flex");
        loadUsers();
      })
      .catch(() => {
        const msg = dom.editingUserId
          ? "Gagal mengupdate user."
          : "Gagal menambahkan user.";
        alert(msg);
      });
  });

  // Klik tombol Edit
  $("#userTable").on("click", ".edit-btn", function () {
    const btn = $(this);
    dom.fillForm({
      id: btn.data("id"),
      name: btn.data("name"),
      email: btn.data("email"),
    });
    $("#formModalTitle").text("Edit User");
    $("#userForm button[type='submit']")
      .text("Update")
      .removeClass()
      .addClass("bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700");
    $("#cancelForm")
      .text("Cancel")
      .removeClass()
      .addClass("bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600");
    $("#formModal").removeClass("hidden").addClass("flex");
  });

  // Klik tombol Delete
  $("#userTable").on("click", ".delete-btn", function () {
    const id = $(this).data("id");
    if (confirm("Yakin ingin menghapus user ini?")) {
      api
        .deleteUser(id)
        .then(() => loadUsers())
        .catch(() => alert("Gagal menghapus user."));
    }
  });

  // Klik tombol Detail
  $("#userTable").on("click", ".detail-btn", function () {
    const btn = $(this);
    $("#detailId").text(btn.data("id"));
    $("#detailName").text(btn.data("name"));
    $("#detailEmail").text(btn.data("email"));
    $("#detailModal").removeClass("hidden").addClass("flex");
  });

  // Tutup modal detail
  $("#closeModal").on("click", function () {
    $("#detailModal").addClass("hidden").removeClass("flex");
  });

  loadUsers();

  // Event input untuk search
  $("#searchInput").on("input", function () {
    const query = $(this).val().trim();
    if (query.length > 0) {
      api.searchUsers(query).then((data) => dom.renderTable(data.users));
    } else {
      loadUsers(); // kalau kosong, load semua user
    }
  });
});
