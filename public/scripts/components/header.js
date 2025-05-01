export default class Header {
  constructor() {
    this.cartItems = this.getCartItems();
    this.theme = localStorage.getItem("theme") || "light";

    this.render();
    this.applyTheme();
    this.addEventListeners();
    this.createCartBox();
  }

  render() {
    document.getElementById("header-root").innerHTML = `
      <header class="fixed top-9 right-0 left-0 z-50 mx-auto w-[98%] lg:w-[90%] h-24 hidden md:flex items-center px-5 lg:px-10 bg-black/70 rounded-3xl backdrop-blur-[6px] shadow-custom text-violet-200">
        <div class="flex items-center justify-between w-full">
          <nav class="flex h-14 items-center gap-x-9 ">
            <a href="#" class="w-32 h-32">
              <img src="images/logo.png" alt="digital store">
            </a>
            <ul class="flex items-center h-14 gap-x-6 lg:gap-x-9 text-xl text-gray-300 tracking-tightest child:h-full child:leading-[56px] child:transition-colors child-hover:text-violet-300">
              <li class="font-DanaMedium text-violet-200"><a href="./index.html">صفحه اصلی</a></li>
              <li class="relative group">
                <a href="./shop.html">فروشگاه</a>
                <ul class="absolute top-full opacity-0 invisible group-hover:opacity-100 group-hover:visible w-52 p-6 space-y-4 bg-white text-slate-700 dark:bg-slate-700 dark:text-gray-300 text-base tracking-normal shadow-custom rounded-2xl border-t-[3px] border-t-violet-300 transition-all delay-75 child:transition-colors child-hover:text-violet-300">
                  <li><a href="#">کنسول‌های بازی</a></li>
                  <li><a href="#">کامپیوترهای گیمینگ</a></li>
                  <li><a href="#">لپ تاپ گیمینگ</a></li>
                  <li><a href="#">لوازم جانبی</a></li>
                  <li><a href="#">مودم</a></li>
                  <li><a href="#">سخت افزار</a></li>
                </ul>
              </li>
              <li><a href="./index.html">بلاگ</a></li>
              <li><a href="./about-us.html">درباره ما</a></li>
              <li><a href="./contact-us.html">تماس با ما</a></li>
            </ul>
          </nav>
          <div class="flex h-14 items-center gap-x-4 lg:gap-x-6 text-xl">
            <div class="flex h-full gap-x-3">
              <div class="py-3 relative group" id="cartBtn">
                <div class="hover:cursor-pointer">
                  <svg class="h-8 w-8"><use href="#cart"></use></svg>
                  <span id="cartBadge" class="absolute -top-1 -right-2 bg-violet-400 text-black text-xs px-1.5 py-0.5 rounded-full ${this.cartItems.length === 0 ? 'hidden' : ''}">
                    ${this.cartItems.length}
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
    if (this.theme === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }

  toggleTheme() {
    this.theme = this.theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", this.theme);
    this.applyTheme();
  }

  getCartItems() {
    return JSON.parse(localStorage.getItem("cart")) || [];
  }
// update badge icon od cart
  updateCartBadge() {
    const cartBadge = document.getElementById("cartBadge");
    const count = this.getCartItems().length;
    if (count > 0) {
      cartBadge.classList.remove("hidden");
      cartBadge.textContent = count;
    } else {
      cartBadge.classList.add("hidden");
    }
  }

  createCartBox() {
    let cartContainer = document.createElement("div");
    cartContainer.id = "cartDropdown";
    cartContainer.className = `
      absolute top-full left-0 mt-2 w-96 bg-white dark:bg-slate-800 text-black dark:text-white
      rounded-xl shadow-lg p-4 z-50 border-t-[3px] border-t-violet-300
      opacity-0 invisible transition-all duration-200  
      group-hover:opacity-100 group-hover:visible
    `;
    document.getElementById("cartBtn").appendChild(cartContainer);
    this.cartDropdown = cartContainer;
    this.renderCart();
  }
  

  renderCart() {
    const cartItems = this.getCartItems();

    if (cartItems.length === 0) {
      this.cartDropdown.innerHTML = `
        <h4 class="text-center text-violet-400 py-4">سبد خرید شما خالی است</h4>
      `;
    } else {
      this.cartDropdown.innerHTML = `
        <!-- header -->
        <div class="flex items-center justify-between font-DanaMedium text-xs">
          <span class="text-gray-300 ">${cartItems.length} مورد</span>
          <a href="#" class="flex items-center justify-between text-violet-300">
            مشاهده سبد خرید
            <svg class="w-4 h-4"><use href="#arrow-left"></use></svg>
          </a>
        </div>

        <!-- body -->
        <div class="cartProducts mt-2 pb-1 border-b border-b-gray-300 dark:border-b-white divide-y divide-gray-300 dark:divide-white/50 overflow-y-auto max-h-[350px] child:py-5" dir="rtl">
          ${cartItems.map(item => `
            <div class="flex items-start justify-start gap-x-2.5">
              <img src="${item.image}" class="w-[120px] h-[130px] object-contain" alt="product">
              <div>
                <div>
                  <span class="max-h-[50px] text-slate-700 dark:text-white text-base line-clamp-2 p-1">${item.title}</span>
                </div>
                <div class="flex flex-col justify-between mt-8">
                  <span class="text-teal-600 dark:text-emerald-500 text-xs tracking-tighter">${item.discount}</span>
                  <div class="text-slate-700 dark:text-white font-DanaDemiBold">
                    <span>${item.price}</span>
                    <span class="font-Dana text-xs">تومان</span>
                  </div>
                </div>
              </div>
            </div>
          `).join("")}
        </div>

        <!-- footer -->
        <div class="flex items-center justify-between mt-6">
          <div class="flex flex-col justify-between mt-6">
            <span class="font-DanaMedium text-gray-300 text-xs tracking-tighter">مبلغ قابل پرداخت</span>
            <div class="text-slate-700 dark:text-white font-DanaDemiBold">
              <span>${this.calculateTotal(cartItems)}</span>
              <span class="font-Dana text-xs">تومان</span>
            </div>
          </div>
          <a class="flex items-center justify-center w-[144px] h-14 text-gray-100 bg-teal-600 hover:bg-teal-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 rounded-xl" href="#">
            ثبت سفارش
          </a>
        </div>
      `;
    }
  }

  calculateTotal(items) {
    return items.reduce((sum, item) => sum + item.price, 0).toLocaleString();
  }

  addEventListeners() {
    const themeBtn = document.getElementById("themeBtn");

    themeBtn.addEventListener("click", () => this.toggleTheme());

    window.addEventListener("storage", () => {
      this.cartItems = this.getCartItems();
      this.updateCartBadge();
      this.renderCart();
    });
  }
}
