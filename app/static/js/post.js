$(document).ready(function () {
  loadPosts();

  // --- FORM ---
  // Submit form action
  $("#postForm").on("submit", function (e) {
    e.preventDefault();

    let action;
    if (dom.editingPostId) {
      const data = dom.getFormData();
      action = api.updatePost(dom.editingPostId, data);
    } else {
      const formData = new FormData(this);
      action = $.ajax({
        url: "/add_post",
        type: "POST",
        data: formData,
        contentType: false,
        processData: false,
      });
    }

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

  // Cancel form modal
  $("#cancelForm").on("click", function () {
    $("#formModal").addClass("hidden").removeClass("flex");
  });

  // --- FORM BUTTONS ---
  // Open add modal
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

    $("#imageWrapper").show();
  });

  // Edit post modal
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

    $("#imageWrapper").hide();
  });

  // Delete post action
  $("#postTable").on("click", ".delete-btn", function () {
    const id = $(this).data("id");
    if (confirm("Confirm delete post?")) {
      api
        .deletePost(id)
        .then(() => loadPosts())
        .catch(() => alert("Failed to delete post."));
    }
  });

  // View post detail
  $("#postTable").on("click", ".detail-btn", function () {
    const btn = $(this);
    $("#detailId").text(btn.data("id"));
    $("#detailTitle").text(btn.data("title"));
    $("#detailContent").text(btn.data("content"));
    $("#detailStatus").text(btn.data("status"));
    $("#detailViews").text(btn.data("views"));
    $("#detailCreatedAt").text(btn.data("created_at").split(" ")[0]);
    $("#detailAuthor").text(btn.data("author"));

    const image = btn.data("image");
    const imageUrl = image
      ? `/static/uploads/${image}`
      : "/static/images/harmedic.png";

    $("#detailImage")
      .attr("src", imageUrl)
      .attr(
        "onerror",
        "this.onerror=null; this.src='/static/images/harmedic.png';"
      );

    $("#detailModal").removeClass("hidden").addClass("flex");
  });

  // Close detail modal
  $("#closeModal").on("click", function () {
    $("#detailModal").addClass("hidden").removeClass("flex");
  });

  // --- SEARCH ---
  // Search input event
  $("#searchInput").on("input", function () {
    const query = $(this).val().trim();
    if (query.length > 0) {
      api.searchPosts(query).then((data) => dom.renderTable(data.posts));
    } else {
      loadPosts();
    }
  });

  function loadPosts() {
    api.getPosts().then((data) => dom.renderTable(data.posts));
  }
});
