const postTable = {
  renderTable(posts) {
    const rows =
      posts.length === 0
        ? `
      <tr>
        <td colspan="10" class="text-center text-red-600 font-medium py-4">
          No posts found.
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
            <td class="px-6 py-4">
              <span class="${
                post.status === "approved"
                  ? "text-green-600 font-semibold"
                  : post.status === "pending"
                  ? "text-yellow-600 font-semibold"
                  : "text-red-600 font-semibold"
              }">
                ${post.status}
              </span>
            </td>
            <td class="px-6 py-4">${post.views}</td>  
            <td class="px-6 py-4">${post.created_at.split(" ")[0]}</td>
            <td class="px-6 py-4">${post.author}</td>
            <td class="px-6 py-4">
              <img 
                src="${
                  post.image ? post.image : "/static/images/harmedic.png"
                }" 
                alt="" 
                class="w-8 h-8 object-cover rounded"
                onerror="this.onerror=null; this.src='/static/images/harmedic.png';"
              />
            </td>

            <td class="px-1 py-4">
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
            <td class="px-1 py-4">
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
            <td class="px-1 pr-4 py-4">
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
};
