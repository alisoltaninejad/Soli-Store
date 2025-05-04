import { render, navigate } from './router.js';
import App from './app.js';

document.addEventListener('DOMContentLoaded', () => {
  App(); // اضافه کردن کامپوننت های مشترک

  render(); // بارگذاری صفحه مطابق مسیر فعلی

  // هندل کردن لینک‌های داخلی
  document.body.addEventListener('click', (e) => {
    if (e.target.matches('[data-link]')) {
      e.preventDefault();
      navigate(e.target.href);
    }
  });
});
