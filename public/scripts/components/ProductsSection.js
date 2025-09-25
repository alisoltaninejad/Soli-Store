import Swal from "https://cdn.jsdelivr.net/npm/sweetalert2/+esm";
import CartStore from "./CartStore.js";
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
      return `<h2 class="flex items-center justify-center w-full h-36 text-4xl dark:text-gray-300">
      خطا در دریافت محصولات!
       <svg class="w-12 h-12 m-3">
              <use href="#cart"></use>
            </svg>
      <h2>`;
    }

    // 👇 بررسی عرض صفحه برای تعیین تعداد محصولات
    const screenWidth = window.innerWidth;
    let maxProductsToShow = 8;

    if (screenWidth >= 769 && screenWidth <= 1027) {
      maxProductsToShow = 6;
    }

    return `
      <div class="container mt-20">
        <div class="text-slate-700 dark:text-white flex items-end justify-between">
          <h2 class="font-AlibabaLight text-xl md:text-3xl">
            جدیدترین محصولات<br> 
            <span class="text-sm">با بهترین کیفیت</span>
          </h2>
          <a href="/shop" data-link class="flex items-center justify-between text-violet-300">
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
      <div class="product flex flex-col text-slate-700 dark:text-white drop-shadow-md bg-violet-200 dark:bg-slate-600 rounded-2xl  h-full min-h-[360px] max-w-[280px] p-3 md:p-2" data-id="${
        product.id
      }">
        <img src="${product.thumbnail || "./images/default.png"}" alt="${
      product.title
    }" class="min-w-[200px] min-h-[170px] m-auto object-contain">
        <div class="flex flex-col justify-between  p-4 space-y-3 text-center">
          <h4 class="flex items-baseline justify-center min-h-[48px] max-h-[50px] text-base line-clamp-2 ">${
            product.title
          }</h4>
          <div class="w-[100%] flex  items-end justify-between mx-auto md:px-3">
            <div class="flex flex-col items-start  text-slate-700 dark:text-white font-DanaDemiBold">
            ${
              product.discountPercentage > 0
                ? `<span class="line-through decoration-1 decoration-red-500 text-xs">
                  ${(Math.round(product.price) * 1000).toLocaleString(
                    "fa-IR"
                  )} <span class="font-Dana">تومان</span>
                </span>`
                : ""
            }
        <span>
            ${(
              Math.round(product.price * (1 - product.discountPercentage / 100)) * 1000
            ).toLocaleString("fa-IR")}
            <span class="font-Dana text-xs">تومان</span>
          </span>
            </div>
            <div>
       <span class="bg-green-500 text-white px-1 py-0.5 rounded-md text-sm tracking-tighter">
       ${
         product.discountPercentage > 0
           ? Math.round(product.discountPercentage).toLocaleString("fa-IR") +
             "%"
           : ""
       }
        تخفیف
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
  addEventlisteners() {
    const addToCartBtns = document.querySelectorAll(".addToCartBtn");
    addToCartBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const productID = e.target.closest(".product").dataset.id;
        const product = this.products.find((p) => p.id === Number(productID));

        if (!product) {
          Swal.fire({
            icon: "error",
            title: "خطا",
            text: "محصول مورد نظر یافت نشد یا مشکلی در افزودن رخ داده است.",
            confirmButtonText: "باشه",
            timer: 1250,
            theme: localStorage.getItem("theme") === "dark" ? "dark" : "light",
            showClass: {
              popup: "animate__animated animate__bounceIn",
            },
            hideClass: {
              popup: "animate__animated animate__bounceOut",
            },
          });
          return;
        }

        // گرفتن سبد خرید فعلی از localStorage
        const cart = CartStore.getItems();

        // بررسی وجود محصول در سبد خرید
        const existing = cart.find((item) => item.id === product.id);
        if (existing) {
          existing.quantity += 1;
        } else {
          cart.push({ ...product, quantity: 1 });
        }

        // ذخیره‌سازی دوباره در localStorage
        CartStore.setItems(cart);

        Swal.fire({
          icon: "success",
          title: "محصول اضافه شد",
          text: `${product.title}`,
          timer: 1250,
          theme: localStorage.getItem("theme") === "dark" ? "dark" : "light",
          showConfirmButton: false,
          showClass: {
            popup: "animate__animated animate__bounceIn",
          },
          hideClass: {
            popup: "animate__animated animate__bounceOut",
          },
        });
      });
    });
  }
}
