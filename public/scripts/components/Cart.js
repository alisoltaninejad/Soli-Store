import CartStore from "./CartStore.js";
export default class Cart {
  constructor() {
    this.cartItems = CartStore.getItems();
    this.createCartBox();
    this.updateCartBadge();
    this.renderCart();
    this.addEventlisteners();
  }
  // update badge icon od cart
  updateCartBadge() {
    const cartBadge = document.getElementById("cartBadge");
    const count = CartStore.getCount();
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
        absolute top-full left-0 mt-2 w-96 bg-gray-100 min-w-[450px]
        rounded-xl shadow-2xl p-4 z-50 border-t-[3px] 
        border-t-violet-300 bg-white text-slate-700 dark:bg-slate-700 dark:text-gray-300
        opacity-0 invisible transition-all duration-200  
        group-hover:opacity-100 group-hover:visible
        `;
    document.getElementById("cartBtn").appendChild(cartContainer);
    this.cartDropdown = cartContainer;
    this.renderCart();
  }
  renderCart() {
    if (this.cartItems.length === 0) {
      this.cartDropdown.innerHTML = `
            <h4 class="text-center text-violet-400 py-4">سبد خرید شما خالی است</h4>
          `;
    } else {
      this.cartDropdown.innerHTML = `
            <!-- header -->
            <div class="flex items-center justify-between font-DanaMedium text-xs">
              <span class="text-gray-300 ">${CartStore.getCount()} مورد</span>
              <a class="flex items-center justify-between text-violet-300">
                 سبد خرید
              </a>
            </div>
    
            <!-- body -->
          <div class="cartProducts mt-2 pb-1 border-b border-b-gray-300 dark:border-b-white divide-y divide-gray-300 dark:divide-white/50 overflow-y-auto max-h-[350px] child:py-5"
              dir="rtl">
              ${this.cartItems
                .map(
                  (item) => `
              <div class="product flex items-start justify-start gap-x-2.5 text-start" data-id="${
                item.id
              }">
                  <img src="${
                    item.thumbnail || "/public/images/default.png"
                  }" class="w-[120px] h-[130px] object-contain" alt="product">
                  <div class="flex flex-col items-center justify-between w-full h-full ml-4">
                      <div class='w-full text-center'>
                          <span class="max-h-[50px]  text-slate-700 dark:text-white text-base line-clamp-2 p-1">${
                            item.title
                          }</span>
                      </div>
                      <div class="flex items-center justify-between w-full ">
              
                          <div class="flex items-center justify-between w-full h-full mt-2">
              
                              <div class="flex flex-col justify-between float-start ">
                                  <span class="bg-green-500 text-white px-1 py-0.5 rounded-md text-sm w-fit tracking-tighter">
                                      ${
                                        item.discountPercentage > 0
                                          ? Math.round(
                                              item.discountPercentage
                                            ).toLocaleString("fa-IR")
                                          : ""
                                      }
                                      %</span>
                  <div class="flex flex-col items-start pt-1 text-slate-700 dark:text-white font-DanaDemiBold">
                      ${
                        item.discountPercentage > 0
                          ? `<span class="line-through decoration-1 decoration-red-500 text-xs">
                              ${(
                                Math.round(item.quantity * item.price) * 1000
                              ).toLocaleString("fa-IR")}
                              <span class="font-Dana">تومان</span>
                            </span>`
                          : ""
                      }
                      <span>
                        ${(
                          Math.round(
                            item.quantity *
                              item.price *
                              (1 - item.discountPercentage / 100)
                          ) * 1000
                        ).toLocaleString("fa-IR")}
                        <span class="font-Dana text-xs">تومان</span>
                      </span>
                    </div>

                      </div>
                      <div class="flex items-center space-x-2 float-end">
                          <!-- دکمه کاهش -->
                          <button
                              class="reduceProductBtn relative w-5 h-5 leading-5 bg-gradient-to-r from-fuchsia-400 to-rose-500 hover:from-fuchsia-600 hover:to-rose-700 text-white font-bold  rounded-full shadow-lg transform transition-transform duration-200 hover:scale-110 active:scale-95">
                              <span class=" flex items-center justify-center absolute  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                  -
                              </span>
                          </button>
      
                          <!-- تعداد فعلی -->
                          <span class="text-md font-semibold px-1.5 py-0.5 rounded bg-gray-100 text-gray-800">
                              ${item.quantity}
                          </span>
      
                          <!-- دکمه افزایش -->
                          <button
                              class="increaseProductBtn relative w-5 h-5 leading-5 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold  rounded-full shadow-lg transform transition-transform duration-200 hover:scale-110 active:scale-95">
                              <span class=" flex items-center justify-center  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                  +
                              </span>
                          </button>
                      </div>
                  </div>
              </div>
          </div>
      </div>
                `
                )
                .join("")}
    </div>
    
            <!-- footer -->
            <div class="flex items-center justify-between mt-6">
              <div class="flex flex-col justify-between mt-6">
                <span class="font-DanaMedium text-gray-300 text-xs tracking-tighter">مبلغ قابل پرداخت</span>
                <div class="text-slate-700 dark:text-white font-DanaDemiBold">
                  <span>${this.calculateTotal(this.cartItems)}</span>
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
    const total = items.reduce((sum, item) => {
      const discountedTotal = Math.round(
        item.quantity * item.price * (1 - item.discountPercentage / 100)
      );
      return sum + discountedTotal * 1000;
    }, 0);

    return total.toLocaleString("fa-IR");
  }

  addEventlisteners = () => {
    this.cartDropdown.addEventListener("click", (e) => {
      if (e.target.closest(".reduceProductBtn")) {
        const targetProductID = e.target.closest(".product")?.dataset.id;

        const targetProduct = this.cartItems.find(
          (item) => item.id === Number(targetProductID)
        );

        try {
          if (targetProduct && targetProduct.quantity > 1) {
            targetProduct.quantity--;
          } else {
            this.cartItems = this.cartItems.filter(
              (i) => i.id !== Number(targetProductID)
            );
          }
          this.persistAndRender();
        } catch (e) {
          console.error("Failed to reduce product quantity!", e);
        }
      }
      if (e.target.closest(".increaseProductBtn")) {
        const targetProductID = e.target.closest(".product")?.dataset.id;

        const targetProduct = this.cartItems.find(
          (item) => item.id === Number(targetProductID)
        );

        try {
          if (targetProduct) {
            targetProduct.quantity++;
          }
          this.persistAndRender();
        } catch (e) {
          console.error("Failed to reduce product quantity!", e);
        }
      }
    });

    window.addEventListener("storage", () => {
      this.cartItems = CartStore.getItems();
      this.updateCartBadge();
      this.renderCart();
    });
  };
  persistAndRender() {
    CartStore.setItems(this.cartItems);
    this.cartItems = CartStore.getItems();
    this.renderCart();
    //یک رویداد سراسری در برنامه تعریف میکنه که هروقت cartUpdated رخ داد این کد اجرا بشه
    window.dispatchEvent(new Event("cartUpdated")); // آگاه کردن MobileMenu
  }
}
