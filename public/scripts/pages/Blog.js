export default  function BlogPage() {
    const container = document.createElement('div');
    container.className = 'text-center p-4 text-red-600 flex flex-col items-center justify-center h-screen';
  
    container.innerHTML = `
      <h1 class="text-3xl font-bold mb-4">wellcome ro this page</h1>
    `;
  
    return container;
  }
  