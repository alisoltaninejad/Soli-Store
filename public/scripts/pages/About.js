export default function AboutPage() {
  const container = document.createElement('div');
  container.className = 'flex flex-col items-center justify-center min-h-screen bg-violet-100 dark:bg-slate-600 p-6';

  container.innerHTML = `
    <div class="max-w-5xl w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden mt-24">
      <div class="flex flex-col md:flex-row items-center md:items-start gap-6 p-6 md:p-10">
        <!-- Image Section -->
        <div class="flex-shrink-0">
          <img 
            src="public/images/AliSoltani.jpg"
            alt="about us"
            class="w-48 h-48 rounded-full object-cover border-4 border-violet-300 dark:border-violet-600"
          />
        </div>
        
        <!-- Text Section -->
        <div class="text-center md:text-right text-gray-700 dark:text-gray-200 space-y-4">
          <h2 class="font-Dana text-2xl md:text-4xl text-violet-700 dark:text-violet-300">درباره ما</h2>
          <p class="text-sm md:text-base leading-relaxed">
            ما در فروشگاه سولی با هدف ارائه‌ی بهترین تجربه خرید آنلاین، تلاش می‌کنیم با کیفیت‌ترین محصولات را با قیمتی مناسب به دست شما برسانیم.
            <br/>
            رضایت مشتریان برای ما اولویت اول است و با تیمی متخصص و دلسوز، همواره در تلاش برای بهبود خدمات خود هستیم.
          </p>
        </div>
      </div>
    </div>
  `;

  return container;
}
