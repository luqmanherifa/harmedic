const userTable = {
  renderUserTable(users) {
    const rows =
      users.length === 0
        ? `
      <tr>
        <td colspan="7" class="text-center text-red-600 font-medium py-4">
          Tidak ada data ditemukan.
        </td>
      </tr>
    `
        : users
            .map(
              (user) => `
            <tr class="bg-white border-b border-gray-200 hover:bg-gray-50">
              <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                ${user.id}
              </th>
              <td class="px-6 py-4">${user.username}</td>
              <td class="px-6 py-4">${user.email}</td>
              <td class="px-6 py-4">${user.role}</td>
              <td class="px-6 py-4">${user.created_at.split(" ")[0]}</td>
              <td class="px-0 py-4">
                <button
                  class="user-detail-btn font-medium text-blue-600 hover:underline"
                  data-id="${user.id}"
                  data-username="${user.username}"
                  data-email="${user.email}"
                  data-role="${user.role}"
                  data-created_at="${user.created_at}"
                >Detail</button>
              </td>
              <td class="px-0 py-4">
                <button
                  class="user-edit-btn font-medium text-yellow-600 hover:underline"
                  data-id="${user.id}"
                  data-username="${user.username}"
                  data-email="${user.email}"
                  data-role="${user.role}"
                  data-created_at="${user.created_at}"
                >Edit</button>
              </td>
              <td class="px-0 py-4">
                <button
                  class="user-delete-btn font-medium text-red-600 hover:underline"
                  data-id="${user.id}"
                >Delete</button>
              </td>
            </tr>
          `
            )
            .join("");

    $("#postTable tbody").html(rows);
  },
};
