const api = {
  // --- POSTS API ---
  // Get Posts
  getPosts: () => $.get("/get_posts"),

  // Search Posts
  searchPosts: (query) => $.get("/search_posts", { q: query }),
  searchHomePosts: (query) => $.get("/search_home_posts", { q: query }),

  // Add Post
  addPost: (data) =>
    $.ajax({
      url: "/add_post",
      type: "POST",
      contentType: "application/json",
      processData: false,
      data: JSON.stringify(data),
    }),

  // Update Post
  updatePost: (id, data) =>
    $.ajax({
      url: `/update_post/${id}`,
      type: "PUT",
      contentType: "application/json",
      processData: false,
      data: JSON.stringify(data),
    }),

  // Delete Post
  deletePost: (id) =>
    $.ajax({
      url: `/delete_post/${id}`,
      type: "DELETE",
    }),

  // --- USERS API ---
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
