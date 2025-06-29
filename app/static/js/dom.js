const dom = {
  editingPostId: null,

  getFormData() {
    return {
      title: $("#title").val(),
      content: $("#content").val(),
      status: $("#status").val(),
      views: parseInt($("#views").val()) || 0,
    };
  },

  resetForm() {
    $("#title").val("");
    $("#content").val("");
    $("#status").val("pending");
    $("#views").val("0");
    $("#image").val(""); // reset input file
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
    const rows =
      posts.length === 0
        ? `
      <tr>
        <td colspan="10" class="text-center text-red-600 font-medium py-4">
          Tidak ada data ditemukan.
        </td>
      </tr>
    `
        : posts
            .map(
              (post) => `
          <tr class="bg-white border-b border-gray-200 hover:bg-gray-50">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
              ${post.id}
            </th>
            <td class="px-6 py-4 max-w-[100px]">
              <p class="line-clamp-1">${post.title}</p>
            </td>
            <td class="px-6 py-4 max-w-[100px]">
              <p class="line-clamp-1">${post.content}</p>
            </td>
            <td class="px-6 py-4">${post.status}</td> 
            <td class="px-6 py-4">${post.views}</td>  
            <td class="px-6 py-4">${post.created_at.split(" ")[0]}</td>
            <td class="px-6 py-4">${post.author}</td>
            <td class="px-6 py-4">
              <img 
                src="${
                  post.image ? post.image : "/static/images/harmedic.png"
                }" 
                alt="Post Image" 
                class="w-8 h-8 object-cover rounded"
              />
            </td>

            <td class="px-0 py-4">
              <button
                class="detail-btn font-medium text-blue-600 hover:underline"
                data-id="${post.id}" 
                data-title="${post.title}" 
                data-content="${post.content}" 
                data-status="${post.status}" 
                data-views="${post.views}" 
                data-created_at="${post.created_at}"
                data-author="${post.author}"
                data-image="${
                  post.image ? post.image.replace("/static/uploads/", "") : ""
                }"
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
              <td class="px-6 py-4">${user.created_at.split(" ")[0]}</td>
              <td class="px-0 py-4">
                <button
                  class="user-detail-btn font-medium text-blue-600 hover:underline"
                  data-id="${user.id}"
                  data-username="${user.username}"
                  data-email="${user.email}"
                  data-created_at="${user.created_at}"
                >Detail</button>
              </td>
              <td class="px-0 py-4">
                <button
                  class="user-edit-btn font-medium text-yellow-600 hover:underline"
                  data-id="${user.id}"
                  data-username="${user.username}"
                  data-email="${user.email}"
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
