export default class MobileMenu {
  constructor() {
    this.topbarTarget = document.querySelector("#mobileTopBar");
    this.menuTarget = document.querySelector("#mobileMenu");
    this.render();
    this.cacheElements();
    this.bindEvents();
    this.themeBtnHandler()
  }

  render() {
    this.topbarTarget.innerHTML = `
      <div class="flex md:hidden items-center justify-between bg-white dark:bg-zinc-700 px-4 h-16">
        <div id="mobile-menu-btn">
          <svg class="w-6 h-6 text-zinc-700 dark:text-white">
            <use href="#bars-3"></use>
          </svg>
        </div>
        <div>
          <a href="#" class="block w-26 h-26">
            <img src="images/logo.png" alt="digital store" class="h-fit w-fit">
          </a>
        </div>
        <div id="mobile-cart-btn">
          <svg class="w-6 h-6 text-zinc-700 dark:text-white">
            <use href="#cart"></use>
          </svg>
        </div>
      </div>
    `;

    this.menuTarget.innerHTML = `
      <div class="mobile_menu fixed md:hidden top-0 translate-x-full flex flex-col h-full bg-white dark:bg-zinc-700 min-h-screen w-64 z-20 p-4 overflow-y-scroll transition-all delay-75">
        <div class="flex items-center justify-between pb-3 mb-6 border-b border-b-gray-300 dark:border-b-white/10">
          <div>
            <img src="images/fav-icon.png" class="w-20" alt="logo">
          </div>
          <svg class="h-5 w-5 text-zinc-400 dark:text-white cursor-pointer" id="close-mobile-menu">
            <use href="#x-mark"></use>
          </svg>
        </div>
        <div>
          <ul class="text-zinc-600 dark:text-white space-y-2 child:p-1 child:pr-2.5 child:rounded-md">
            <li class="bg-violet-200/30 pr-0">
              <a href="#" class="flex items-center gap-x-2">
                <svg class="w-5 h-5 inline-block"><use href="#home"></use></svg>
                صفحه اصلی
              </a>
            </li>
            <li>
              <div class="flex items-center justify-between">
                <a href="#">
                  <div class="flex items-center justify-between">
                    <div>
                      <svg class="w-5 h-5 inline-block"><use href="#cart"></use></svg>
                      فروشگاه
                    </div>
                  </div>
                </a>
                <span id="submenu_open_btn">
                  <svg class="w-5 h-5 inline-block hover:text-violet-400"><use href="#chevron-down"></use></svg>
                </span>
              </div>
              <ul class="submenu">
                <li><a href="#">کنسول‌های بازی</a></li>
                <li><a href="#">کامپیوترهای گیمینگ</a></li>
                <li><a href="#">لپ تاپ گیمینگ</a></li>
                <li><a href="#">لوازم جانبی</a></li>
                <li><a href="#">مودم</a></li>
                <li><a href="#">سخت افزار</a></li>
              </ul>
            </li>
            <li><a href="#"><svg class="w-5 h-5 inline-block"><use href="#document-text"></use></svg> بلاگ</a></li>
            <li><a href="#"><svg class="w-5 h-5 inline-block"><use href="#briefcase"></use></svg> درباره ما</a></li>
            <li><a href="#"><svg class="w-5 h-5 inline-block"><use href="#phone-arrow-up-righ"></use></svg> تماس با ما</a></li>
          </ul>
        </div>
        <div class="w-[90%] flex flex-col items-start pt-3 mt-6 px-2.5 space-y-4 text-violet-300 border-t border-t-gray-300 dark:border-t-white/10">
          <a href="#"><svg class="w-5 h-5 inline-block"><use href="#arrow-right-start-on-rectangle"></use></svg> ورود | ثبت نام</a>
          <button id="mobileThemeBtn"></button>
          <a href="#"><svg class="w-5 h-5 inline-block"><use href="#cart"></use></svg> سبد خرید</a>
        </div>
      </div>
      <div class="overlay opacity-0 invisible md:hidden fixed inset-0 bg-black/40 z-10 transition-all delay-75" id="overlay"></div>
    `;
  }

  cacheElements() {
    this.menu = document.querySelector(".mobile_menu");
    this.overlay = document.getElementById("overlay");
    this.menuBtn = document.getElementById("mobile-menu-btn");
    this.closeBtn = document.getElementById("close-mobile-menu");
    this.submenuBtn = document.getElementById("submenu_open_btn");
    this.submenu = this.menu.querySelector(".submenu");
  }

  bindEvents() {
    this.menuBtn?.addEventListener("click", () => this.openMenu());
    this.overlay?.addEventListener("click", () => this.closeMenu());
    this.closeBtn?.addEventListener("click", () => this.closeMenu());
    this.submenuBtn?.addEventListener("click", () => this.toggleSubmenu());
  }

  openMenu() {
    this.menu.classList.remove("translate-x-full");
    this.overlay.classList.remove("opacity-0", "invisible");
  }

  closeMenu() {
    this.menu.classList.add("translate-x-full");
    this.overlay.classList.add("opacity-0", "invisible");
  }

  toggleSubmenu() {
    this.submenu.classList.toggle("submenu--open");
  }
  themeBtnHandler() {
    const themeButton = document.getElementById("mobileThemeBtn");
    const currentTheme = localStorage.getItem("theme");
    const isDark = currentTheme === "dark";

    // تنظیم محتوای دکمه بر اساس تم
    this.setThemeButtonContent(themeButton, isDark);

    // افزودن رویداد کلیک برای تغییر تم
    themeButton.addEventListener("click", () => {
      const newTheme = document.documentElement.classList.contains("dark")
        ? "light"
        : "dark";
      document.documentElement.classList.toggle("dark");
      localStorage.setItem("theme", newTheme);
      this.setThemeButtonContent(themeButton, newTheme === "dark");
    });
  }
  setThemeButtonContent(themeButton, isDark) {
    if (isDark) {
      themeButton.innerHTML = `
            <svg class="w-5 h-5 hidden dark:inline-block">
                <use href="#sun"></use>
            </svg>
            <span class="hidden dark:inline-block">تم روشن</span>`;
    } else {
      themeButton.innerHTML = `
            <svg class="w-5 h-5 inline-block dark:hidden">
                <use href="#moon"></use>
            </svg>
            <span class="inline-block dark:hidden">تم تیره</span>`;
    }
  }
}
