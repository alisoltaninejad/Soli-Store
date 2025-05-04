export default function NotFoundPage() {
    const container = document.createElement('div');
    container.className = 'text-center p-4 text-red-600 flex flex-col items-center justify-center h-screen';
  
    container.innerHTML = `
      <h1 class="text-9xl font-bold mb-4">404</h1>
      <p>صفحه‌ای با این آدرس پیدا نشد!</p>
    `;
  
    return container;
  }
  