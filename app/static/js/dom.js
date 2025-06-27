const dom = {
  editingPostId: null,

  getFormData() {
    return {
      title: $("#title").val(),
      content: $("#content").val(),
    };
  },

  resetForm() {
    $("#title").val("");
    $("#content").val("");
    this.editingPostId = null;
    $("#postForm button")
      .text("Add Post")
      .removeClass("bg-green-600")
      .addClass("bg-blue-600");
  },

  fillForm({ id, title, content }) {
    $("#title").val(title);
    $("#content").val(content);
    this.editingPostId = id;
    $("#postForm button")
      .text("Update Post")
      .removeClass("bg-blue-600")
      .addClass("bg-green-600");
  },

  renderTable(posts) {
    const rows = posts
      .map(
        (post) => `
    <tr>
      <td class="border px-4 py-2">${post.id}</td>
      <td class="border px-4 py-2">${post.title}</td>
      <td class="border px-4 py-2">${post.content}</td>
      <td class="border px-4 py-2 space-x-1">
        <button class="detail-btn bg-indigo-600 text-white px-2 py-1 rounded" 
                data-id="${post.id}" 
                data-title="${post.title}" 
                data-content="${post.content}">
          Detail
        </button>
        <button class="edit-btn bg-yellow-500 text-white px-2 py-1 rounded" 
                data-id="${post.id}" 
                data-title="${post.title}" 
                data-content="${post.content}">
          Edit
        </button>
        <button class="delete-btn bg-red-600 text-white px-2 py-1 rounded" 
                data-id="${post.id}">
          Delete
        </button>
      </td>
    </tr>
  `
      )
      .join("");

    $("#postTable tbody").html(rows);
  },
};
