export default class BlogSection {
    constructor() {
      this.articles = [];
    }
  
    async fetchBlogs() {
      try {
        const res = await fetch(
          "https://newsapi.org/v2/everything?q=technology&language=en&apiKey=e825dfe0e99344f3a32fd9af1a829daa"
        );
        const data = await res.json();
        this.articles = data.articles.slice(0, 4); // فقط ۴ مقاله اول
      } catch (err) {
        console.error("Error fetching blogs:", err);
      }
    }
  
    formatDate(publishedAt) {
      const date = new Date(publishedAt);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return { day, month, year };
    }
  
    createBlogBox(title, img, day, month, year) {
      return `
        <div class="flex flex-col items-center justify-between p-2 bg-gray-50 dark:bg-slate-600 rounded-3xl shadow-2xs">
          <div class="rounded-3xl overflow-hidden w-full h-full">
            <img src="${img || 'images/category-smaartphone.jpg'}" alt="blog img" class="w-full h-40 object-cover">
          </div>
          <div class="flex justify-between items-start gap-3 px-2 my-3 text-slate-700 dark:text-white">
            <div class="flex-1 text-sm md:text-base lg:text-base line-clamp-2">
              ${title || "عنوان مقاله"}
            </div>
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
  
    async render() {
      await this.fetchBlogs();
  
      const blogItems = this.articles.map(article => {
        const { title, urlToImage, publishedAt } = article;
        const { day, month, year } = this.formatDate(publishedAt);
        return this.createBlogBox(title, urlToImage, day, month, year);
      }).join('');
  
      return `
        <div class="container mt-20">
          <div class="text-slate-700 dark:text-white flex items-end justify-between">
            <h2 class="font-AlibabaLight text-xl md:text-3xl">مطالب خواندنی</h2>
            <a href="/shop" data-link class="flex items-center justify-between text-violet-300">
              مشاهده همه مطالب
              <svg class="w-4 h-4"><use href="#arrow-left"></use></svg>
            </a>
          </div>
          <section class="blogs mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4 gap-y-10">
            ${blogItems}
          </section>
        </div>
      `;
    }
  }
  