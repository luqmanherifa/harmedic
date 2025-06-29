$(document).ready(function () {
  function loadPosts() {
    api.getPosts().then((data) => dom.renderTable(data.posts));
  }

  loadPosts();

  $("#openAddModal").on("click", function () {
    dom.resetForm();
    $("#formModalTitle").text("Add Post");
    $("#postForm button[type='submit']")
      .text("Save")
      .removeClass()
      .addClass(
        "text-white inline-flex items-center bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      );
    $("#cancelForm")
      .text("Cancel")
      .removeClass()
      .addClass(
        "text-white inline-flex items-center bg-gray-600 hover:bg-gray-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      );
    $("#formModal").removeClass("hidden").addClass("flex");
  });

  $("#cancelForm").on("click", function () {
    $("#formModal").addClass("hidden").removeClass("flex");
  });

  $("#postForm").on("submit", function (e) {
    e.preventDefault();
    const data = dom.getFormData();
    const action = dom.editingPostId
      ? api.updatePost(dom.editingPostId, data)
      : api.addPost(data);

    action
      .then(() => {
        dom.resetForm();
        $("#formModal").addClass("hidden").removeClass("flex");
        loadPosts();
      })
      .catch(() => {
        const msg = dom.editingPostId
          ? "Gagal mengupdate post."
          : "Gagal menambahkan post.";
        alert(msg);
      });
  });

  $("#postTable").on("click", ".edit-btn", function () {
    const btn = $(this);
    dom.fillForm({
      id: btn.data("id"),
      title: btn.data("title"),
      content: btn.data("content"),
      status: btn.data("status"),
      views: btn.data("views"),
    });
    $("#formModalTitle").text("Edit Post");
    $("#postForm button[type='submit']")
      .text("Update")
      .removeClass()
      .addClass(
        "text-white inline-flex items-center bg-yellow-600 hover:bg-yellow-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      );
    $("#cancelForm")
      .text("Cancel")
      .removeClass()
      .addClass(
        "text-white inline-flex items-center bg-gray-600 hover:bg-gray-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      );
    $("#formModal").removeClass("hidden").addClass("flex");
  });

  $("#postTable").on("click", ".delete-btn", function () {
    const id = $(this).data("id");
    if (confirm("Yakin ingin menghapus post ini?")) {
      api
        .deletePost(id)
        .then(() => loadPosts())
        .catch(() => alert("Gagal menghapus post."));
    }
  });

  $("#postTable").on("click", ".detail-btn", function () {
    const btn = $(this);
    $("#detailId").text(btn.data("id"));
    $("#detailTitle").text(btn.data("title"));
    $("#detailContent").text(btn.data("content"));
    $("#detailStatus").text(btn.data("status"));
    $("#detailViews").text(btn.data("views"));
    $("#detailCreatedAt").text(btn.data("created_at").split(" ")[0]);
    $("#detailModal").removeClass("hidden").addClass("flex");
  });

  $("#closeModal").on("click", function () {
    $("#detailModal").addClass("hidden").removeClass("flex");
  });

  $("#searchInput").on("input", function () {
    const query = $(this).val().trim();
    if (query.length > 0) {
      api.searchPosts(query).then((data) => dom.renderTable(data.posts));
    } else {
      loadPosts();
    }
  });
});
