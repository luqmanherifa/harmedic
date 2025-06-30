$(document).ready(function () {
  $("#search-article").on("input", function () {
    const query = $(this).val().trim();

    if (query.length === 0) {
      location.reload();
      return;
    }

    api.searchHomePosts(query).then((data) => {
      dom.renderHomePosts(data.posts);
    });
  });
});
