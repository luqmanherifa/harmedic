$(document).ready(function () {
  function loadUsers() {
    api.getUsers().then((data) => dom.renderUserTable(data.users));
  }

  loadUsers();

  // Search User Input
  $("#searchInput").on("input", function () {
    const query = $(this).val().trim();
    if (query.length > 0) {
      api.searchUsers(query).then((data) => dom.renderUserTable(data.users));
    } else {
      loadUsers();
    }
  });

  // Detail User Button
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

  // Edit User Button
  $("#postTable").on("click", ".user-edit-btn", function () {
    const btn = $(this);

    $("#editUserId").val(btn.data("id"));
    $("#editUsername").val(btn.data("username"));
    $("#editEmail").val(btn.data("email"));
    $("#editRole").val(btn.data("role"));

    $("#userFormModal").removeClass("hidden").addClass("flex");
  });

  $("#cancelUserForm").on("click", function () {
    $("#userFormModal").addClass("hidden").removeClass("flex");
  });

  // Submit User Form
  $("#userForm").on("submit", function (e) {
    e.preventDefault();

    const id = $("#editUserId").val();
    const updatedData = {
      username: $("#editUsername").val(),
      email: $("#editEmail").val(),
      role: $("#editRole").val(),
    };

    api
      .updateUser(id, updatedData)
      .then(() => {
        $("#userFormModal").addClass("hidden").removeClass("flex");

        const currentUserId = $("#currentUserId").val();
        if (id === currentUserId) return location.reload();

        loadUsers();
      })
      .catch(() => {
        alert("Gagal memperbarui data user.");
      });
  });

  // Delete User Button
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
