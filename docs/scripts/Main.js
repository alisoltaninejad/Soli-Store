import { render, navigate } from './router.js';
import App from './app.js';
console.log("main.js loaded");

document.addEventListener('DOMContentLoaded', () => {
  App(); // اضافه کردن کامپوننت های مشترک

  render(); // بارگذاری صفحه مطابق مسیر فعلی

  // هندل کردن لینک‌های داخلی
  document.body.addEventListener('click', (e) => {
    const link = e.target.closest('[data-link]');
    if (link) {
      e.preventDefault();
      navigate(link.getAttribute('href'));
    }
  });
  
});
