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
          <tr
            class="bg-white border-b border-gray-300 hover:bg-gray-50"
            >
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
            >
              ${post.id}
            </th>
            <td class="px-6 py-4">${post.title}</td>
            <td class="px-6 py-4">${post.content}</td>
            <td class="px-0 py-4">
              <button
                class="detail-btn font-medium text-blue-600 hover:underline"
                  data-id="${post.id}" 
                  data-title="${post.title}" 
                  data-content="${post.content}"
                >Detail</button
              >
            </td>
            <td class="px-0 py-4">
              <button
                class="edit-btn font-medium text-yellow-600 hover:underline"
                  data-id="${post.id}" 
                  data-title="${post.title}" 
                  data-content="${post.content}"
                >Edit</button
              >
            </td>
            <td class="px-0 py-4">
              <button
                class="delete-btn font-medium text-red-600 hover:underline"
                  data-id="${post.id}"
                >Delete</button
              >
            </td>
          </tr>
        `
      )
      .join("");

    $("#postTable tbody").html(rows);
  },
};
