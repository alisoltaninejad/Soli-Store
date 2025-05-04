import HomeSection from './components/HomeSection.js';
import ProductsSection from './components/ProductsSection.js';

document.addEventListener('DOMContentLoaded', async () => {
  const main = document.querySelector('#main');

  if (main) {
    try {
      const homeSection = new HomeSection();
      const productsSection = new ProductsSection();

      const homeHTML = homeSection.render();
      const productsHTML = await productsSection.render();

      main.innerHTML = homeHTML + productsHTML;

      productsSection.addEventlisteners()
    } catch (error) {
      console.error('Error initializing components:', error);
    }
  }
});
