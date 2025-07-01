const userApi = {
  // Get Users
  getUsers: () => $.get("/get_users"),

  // Search Users
  searchUsers: (query) => $.get("/search_users", { q: query }),

  // Update User
  updateUser: (id, data) =>
    $.ajax({
      url: `/update_user/${id}`,
      type: "PUT",
      contentType: "application/json",
      processData: false,
      data: JSON.stringify(data),
    }),

  // Delete User
  deleteUser: (id) =>
    $.ajax({
      url: `/delete_user/${id}`,
      type: "DELETE",
    }),
};
