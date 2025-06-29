$(document).ready(function () {
  function loadUsers() {
    api.getUsers().then((data) => dom.renderUserTable(data.users));
  }

  loadUsers();

  $("#searchInput").on("input", function () {
    const query = $(this).val().trim();
    if (query.length > 0) {
      api.searchUsers(query).then((data) => dom.renderUserTable(data.users));
    } else {
      loadUsers();
    }
  });
});
