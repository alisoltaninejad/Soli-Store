import HomeSection from '../components/HomeSection.js';
import ProductsSection from '../components/ProductsSection.js';
import Sections from '../components/Sections.js';

export default async function HomePage() {
  const container = document.createElement('div');

  const homeSection = new HomeSection();
  const productsSection = new ProductsSection();
  const otherSections = new Sections(); // ← اینجا باید instance بسازی
  const otherSectionsHTML = await otherSections.render(); // ← سپس متد async رو صدا بزنی

  container.innerHTML += homeSection.render();
  container.innerHTML += await productsSection.render();
  container.innerHTML += otherSectionsHTML;

  // افزودن رویدادها پس از رندر شدن
  requestAnimationFrame(() => {
    productsSection.addEventlisteners();
  });

  return container;
}
