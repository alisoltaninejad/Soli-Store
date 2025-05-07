import HomeSection from '../components/HomeSection.js';
import ProductsSection from '../components/ProductsSection.js';
import Sections from '../components/Sections.js'
export default async function HomePage() {
  const container = document.createElement('div');

  const homeSection = new HomeSection();
  const productsSection = new ProductsSection();
  const otherSections = new Sections();

  container.innerHTML += homeSection.render();
  container.innerHTML += await productsSection.render();
  container.innerHTML += otherSections.render();

  // 	اجرای کد و افزودن رویداد ها بعد از اینکه مرورگر 
  // DOM رو 
  // واقعاً روی صفحه نشون داد 
  requestAnimationFrame(() => {
    productsSection.addEventlisteners();
  });

  return container;
}
