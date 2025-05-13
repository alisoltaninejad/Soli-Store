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

const app = document.getElementById("app");
const loading = document.getElementById("loading"); // المان لودینگ (مثلاً <div id="loading">)

export async function render() {
  const path = window.location.pathname;
  const page = routes[path];

  // نمایش لودینگ
  if (loading) loading.style.display = "flex";
  app.innerHTML = "";

  try {
    if (page) {
      const content = await Promise.resolve(page());
      if (content instanceof HTMLElement) {
        app.appendChild(content);
      } else {
        app.innerHTML = content;
      }
    } else {
      const content = NotFound();
      if (content instanceof HTMLElement) {
        app.appendChild(content);
      } else {
        app.innerHTML = content;
      }
    }
  } catch (err) {
    app.innerHTML = "<p>خطا در بارگذاری صفحه</p>";
    console.error("Page load error:", err);
  } finally {
    // مخفی کردن لودینگ
    if (loading) loading.style.display = "none";
  }
}

export function navigate(url) {
  window.history.pushState({}, "", url);
  render();
}

// پشتیبانی از back و forward مرورگر
window.addEventListener("popstate", render);
