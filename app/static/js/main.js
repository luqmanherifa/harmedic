$(document).ready(function () {
  function loadUsers() {
    api.getUsers().then((data) => dom.renderTable(data.users));
  }

  $("#userForm").on("submit", function (e) {
    e.preventDefault();
    const data = dom.getFormData();

    const action = dom.editingUserId
      ? api.updateUser(dom.editingUserId, data)
      : api.addUser(data);

    action
      .then(() => {
        dom.resetForm();
        loadUsers();
      })
      .catch(() => {
        const msg = dom.editingUserId
          ? "Gagal mengupdate user."
          : "Gagal menambahkan user.";
        alert(msg);
      });
  });

  $("#userTable").on("click", ".edit-btn", function () {
    const btn = $(this);
    dom.fillForm({
      id: btn.data("id"),
      name: btn.data("name"),
      email: btn.data("email"),
    });
  });

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

  // Tutup modal
  $("#closeModal").on("click", function () {
    $("#detailModal").addClass("hidden").removeClass("flex");
  });

  loadUsers();
});
