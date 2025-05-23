import HomePage from "./pages/Home.js";
import BlogPage from "./pages/Blog.js";
import AboutPage from "./pages/About.js";
import ContactPage from "./pages/Contact.js";
import NotFound from "./pages/404.js";

import CategoryPage from "./pages/CategoryPage.js";

// تعریف مسیرهای ثابت
const routes = {
  "/": HomePage,
  "/public/": HomePage,
  "/public/index.html": HomePage,
  "/blog": BlogPage,
  "/about": AboutPage,
  "/contact": ContactPage,
};
console.log("router.js loaded");

const app = document.getElementById("app");
const loading = document.getElementById("loading"); // المان لودینگ (مثلاً <div id="loading">)

export async function render() {
  console.log("Rendering...");
  const path = window.location.pathname;

  // نمایش لودینگ
  if (loading) loading.style.display = "flex";
  app.innerHTML = "";

  try {
    const path = window.location.pathname;
  
    // اگر مسیر دسته‌بندی بود: /categories/:category
    const categoryMatch = path.match(/^\/categories\/(.+)/);
    if (categoryMatch) {
      const category = decodeURIComponent(categoryMatch[1]);
      const page = new CategoryPage(category);
      const content = await page.render();
  
      if (content instanceof HTMLElement) {
        app.appendChild(content);
      } else {
        app.innerHTML = content;
      }
      return;
    }
  
    // اگر مسیر فروشگاه بود: /shop
    if (path === "/shop") {
      const page = new CategoryPage("shop");
      const content = await page.render();
  
      if (content instanceof HTMLElement) {
        app.appendChild(content);
      } else {
        app.innerHTML = content;
      }
      return;
    }
  
    // بررسی مسیرهای ثابت
    const page = routes[path];
    if (page) {
      let content;
  
      if (typeof page === "function") {
        content = await page();
      } else if (typeof page.render === "function") {
        content = await page.render();
      } else {
        throw new Error("صفحه به‌درستی تعریف نشده است");
      }
  
      if (content instanceof HTMLElement) {
        app.appendChild(content);
      } else {
        app.innerHTML = content;
      }
    } else {
      // نمایش صفحه 404
      const notFoundContent = await NotFound();
      if (notFoundContent instanceof HTMLElement) {
        app.appendChild(notFoundContent);
      } else {
        app.innerHTML = notFoundContent;
      }
    }
  } catch (err) {
    console.error("Page load error:", err);
    app.innerHTML = `<p class='min-h-screen text-white text-6xl'>خطا در بارگذاری صفحه</p>`;
  } finally {
    if (loading) loading.style.display = "none";
  }
  
}

// تابع ناوبری بین صفحات
export function navigate(url) {
  //تنظیم url بدون رفرش مرورگر
  window.history.pushState({}, "", url);
  render();
}

// پشتیبانی از back و forward مرورگر
window.addEventListener("popstate", render);
