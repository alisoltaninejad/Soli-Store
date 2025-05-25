export default async function BlogPage() {
  const container = document.createElement("div");
  container.className = "container mt-32 md:mt-48 min-h-screen mb-24";

  let articles = [];
  let isfailed = false;

  try {
    const res = await fetch(
      "https://newsapi.org/v2/everything?q=technology&language=en&apiKey=e825dfe0e99344f3a32fd9af1a829daa"
    );
    const data = await res.json();
    articles = data.articles;
  } catch (err) {
    console.error("Error fetching blogs:", err);
    isfailed = true;
  }

  function formatDate(publishedAt) {
    const date = new Date(publishedAt);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return { day, month, year };
  }

  function createBlogBox(title, img, day, month, year) {
    return `
      <div class="flex flex-col items-center justify-between p-2  bg-gray-50 dark:bg-slate-600 rounded-3xl shadow-2xs">
        <div class="rounded-3xl overflow-hidden w-full h-full">
          <img src="${img || "images/category-smaartphone.jpg"}" alt="blog img" class="w-full h-40 object-cover">
        </div>
        <div class="flex justify-between items-start gap-3 px-2 my-3 text-slate-700 dark:text-white">
          <div class="flex-1 text-sm md:text-base lg:text-base line-clamp-2">${title || "عنوان مقاله"}</div>
          <div class="w-px h-full bg-gray-400"></div>
          <div class="text-right font-AlibabaBold text-green-700 text-xs whitespace-nowrap">
            <p>${day}</p>
            <p>${month}</p>
            <p>${year}</p>
          </div>
        </div>
      </div>
    `;
  }

  if (isfailed) {
    container.innerHTML = `
      <h2 class="flex items-center justify-center w-full h-36 text-4xl dark:text-gray-300">
        خطا در دریافت مطالب!
      </h2>`;
    return container;
  }

  const blogItemsContainer = document.createElement("section");
  blogItemsContainer.className =
    "blogs mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4 gap-y-10";

  // نمایش ۱۲ مقاله اول
  const first12 = articles.slice(0, 12);
  first12.forEach((article) => {
    const { title, urlToImage, publishedAt } = article;
    const { day, month, year } = formatDate(publishedAt);
    blogItemsContainer.insertAdjacentHTML(
      "beforeend",
      createBlogBox(title, urlToImage, day, month, year)
    );
  });

  // دکمه مشاهده بیشتر
  const showMoreBtn = document.createElement("button");
  showMoreBtn.textContent = "مشاهده بیشتر";
  showMoreBtn.className =
    "mt-8 block mx-auto px-4 py-2 bg-violet-500 hover:bg-violet-700 text-white rounded-xl transition";

  showMoreBtn.addEventListener("click", () => {
    const rest = articles.slice(12);
    rest.forEach((article) => {
      const { title, urlToImage, publishedAt } = article;
      const { day, month, year } = formatDate(publishedAt);
      blogItemsContainer.insertAdjacentHTML(
        "beforeend",
        createBlogBox(title, urlToImage, day, month, year)
      );
    });
    showMoreBtn.remove(); // بعد از نمایش همه، دکمه حذف میشه
  });

  container.innerHTML = `
    <div class="container mt-20">
      <div class="text-slate-700 dark:text-white flex items-end justify-between mb-4">
        <h2 class="font-AlibabaLight text-xl md:text-3xl">همه مقالات</h2>
      </div>
    </div>
  `;

  container.querySelector(".container").appendChild(blogItemsContainer);
  container.querySelector(".container").appendChild(showMoreBtn);

  return container;
}
