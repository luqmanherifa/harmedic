const api = {
  getUsers: () => $.get("/get_users"),

  addUser: (data) =>
    $.ajax({
      url: "/add_user",
      type: "POST",
      contentType: "application/json",
      processData: false,
      data: JSON.stringify(data),
    }),

  updateUser: (id, data) =>
    $.ajax({
      url: `/update_user/${id}`,
      type: "PUT",
      contentType: "application/json",
      processData: false,
      data: JSON.stringify(data),
    }),

  deleteUser: (id) =>
    $.ajax({
      url: `/delete_user/${id}`,
      type: "DELETE",
    }),

  searchUsers: (query) => $.get("/search_users", { q: query }),
};
