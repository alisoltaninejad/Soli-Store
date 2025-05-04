import HomeSection from '../components/HomeSection.js';
import ProductsSection from '../components/ProductsSection.js';

export default async function HomePage() {
  const container = document.createElement('div');

  const homeSection = new HomeSection();
  const productsSection = new ProductsSection();

  container.innerHTML += homeSection.render();
  container.innerHTML += await productsSection.render();

  // 	اجرای کد و افزودن رویداد ها بعد از اینکه مرورگر 
  // DOM رو 
  // واقعاً روی صفحه نشون داد 
  requestAnimationFrame(() => {
    productsSection.addEventlisteners();
  });

  return container;
}
