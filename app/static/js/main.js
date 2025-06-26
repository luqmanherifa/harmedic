$(document).ready(function () {
  // Tambah user
  $("#userForm").on("submit", function (e) {
    e.preventDefault();
    const name = $("#name").val();
    const email = $("#email").val();

    $.ajax({
      url: "/add_user",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({ name, email }),
      success: function (res) {
        $("#name").val("");
        $("#email").val("");
        loadUsers();
      },
      error: function (err) {
        alert("Gagal menambahkan user.");
      },
    });
  });

  // Load user ke tabel
  function loadUsers() {
    $.get("/get_users", function (data) {
      let rows = "";
      data.users.forEach((user) => {
        rows += `<tr>
                    <td class="border px-4 py-2">${user.id}</td>
                    <td class="border px-4 py-2">${user.name}</td>
                    <td class="border px-4 py-2">${user.email}</td>
                </tr>`;
      });
      $("#userTable tbody").html(rows);
    });
  }

  loadUsers();
});
