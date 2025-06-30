const api = {
  // ====== POST ======
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

  searchHomePosts: (query) => $.get("/search_home_posts", { q: query }),

  // ====== USER ======
  getUsers: () => $.get("/get_users"),

  searchUsers: (query) => $.get("/search_users", { q: query }),

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
};
