const dom = {
  editingPostId: null,

  getFormData() {
    return {
      title: $("#title").val(),
      content: $("#content").val(),
      status: $("#status").val(), // ✅ penting agar bisa update status
      views: parseInt($("#views").val()) || 0, // ✅ untuk mempertahankan jumlah views
    };
  },

  resetForm() {
    $("#title").val("");
    $("#content").val("");
    $("#status").val("pending");
    $("#views").val("0");
    this.editingPostId = null;
    $("#postForm button")
      .text("Add Post")
      .removeClass("bg-green-700")
      .addClass("bg-blue-700");
  },

  fillForm({ id, title, content, status, views }) {
    $("#title").val(title);
    $("#content").val(content);
    $("#status").val(status);
    $("#views").val(views);
    this.editingPostId = id;
    $("#postForm button")
      .text("Update Post")
      .removeClass("bg-blue-600")
      .addClass("bg-green-700");
  },

  renderTable(posts) {
    const rows = posts
      .map(
        (post) => `
     <tr class="bg-white border-b border-gray-200 hover:bg-gray-50">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
              ${post.id}
            </th>
            <td class="px-6 py-4">${post.title}</td>
            <td class="px-6 py-4">${post.content}</td>
            <td class="px-6 py-4">${post.status}</td> 
            <td class="px-6 py-4">${post.views}</td>  
            <td class="px-6 py-4">${post.created_at.split(" ")[0]}</td> 
            <td class="px-0 py-4">
              <button
                class="detail-btn font-medium text-blue-600 hover:underline"
                data-id="${post.id}" 
                data-title="${post.title}" 
                data-content="${post.content}" 
                data-status="${post.status}" 
                data-views="${post.views}" 
                data-created_at="${post.created_at}"
              >
                Detail
              </button>
            </td>
            <td class="px-0 py-4">
              <button
                class="edit-btn font-medium text-yellow-600 hover:underline"
                data-id="${post.id}" 
                data-title="${post.title}" 
                data-content="${post.content}" 
                data-status="${post.status}" 
                data-views="${post.views}"
                data-created_at="${post.created_at}"
              >Edit</button>
            </td>
            <td class="px-0 py-4">
              <button
                class="delete-btn font-medium text-red-600 hover:underline"
                data-id="${post.id}"
              >Delete</button>
            </td>
          </tr>
        `
      )
      .join("");

    $("#postTable tbody").html(rows);
  },

  renderUserTable(users) {
    const rows = users
      .map(
        (user) => `
          <tr class="bg-white border-b border-gray-200 hover:bg-gray-50">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
              ${user.id}
            </th>
            <td class="px-6 py-4">${user.username}</td>
            <td class="px-6 py-4">${user.email}</td>
            <td class="px-6 py-4">${user.created_at.split(" ")[0]}</td>
          </tr>
        `
      )
      .join("");

    $("#postTable tbody").html(rows); // asumsi kamu pakai ID table yg sama
  },
};
