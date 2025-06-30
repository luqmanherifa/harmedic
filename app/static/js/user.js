$(document).ready(function () {
  function loadUsers() {
    api.getUsers().then((data) => dom.renderUserTable(data.users));
  }

  loadUsers();

  // =============================
  // Search Users
  // =============================
  $("#searchInput").on("input", function () {
    const query = $(this).val().trim();
    if (query.length > 0) {
      api.searchUsers(query).then((data) => dom.renderUserTable(data.users));
    } else {
      loadUsers();
    }
  });

  // =============================
  // Detail User Modal
  // =============================
  $("#postTable").on("click", ".user-detail-btn", function () {
    const btn = $(this);

    $("#detailUserId").text(btn.data("id"));
    $("#detailUsername").text(btn.data("username"));
    $("#detailEmail").text(btn.data("email"));
    $("#detailRole").text(btn.data("role"));
    $("#detailUserCreatedAt").text(btn.data("created_at").split(" ")[0]);

    $("#userDetailModal").removeClass("hidden").addClass("flex");
  });

  $("#closeUserDetailModal").on("click", function () {
    $("#userDetailModal").addClass("hidden").removeClass("flex");
  });

  // =============================
  // Edit User Modal
  // =============================
  $("#postTable").on("click", ".user-edit-btn", function () {
    const btn = $(this);

    $("#editUserId").val(btn.data("id"));
    $("#editUsername").val(btn.data("username"));
    $("#editEmail").val(btn.data("email"));
    $("#editRole").val(btn.data("role")); // ← role dimuat ke select
    $("#editCreatedAt").val(btn.data("created_at").split(" ")[0]);

    $("#userFormModal").removeClass("hidden").addClass("flex");
  });

  $("#cancelUserForm").on("click", function () {
    $("#userFormModal").addClass("hidden").removeClass("flex");
  });

  // =============================
  // Submit Edit User Form
  // =============================
  $("#userForm").on("submit", function (e) {
    e.preventDefault();

    const id = $("#editUserId").val();
    const updatedData = {
      username: $("#editUsername").val(),
      email: $("#editEmail").val(),
      role: $("#editRole").val(), // ← role dikirim ke backend
    };

    api
      .updateUser(id, updatedData)
      .then(() => {
        $("#userFormModal").addClass("hidden").removeClass("flex");

        // 👇 Tambahkan 2 baris ini
        const currentUserId = $("#currentUserId").val(); // dari input hidden
        if (id === currentUserId) return location.reload(); // reload jika user sedang edit dirinya sendiri

        loadUsers(); // tetap load ulang user lain
      })
      .catch(() => {
        alert("Gagal memperbarui data user.");
      });
  });

  // =============================
  // Delete User
  // =============================
  $("#postTable").on("click", ".user-delete-btn", function () {
    const id = $(this).data("id");
    if (confirm("Yakin ingin menghapus user ini?")) {
      api
        .deleteUser(id)
        .then(() => loadUsers())
        .catch(() => alert("Gagal menghapus user."));
    }
  });
});
