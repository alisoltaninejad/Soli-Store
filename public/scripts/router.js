import HomePage from "./pages/Home.js";
import ShopPage from "./pages/Shop.js";
import BlogPage from "./pages/Blog.js";
import AboutPage from "./pages/About.js";
import ContactPage from "./pages/Contact.js";
import NotFound from "./pages/404.js";

import DigitalAccessories from "./pages/categories/Digital-accessories.js";
import Laptop from "./pages/categories/Laptop.js";
import Tablet from "./pages/categories/Tablet.js";
import Mobile from "./pages/categories/Mobile.js";
import Watches from "./pages/categories/Watches.js";
const routes = {
  "/": HomePage,
  "/public/": HomePage,
  "/public/index.html": HomePage,
  "/shop": ShopPage,
  "/blog": BlogPage,
  "/about": AboutPage,
  "/contact": ContactPage,
  "/DigitalAccessories": DigitalAccessories,
  "/Laptop": Laptop,
  "/Tablet": Tablet,
  "/Mobile": Mobile,
  "/Watches": Watches,
};

export async function render() {
  const path = window.location.pathname;
  const page = routes[path];
  
  const app = document.getElementById("app");
  app.innerHTML = "";

  if (page) {
    const content = await Promise.resolve(page());
    app.appendChild(content);
  } else {
    const content = NotFound();
    app.appendChild(content);
  }
}
export function navigate(url) {
  window.history.pushState({}, "", url); // تغییر آدرس بدون reload
  render(); // نمایش محتوای جدید
}

// برای پشتیبانی از دکمه‌های back/forward مرورگر
window.addEventListener("popstate", render);
