import Cart from "./Cart.js";
import CartStore from "./CartStore.js";
import AuthManager from "./AuthManager.js";
export default class Header {
  constructor() {
    this.cartCount = CartStore.getCount();
    this.theme = localStorage.getItem("theme") || "light";

    this.auth = new AuthManager(
      () => this.updateLoginBtn(),
      () => this.getTheme()
    );

    this.render();
    this.applyTheme();
    this.addEventListeners();
    this.updateLoginBtn();
    this.activeMenuHandler();
    new Cart();
  }

  render() {
    document.getElementById("header-root").innerHTML = `
      <div class="fixed top-9 right-0 left-0 z-50 mx-auto w-[98%] lg:w-[90%] h-24 hidden md:flex items-center px-5 lg:px-10 bg-black/70 rounded-3xl backdrop-blur-[6px] shadow-custom text-violet-200">
        <div class="flex items-center justify-between w-full">
          <nav class="flex h-14 items-center gap-x-9 ">
            <a href="/" data-link class="w-32 h-32">
              <img src="images/logo.png" alt="digital store">
            </a>
            <ul class="flex items-center h-14 gap-x-6 lg:gap-x-9 text-xl text-gray-300 tracking-tightest child:h-full child:leading-[56px] child:transition-colors child-hover:text-violet-300">
              <li class="font-DanaMedium "><a href="/" data-link class='menu-active-link'>صفحه اصلی</a></li>
              <li class="relative group/menu">
                <a  href="/shop" data-link>فروشگاه</a>
                <ul class="absolute top-full opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible w-52 p-6 space-y-4 bg-white text-slate-700 dark:bg-slate-700 dark:text-gray-300 text-base tracking-normal shadow-custom rounded-2xl border-t-[3px] border-t-violet-300 transition-all delay-75 child:transition-colors child-hover:text-violet-300">
               <li><a href="/categories/laptops" data-link>لپ تاپ</a></li>
                <li><a href="/categories/tablets" data-link>تبلت</a></li>
                <li><a href="/categories/smartphones" data-link>موبایل</a></li>
              <li class="relative group/submenu">
                <a href="/categories/watches">ساعت</a>
                <ul class="absolute top-full right-[20%] opacity-0 invisible group-hover/submenu:opacity-100 group-hover/submenu:visible w-52 p-6 space-y-4 bg-white text-slate-700 dark:bg-slate-700 dark:text-gray-300 text-base tracking-normal shadow-custom rounded-2xl border-t-[3px] border-t-violet-300 transition-all delay-75 child:transition-colors child-hover:text-violet-300 duration-200 z-50">
                  <li><a href="/categories/mens-watches" data-link>مردانه</a></li>
                  <li><a href="/categories/womens-watches" data-link>زنانه</a></li>
                </ul>
              </li>
                <li><a href="/categories/mobile-accessories" data-link>لوازم جانبی</a></li> 
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
                <div  class="block">
                  <svg class="h-8 w-8"><use href="#cart"></use></svg>
                  <span id="cartBadge" class="absolute -top-1 -right-2 bg-violet-400 text-black text-xs px-1.5 py-0.5 rounded-full 
                  ${this.cartCount === 0 ? "hidden" : ""}">
                    ${this.cartCount}
                  </span>
                </div>
              </div>
              <div class="py-3">
                <div class="hover:cursor-pointer" id="themeBtn">
                  <svg class="h-8 w-8"><use href="#moon"></use></svg>
                </div>
              </div>
            </div>
            <span class="block w-px h-14 bg-white/20"></span>
            <button  class="registerBtn flex items-center gap-x-2.5 tracking-tightest hover:cursor-pointer">
            </button>
          </div>
        </div>
      </div>
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
    document
      .getElementById("themeBtn")
      ?.addEventListener("click", () => this.toggleTheme());
    document.querySelector(".registerBtn")?.addEventListener("click", () => {
      if (this.auth.isLoggedIn()) {
        this.auth.logOut();
      } else {
        this.auth.showRegisterForm();
      }
    });
  }
  updateLoginBtn() {
    const btn = document.querySelector(".registerBtn");
    const { username } = this.auth.getUserInfo();
    if (!btn) return;

    btn.innerHTML = this.auth.isLoggedIn()
      ? `<svg class="h-8 w-8 hidden xl:inline-block"><use href="#arrow-right-start-on-rectangle"></use></svg><span>${username}</span>`
      : `<svg class="h-8 w-8 hidden xl:inline-block"><use href="#arrow-right-start-on-rectangle"></use></svg><span>ورود | ثبت نام</span>`;
  }
  getTheme() {
    return localStorage.getItem("theme") === "dark" ? "dark" : "light";
  }
  activeMenuHandler() {
    this.menuLinks = document.querySelectorAll("a[data-link]");
    this.menuLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        this.menuLinks.forEach((l) => l.classList.remove("menu-active-link"));
        e.currentTarget.classList.add("menu-active-link");
      });
    });
  }
}
