import Cart from "./Cart.js";
import CartStore from "./CartStore.js";
export default class Header {
  constructor() {
    const cartCount = CartStore.getCount();
    this.theme = localStorage.getItem("theme") || "light";
    this.render();
    this.applyTheme();
    this.addEventListeners();
    const cartInstance = new Cart();
  }

  render() {
    document.getElementById("header-root").innerHTML = `
      <header class="fixed top-9 right-0 left-0 z-50 mx-auto w-[98%] lg:w-[90%] h-24 hidden md:flex items-center px-5 lg:px-10 bg-black/70 rounded-3xl backdrop-blur-[6px] shadow-custom text-violet-200">
        <div class="flex items-center justify-between w-full">
          <nav class="flex h-14 items-center gap-x-9 ">
            <a href="/" data-link class="w-32 h-32">
              <img src="images/logo.png" alt="digital store">
            </a>
            <ul class="flex items-center h-14 gap-x-6 lg:gap-x-9 text-xl text-gray-300 tracking-tightest child:h-full child:leading-[56px] child:transition-colors child-hover:text-violet-300">
              <li class="font-DanaMedium text-violet-200"><a href="/" data-link>صفحه اصلی</a></li>
              <li class="relative group">
                <a  href="/shop" data-link>فروشگاه</a>
                <ul class="absolute top-full opacity-0 invisible group-hover:opacity-100 group-hover:visible w-52 p-6 space-y-4 bg-white text-slate-700 dark:bg-slate-700 dark:text-gray-300 text-base tracking-normal shadow-custom rounded-2xl border-t-[3px] border-t-violet-300 transition-all delay-75 child:transition-colors child-hover:text-violet-300">
                  <li><a href="/" data-link>کنسول‌های بازی</a></li>
                  <li><a href="/" data-link>کامپیوترهای گیمینگ</a></li>
                  <li><a href="/" data-link>لپ تاپ گیمینگ</a></li>
                  <li><a href="/" data-link>لوازم جانبی</a></li>
                  <li><a href="/" data-link>مودم</a></li>
                  <li><a href="/" data-link>سخت افزار</a></li>
                </ul>
              </li>
              <li><a href="/blog" data-link>بلاگ</a></li>
              <li><a href="/about" data-link>درباره ما</a></li>
              <li><a href="/contact" data-link>تماس با ما</a></li>
            </ul>
          </nav>
          <div class="flex h-14 items-center gap-x-4 lg:gap-x-6 text-xl">
            <div class="flex h-full gap-x-3">
              <div class=" py-3 relative group" id="cartBtn">
                <a href="/cart" data-link class="block hover:cursor-pointer">
                  <svg class="h-8 w-8"><use href="#cart"></use></svg>
                  <span id="cartBadge" class="absolute -top-1 -right-2 bg-violet-400 text-black text-xs px-1.5 py-0.5 rounded-full 
                  ${this.cartCount === 0 ? "hidden" : ""}">
                    ${this.cartCount}
                  </span>
                </a>
              </div>
              <div class="py-3">
                <div class="hover:cursor-pointer" id="themeBtn">
                  <svg class="h-8 w-8"><use href="#moon"></use></svg>
                </div>
              </div>
            </div>
            <span class="block w-px h-14 bg-white/20"></span>
            <a href="#" class="flex items-center gap-x-2.5 tracking-tightest">
              <svg class="h-8 w-8"><use href="#arrow-right-start-on-rectangle"></use></svg>
              <span class="hidden xl:inline-block">ورود | ثبت نام</span>
            </a>
          </div>
        </div>
      </header>
    `;
  }

  applyTheme() {
    const html = document.documentElement;
    const themeBtn = document.getElementById("themeBtn");
    if (this.theme === "dark") {
      html.classList.add("dark");
      themeBtn.innerHTML = `<svg class="h-8 w-8"><use href="#sun"></use></svg>`;
    } else {
      html.classList.remove("dark");
      themeBtn.innerHTML = `<svg class="h-8 w-8"><use href="#moon"></use></svg>`;
    }
  }

  toggleTheme() {
    this.theme = this.theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", this.theme);
    this.applyTheme();
  }

  addEventListeners() {
    const themeBtn = document.getElementById("themeBtn");
    themeBtn.addEventListener("click", () => this.toggleTheme());
  }
}
