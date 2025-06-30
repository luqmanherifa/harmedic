const homePosts = {
  renderHomePosts(posts) {
    const html =
      posts.length === 0
        ? `<div class="col-span-full text-center text-red-600 text-lg font-medium py-10">
           Tidak ada postingan ditemukan.
         </div>`
        : posts
            .map(
              (post) => `
          <a href="/post/${post.id}"
            class="group cursor-pointer rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition-all"
          >
            <img
              class="w-[410px] h-[308px] object-cover rounded-b-none rounded-t-lg"
              src="${
                post.image
                  ? `/static/uploads/${post.image}`
                  : "/static/images/harmedic.png"
              }"
              alt="${post.title}"
              onerror="this.onerror=null; this.src='/static/images/harmedic.png';"
            />
            <div class="p-5">
              <h2 class="line-clamp-2 text-lg font-semibold text-gray-600 group-hover:text-blue-800">
                ${post.title}
              </h2>
              <p class="mt-2 line-clamp-3 text-xs font-normal text-gray-600">
                <span class="text-gray-400 flex items-center text-sm">
                  <span>${post.author}</span>
                  <span class="mx-2">•</span>
                  <span>${post.created_at}</span>
                  <span class="mx-2">•</span>
                  <span>${post.views} views</span>
                </span>
              </p>
              <p class="mt-2 line-clamp-3 text-base font-normal text-gray-600">
                ${post.content}
              </p>
            </div>
          </a>`
            )
            .join("");

    $(".grid.grid-cols-1").html(html);
  },
};
