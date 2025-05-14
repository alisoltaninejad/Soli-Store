import Swal from "https://cdn.jsdelivr.net/npm/sweetalert2/+esm";
import CartStore from "/public/scripts/components/CartStore.js";

export default class CategoryPage {
  constructor(category) {
    this.category = category;
    this.products = [];
  }

  async render() {
    try {
      const res = await fetch(`https://dummyjson.com/products/category/${this.category}`);
      const data = await res.json();
      this.products = data.products;
    } catch (err) {
      console.error("خطا در دریافت محصولات:", err);
      this.products = [];
      return `<h2 class="flex items-center justify-center w-full h-36 text-4xl dark:text-gray-300">
        خطا در دریافت محصولات!
        <svg class="w-12 h-12 m-3">
          <use href="#cart"></use>
        </svg>
      </h2>`;
    }

    // رندر کارت‌ها
    const content = `
      <div class="container mt-32 md:mt-48 min-h-screen">
        <div class="text-slate-700 dark:text-white flex items-end justify-between">
          <h2 class="font-AlibabaLight text-center text-xl md:text-3xl capitalize">
            محصولات دسته ${this.category}
          </h2>
        </div>
        <section class="products mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-10">
          ${this.products.map(p => this.renderProductCard(p)).join("")}
        </section>
      </div>
    `;

    setTimeout(() => this.addEventListeners(), 0); // افزودن رویدادها بعد از DOM رندر

    return content;
  }

  renderProductCard(product) {
    return `
      <div class="product flex flex-col text-slate-700 dark:text-white bg-indigo-200 dark:bg-slate-600 rounded-2xl h-full min-h-[360px] max-w-[280px] p-0.5 md:p-2" data-id="${product.id}">
        <img src="${product.thumbnail || "./images/default.png"}" alt="${product.title}" class="min-w-[200px] min-h-[170px] m-auto object-contain">
        <div class="flex flex-col justify-between p-4 space-y-3 text-center">
          <h4 class="flex items-baseline justify-center min-h-[48px] max-h-[50px] text-base line-clamp-2">${product.title}</h4>
          <div class="w-[100%] flex items-end justify-between mx-auto md:px-3">
            <div class="flex flex-col items-start text-slate-700 dark:text-white font-DanaDemiBold">
              ${
                product.discountPercentage > 0
                  ? `<span class="line-through decoration-1 decoration-red-500 text-xs">
                      ${product.price.toLocaleString("fa-IR")} <span class="font-Dana">تومان</span>
                    </span>`
                  : ""
              }
              <span>${(product.price * (1 - product.discountPercentage / 100)).toLocaleString("fa-IR")}
                <span class="font-Dana text-xs">تومان</span>
              </span>
            </div>
            <div>
              <span class="text-green-500 dark:text-green-400 text-xs tracking-tighter">
                ${product.discountPercentage > 0 ? product.discountPercentage.toLocaleString("fa-IR") + "٪" : ""}
              </span>
            </div>
          </div>
          <button class="addToCartBtn flex items-center justify-center w-[100%] h-9 mt-auto text-gray-100 bg-indigo-500 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 rounded-xl hover:cursor-pointer">
            افزودن به سبدخرید
          </button>
        </div>
      </div>
    `;
  }

  addEventListeners() {
    const addToCartBtns = document.querySelectorAll(".addToCartBtn");
    addToCartBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const productID = e.target.closest(".product").dataset.id;
        const product = this.products.find((p) => p.id === Number(productID));

        if (!product) {
          Swal.fire({
            icon: "error",
            title: "خطا",
            text: "محصول یافت نشد!",
            timer: 1250,
            theme: localStorage.getItem("theme") === "dark" ? "dark" : "light",
          });
          return;
        }

        const cart = CartStore.getItems();
        const existing = cart.find((item) => item.id === product.id);
        if (existing) {
          existing.quantity += 1;
        } else {
          cart.push({ ...product, quantity: 1 });
        }
        CartStore.setItems(cart);

        Swal.fire({
          icon: "success",
          title: "محصول اضافه شد",
          text: product.title,
          timer: 1250,
          theme: localStorage.getItem("theme") === "dark" ? "dark" : "light",
          showConfirmButton: false,
        });
      });
    });
  }
}
