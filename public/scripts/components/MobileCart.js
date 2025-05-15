import CartStore from "./CartStore.js";
export default class Cart {
  constructor() {
    this.cartItems = CartStore.getItems();
    this.createcCartBox();
    this.renderCart();
    this.addEventlisteners();
  }

  createcCartBox() {
    let cartContainer = document.createElement("div");
    cartContainer.classList = `cartBox fixed md:hidden top-0  -left-full flex flex-col justify-between  h-full bg-white dark:bg-zinc-700 min-h-screen max-w-[360px] z-40 p-4 transition-all delay-75`;
    this.cartDropdown = cartContainer;
    document.getElementById("mobileCart").append(cartContainer);
    this.renderCart();
  }
  renderCart() {
    if (this.cartItems.length === 0) {
      this.cartDropdown.innerHTML = `
          <!-- header -->
      <div class="flex items-center justify-between  border-b border-b-gray-300 dark:border-b-white/10 py-6">
        <svg class="h-5 w-5 text-zinc-400 dark:text-white cursor-pointer" id="close-cart-menu">
          <use href="#x-mark"></use>
        </svg>  
        <a class="flex items-center justify-between text-violet-300">
        سبد خرید
        </a>
      <span class="text-gray-300 ">${CartStore.getCount()} مورد</span>
      </div>
      
              <h4 class="text-center text-violet-400 py-4  flex  items-center justify-center h-full">سبد خرید شما خالی است</h4>
            `;
    } else {
      this.cartDropdown.innerHTML = `
         <!-- header -->
      <div class="flex items-center justify-between py2 border-b border-b-gray-300 dark:border-b-white/10 py-2">
        <svg class="h-5 w-5 text-zinc-400 dark:text-white cursor-pointer" id="close-cart-menu">
          <use href="#x-mark"></use>
        </svg>  
        <a class="flex items-center justify-between text-violet-300">
        سبد خرید
        </a>
      <span class="text-gray-300 ">${CartStore.getCount()} مورد</span>
      </div>
      
              <!-- body -->
            <div class="cartProducts flex-grow min-h-[80%] py-3 border-b border-b-gray-300 dark:border-b-white divide-y divide-gray-300 dark:divide-white/50 overflow-y-auto max-h-[350px] child:py-2"
                dir="rtl">
                ${this.cartItems
                  .map(
                    (item) => `
                <div class="product flex items-start justify-start gap-x-2.5 text-start" data-id="${
                  item.id
                }">
                    <img src="${
                      item.thumbnail || " ./images/default.png"
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
                                             Math.round(item.price) * 1000
                                           ).toLocaleString(
                                             "fa-IR"
                                           )} <span class="font-Dana">تومان</span>
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
              <div class="flex items-center justify-between pt-3">
                <div class="flex flex-col justify-between ">
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
      this.renderCart();
    });
  };
  persistAndRender() {
    CartStore.setItems(this.cartItems);
    this.cartItems = CartStore.getItems();
    this.renderCart();
    window.dispatchEvent(new Event("cartUpdated"));
  }
}
