export default class HomeSection {
    constructor() {
      this.render();
    }
  
    render() {
      return `
        <section class="home h-[200px] xs:h-auto md:h-screen xs:aspect-[2/1] md:aspect-auto bg-[image:var(--bg-desktop)] bg-no-repeat bg-[center_top] bg-cover overflow-hidden clippath" >
          <div class="container mx-auto px-4 md:px-2 h-full flex justify-end items-center">
            <div class="text-white w-[50%] mt-[10%]">
              <h2 class="font-Dana text-xl md:text-4xl lg:text-5xl mb-0.5 md:mb-2 ">بهترین تجهیزات گیمینگ</h2>
              <h3 class="font-AlibabaLight text-xs md:text-3xl lg:text-4xl">ارتقاء تجربه بازی حرفه‌ای</h3>
              <span class="block w-[100px] h-px md:h-0.5 bg-violet-300 my-3 md:my-8"></span>
              <p class="text-[8px] md:text-2xl">با جدیدترین کنسول‌ها و سیستم‌های کامپیوتری، هر بازی را مثل واقعیت تجربه کنید.</p>
            </div>
          </div>
        </section>
      `;
    }
  }