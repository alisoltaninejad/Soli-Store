export default class ProductsSection {
  constructor() {
    this.products = [];
  }

  async render() {
    try {
      const [laptopRes, tabletRes] = await Promise.all([
        fetch("https://dummyjson.com/products/category/laptops"),
        fetch("https://dummyjson.com/products/category/tablets"),
      ]);

      const [laptopData, tabletData] = await Promise.all([
        laptopRes.json(),
        tabletRes.json(),
      ]);

      this.products = [...laptopData.products, ...tabletData.products];
    } catch (err) {
      console.error("خطا در دریافت محصولات:", err);
      this.products = [];
    }

    // 👇 بررسی عرض صفحه برای تعیین تعداد محصولات
    const screenWidth = window.innerWidth;
    let maxProductsToShow = 8;

    if (screenWidth >= 769 && screenWidth <= 1027) {
      maxProductsToShow = 6;
    }

    return `
      <div class="container mx-auto mt-20 px-4 md:px-2">
        <div class="text-slate-700 dark:text-white flex items-end justify-between">
          <h2 class="font-AlibabaLight text-xl md:text-3xl">
            جدیدترین محصولات<br> 
            <span class="text-sm">با بهترین کیفیت</span>
          </h2>
          <a href="./shop.html" class="flex items-center justify-between text-violet-300">
            مشاهده همه محصولات
            <svg class="w-4 h-4">
              <use href="#arrow-left"></use>
            </svg>
          </a>
        </div>
       <section class="products mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-10">
        ${this.products
          .slice(0, maxProductsToShow)
          .map((p) => this.renderProductCard(p))
          .join("")}
      </section>

      </div>
    `;
  }

  renderProductCard(product) {
    return `
      <div class="flex flex-col text-slate-700 dark:text-white bg-indigo-200 dark:bg-slate-600 rounded-2xl  h-full min-h-[360px] max-w-[280px] p-0.5 md:p-2">
        <img src="${product.thumbnail}" alt="${
      product.title
    }" class="min-w-[200px] min-h-[170px] m-auto object-contain">
        <div class="flex flex-col justify-between  p-4 space-y-3 text-center">
          <h4 class="flex items-baseline justify-center min-h-[48px] max-h-[50px] text-base line-clamp-2 ">${
            product.title
          }</h4>
          <div class="w-[100%] flex  items-end justify-between mx-auto md:px-3">
            <div class="text-slate-700 dark:text-white font-DanaDemiBold">
              <span>${product.price.toLocaleString("fa-IR")}</span>
              <span class="font-Dana text-xs">تومان</span>
            </div>
            <div>
              <span class="text-green-500 dark:text-green-400 text-xs tracking-tighter">
                موجود: ${product.stock} مورد
              </span>
            </div>
          </div>
          <button class="flex items-center justify-center w-[100%] h-9 mt-auto text-gray-100 bg-indigo-500 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 rounded-xl hover:cursor-pointer">
            افزودن به سبدخرید
          </button>
        </div>
      </div>
    `;
  }
}
