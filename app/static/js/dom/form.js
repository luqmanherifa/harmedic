const form = {
  editingPostId: null,

  // When edit button clicked
  fillForm({ id, title, content, status, views }) {
    $("#title").val(title);
    $("#content").val(content);
    $("#status").val(status);
    $("#views").val(views);
    this.editingPostId = id;

    // Switch to update mode
    $("#postForm button")
      .text("Update Post")
      .removeClass("bg-blue-600")
      .addClass("bg-green-700");
  },

  // On form submit
  getFormData() {
    return {
      title: $("#title").val(),
      content: $("#content").val(),
      status: $("#status").val(),
      views: parseInt($("#views").val()) || 0,
    };
  },

  // After submit or cancel
  resetForm() {
    $("#title").val("");
    $("#content").val("");
    $("#status").val("pending");
    $("#views").val("0");
    $("#image").val("");
    this.editingPostId = null;

    // Switch to add mode
    $("#postForm button")
      .text("Add Post")
      .removeClass("bg-green-700")
      .addClass("bg-blue-700");
  },
};
