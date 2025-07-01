const postApi = {
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
};
