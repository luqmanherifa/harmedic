const dom = {
  editingUserId: null,

  getFormData() {
    return {
      name: $("#name").val(),
      email: $("#email").val(),
    };
  },

  resetForm() {
    $("#name").val("");
    $("#email").val("");
    this.editingUserId = null;
    $("#userForm button")
      .text("Add User")
      .removeClass("bg-green-600")
      .addClass("bg-blue-600");
  },

  fillForm({ id, name, email }) {
    $("#name").val(name);
    $("#email").val(email);
    this.editingUserId = id;
    $("#userForm button")
      .text("Update User")
      .removeClass("bg-blue-600")
      .addClass("bg-green-600");
  },

  renderTable(users) {
    const rows = users
      .map(
        (user) => `
    <tr>
      <td class="border px-4 py-2">${user.id}</td>
      <td class="border px-4 py-2">${user.name}</td>
      <td class="border px-4 py-2">${user.email}</td>
      <td class="border px-4 py-2 space-x-1">
        <button class="detail-btn bg-indigo-600 text-white px-2 py-1 rounded" 
                data-id="${user.id}" 
                data-name="${user.name}" 
                data-email="${user.email}">
          Detail
        </button>
        <button class="edit-btn bg-yellow-500 text-white px-2 py-1 rounded" 
                data-id="${user.id}" 
                data-name="${user.name}" 
                data-email="${user.email}">
          Edit
        </button>
        <button class="delete-btn bg-red-600 text-white px-2 py-1 rounded" 
                data-id="${user.id}">
          Delete
        </button>
      </td>
    </tr>
  `
      )
      .join("");

    $("#userTable tbody").html(rows);
  },
};
