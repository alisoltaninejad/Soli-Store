import AuthManager from "./AuthManager.js";
import MobileCart from "./MobileCart.js";
import CartStore from "./CartStore.js";

export default class MobileMenu {
  constructor() {
    this.openMenu = this.openMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.openCart = this.openCart.bind(this);
    this.closeCart = this.closeCart.bind(this);
    window.addEventListener("cartUpdated", () => this.updateCartBadge());

    this.topbarTarget = document.querySelector("#mobileTopBar");
    this.menuTarget = document.querySelector("#mobileMenu");

    this.cart = new MobileCart();
    this.cartCount = CartStore.getCount(); // ✅ مقداردهی cartCount
    this.render();

    this.cacheElements();

    this.auth = new AuthManager(
      () => this.updateLoginBtn(),
      () => this.getTheme()
    );

    this.updateLoginBtn();
    this.updateCartBadge();
    this.bindEvents();
    this.themeBtnHandler();
    this.activeMenuHandler();
  }

  render() {
    this.topbarTarget.innerHTML = `
      <div class="fixed inset-0 top-0 flex md:hidden items-center justify-between bg-white dark:bg-zinc-700 px-4 h-16 z-20">
        <div id="mobile-menu-btn">
          <svg class="w-6 h-6 text-zinc-700 dark:text-white">
            <use href="#bars-3"></use>
          </svg>
        </div>
        <div>
          <a href="/" data-link class="block w-26 h-26">
            <img src="images/logo.png" alt="digital store" class="h-fit w-fit">
          </a>
        </div>
        <button class="openCartBtn relative">
          <svg class="w-6 h-6 text-zinc-700 dark:text-white">
            <use href="#cart"></use>
          </svg>
          <span id="mobileCartBadge" class="absolute -top-2 -right-3 bg-violet-400 text-gray-900 text-xs px-1.5 py-0.5 rounded-full 
            ${this.cartCount === 0 ? "hidden" : ""}">
              ${this.cartCount}
          </span>
        </button>
      </div>
    `;

    this.menuTarget.innerHTML = `
      <div class="mobile_menu fixed md:hidden top-0 translate-x-full flex flex-col h-full bg-white dark:bg-zinc-700 min-h-screen w-64 z-40 p-4 overflow-y-scroll transition-all delay-75">
        <div class="flex items-center justify-between pb-3 mb-6 border-b border-b-gray-300 dark:border-b-white/10">
          <a href="/" data-link>
            <img src="images/fav-icon.png" class="w-20" alt="logo">
          </a>
          <svg class="h-5 w-5 text-zinc-400 dark:text-white cursor-pointer" id="close-mobile-menu">
            <use href="#x-mark"></use>
          </svg>
        </div>
        <div>
          <ul class="text-zinc-600 dark:text-white space-y-2 child:p-1 child:pr-2.5 child:rounded-md">
            <li>
              <a href="/" data-link class="flex items-center gap-x-2 mobile-menu-active-link">
                <svg class="w-5 h-5 inline-block"><use href="#home"></use></svg>
                صفحه اصلی
              </a>
            </li>
            <li>
              <div class="flex items-center justify-between">
                <a href="/shop" data-link>
                  <div class="flex items-center justify-between">
                    <div>
                      <svg class="w-5 h-5 inline-block"><use href="#cart"></use></svg>
                      فروشگاه
                    </div>
                  </div>
                </a>
                <span class="submenu-toggle cursor-pointer" data-target="#submenu-shop">
                  <svg class="w-5 h-5 inline-block hover:text-violet-400"><use href="#chevron-down"></use></svg>
                </span>
              </div>
              <ul id="submenu-shop" class="submenu">
                <li><a href="/categories/laptops" data-link>لپ تاپ</a></li>
                <li><a href="/categories/tablets" data-link>تبلت</a></li>
                <li><a href="/categories/smartphones" data-link>موبایل</a></li>
                <li >
                  <div class="submenu-toggle cursor-pointer" data-target="#submenu-watches">
                    <a>ساعت</a>
                    <svg class="w-5 h-5 inline-block hover:text-violet-400"><use href="#chevron-down"></use></svg>
                  </div>
                  <ul id="submenu-watches" class="submenu !text-white bg-violet-500 rounded-md !p-0 child:!p-0">
                    <li><a href="/categories/mens-watches" data-link class='p-2'>مردانه</a></li>
                    <li><a href="/categories/womens-watches" data-link class='p-2'>زنانه</a></li>
                  </ul>
                </li>
                <li><a href="/categories/mobile-accessories" data-link>لوازم جانبی</a></li> 
              </ul>
            </li>
            <li><a href="/blog" data-link><svg class="w-5 h-5 inline-block"><use href="#document-text"></use></svg> بلاگ</a></li>
            <li><a href="/about" data-link><svg class="w-5 h-5 inline-block"><use href="#briefcase"></use></svg> درباره ما</a></li>
            <li><a href="/contact" data-link><svg class="w-5 h-5 inline-block"><use href="#phone-arrow-up-righ"></use></svg> تماس با ما</a></li>
          </ul>
        </div>
        <div class="w-[90%] flex flex-col items-start pt-3 mt-6 px-2.5 space-y-4  text-violet-300 border-t border-t-gray-300 dark:border-t-white/10">
          <button class='mobileRegBtn text-right'><svg class="w-5 h-5 inline-block"><use href="#arrow-right-start-on-rectangle"></use></svg> ورود | ثبت نام</button>
          <button id="mobileThemeBtn"></button>
          <button class='openCartBtn'><svg class="w-5 h-5 inline-block"><use href="#cart"></use></svg> سبد خرید</button>
        </div>
      </div>
      <div class="overlay opacity-0 invisible md:hidden fixed inset-0 bg-black/40 z-30 transition-all delay-75" id="overlay"></div>
    `;
  }

  cacheElements() {
    this.menu = document.querySelector(".mobile_menu");
    this.overlay = document.getElementById("overlay");
    this.menuBtn = document.getElementById("mobile-menu-btn");
    this.closeBtn = document.getElementById("close-mobile-menu");
    this.themeButton = document.getElementById("mobileThemeBtn");
    this.cartBox = document.querySelector(".cartBox");
    this.openCartBtns = document.querySelectorAll(".openCartBtn");
    this.closeCartBtn = document.getElementById("close-cart-menu"); 
    this.menuLinks = this.menu.querySelectorAll("a[data-link]"); 
  }

  bindEvents() {
    this.menuBtn?.addEventListener("click", this.openMenu);
    this.overlay?.addEventListener("click", this.closeMenu);
    this.closeBtn?.addEventListener("click", this.closeMenu);

    // ✅ اصلاح toggleSubmenu بدون متد اضافه
    document.querySelectorAll(".submenu-toggle").forEach((toggle) => {
      toggle.addEventListener("click", () => {
        const targetSelector = toggle.getAttribute("data-target");
        const submenu = document.querySelector(targetSelector);
        if (submenu) submenu.classList.toggle("submenu--open");
      });
    });

    this.openCartBtns.forEach((btn) => {
      btn.addEventListener("click", this.openCart);
    });

    this.closeCartBtn?.addEventListener("click", this.closeCart);
    this.overlay?.addEventListener("click", this.closeCart);

    document.querySelector(".mobileRegBtn")?.addEventListener("click", () => {
      if (this.auth.isLoggedIn()) {
        this.auth.logOut();
      } else {
        this.auth.showRegisterForm();
      }
    });

    window.addEventListener("storage", () => {
      this.cartItems = CartStore.getItems();
      this.updateCartBadge();
    });
  }

  openMenu() {
    this.menu.classList.remove("translate-x-full");
    this.overlay.classList.remove("opacity-0", "invisible");
    this.overlay.classList.add("opacity-100", "visible");
  }

  closeMenu() {
    this.menu.classList.add("translate-x-full");
    this.overlay.classList.remove("opacity-100", "visible");
    this.overlay.classList.add("opacity-0", "invisible");
  }

  openCart() {
    this.cartBox.classList.add("left-0");
    this.cartBox.classList.remove("-left-full");
    this.overlay.classList.remove("opacity-0", "invisible");
    this.overlay.classList.add("opacity-100", "visible");
  }

  closeCart() {
    this.cartBox.classList.remove("left-0");
    this.cartBox.classList.add("-left-full");
    this.overlay.classList.remove("opacity-100", "visible");
    this.overlay.classList.add("opacity-0", "invisible");
  }

  themeBtnHandler() {
    const currentTheme = localStorage.getItem("theme");
    const isDark = currentTheme === "dark";

    this.setThemeButtonContent(this.themeButton, isDark);

    this.themeButton?.addEventListener("click", () => {
      const newTheme = document.documentElement.classList.contains("dark")
        ? "light"
        : "dark";
      document.documentElement.classList.toggle("dark");
      localStorage.setItem("theme", newTheme);
      this.setThemeButtonContent(this.themeButton, newTheme === "dark");
    });
  }

  setThemeButtonContent(themeBtn, isDark) {
    if (!themeBtn) return;
    if (isDark) {
      themeBtn.innerHTML = `
        <svg class="w-5 h-5 hidden dark:inline-block">
            <use href="#sun"></use>
        </svg>
        <span class="hidden dark:inline-block">تم روشن</span>`;
    } else {
      themeBtn.innerHTML = `
        <svg class="w-5 h-5 inline-block dark:hidden">
            <use href="#moon"></use>
        </svg>
        <span class="inline-block dark:hidden">تم تیره</span>`;
    }
  }

  updateLoginBtn() {
    const btn = document.querySelector(".mobileRegBtn");
    const { username } = this.auth.getUserInfo();
    if (!btn) return;

    btn.innerHTML = this.auth.isLoggedIn()
      ? `<svg class="h-4 w-4 inline-block"><use href="#arrow-right-start-on-rectangle"></use></svg><span>سلام خوش آمدی ${username}</span>`
      : `<svg class="h-4 w-4 inline-block"><use href="#arrow-right-start-on-rectangle"></use></svg><span>ورود | ثبت نام</span>`;
  }

  getTheme() {
    return localStorage.getItem("theme") === "dark" ? "dark" : "light";
  }

  updateCartBadge() {
    const cartBadge = document.getElementById("mobileCartBadge");
    const count = CartStore.getCount();
    if (cartBadge) {
      if (count > 0) {
        cartBadge.classList.remove("hidden");
        cartBadge.textContent = count;
      } else {
        cartBadge.classList.add("hidden");
      }
    }
  }

  activeMenuHandler() {
    this.menuLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        this.menuLinks.forEach((l) => l.classList.remove("mobile-menu-active-link"));
        e.currentTarget.classList.add("mobile-menu-active-link");
      });
    });
  }
}
