const api = {
  getPosts: () => $.get("/get_posts"),

  addPost: (data) =>
    $.ajax({
      url: "/add_post",
      type: "POST",
      contentType: "application/json",
      processData: false,
      data: JSON.stringify(data),
    }),

  updatePost: (id, data) =>
    $.ajax({
      url: `/update_post/${id}`,
      type: "PUT",
      contentType: "application/json",
      processData: false,
      data: JSON.stringify(data),
    }),

  deletePost: (id) =>
    $.ajax({
      url: `/delete_post/${id}`,
      type: "DELETE",
    }),

  searchPosts: (query) => $.get("/search_posts", { q: query }),

  getUsers: () => $.get("/get_users"),

  searchUsers: (query) => $.get("/search_users", { q: query }),
};
