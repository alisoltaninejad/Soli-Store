import BlogSection from "./BlogSection.js";

export default class Sections {
  constructor() {
    this.blogSection = new BlogSection();
  }

  async render() {
    const blogHTML = await this.blogSection.render();

    return `
      <section class="container mt-34 w-[80%] m-auto space-y-30">
        <!-- banners -->
        <div class="grid gap-4 grid-cols-1 md:grid-cols-2 items-center justify-center child:rounded-2xl child:shadow-2xl">
          <img src="/public/images/banner-computer.jpg" class="block h-full w-full md:-mt-7" alt="banner">
          <img src="/public/images/banner-portable.jpg" alt="banner">
          <img src="/public/images/banner-playstation.jpg" class="md:-mt-7" alt="banner">
          <img src="/public/images/banner-xbox.jpg" alt="banner">
        </div>

        <!-- categories -->
        <div class="grid gap-14 grid-cols-2 md:grid-cols-4 items-center justify-center dark:text-white">
          <figure>
            <a  href="/categories/Watches" data-link><img src="/public/images/category-man-watches.png" class="rounded-full shadow-xl dark:shadow-gray-800 bg-blue-200" alt="category"></a>
            <a  href="/categories/Watches" data-link class="block text-lg md:text-xl text-center mt-6">ساعت</a>
          </figure>
          <figure>
            <a  href="/categories/DigitalAccessories" data-link><img src="/public/images/category-mobile-accessories.jpg" class="rounded-full shadow-xl dark:shadow-gray-800" alt="category"></a>
            <a  href="/categories/mobile-accessories" data-link class="block text-lg md:text-xl text-center mt-6">لوازم جانبی</a>
          </figure>
          <figure>
            <a href="/categories/laptops" data-link><img src="/public/images/category-laptops.jpg" class="rounded-full shadow-xl dark:shadow-gray-800" alt="category"></a>
            <a href="/categories/laptops" data-link class="block text-lg md:text-xl text-center mt-6">لپ تاپ</a>
          </figure>
          <figure>
            <a  href="/categories/phones" data-link><img src="/public/images/category-tablets.png" class="rounded-full shadow-xl dark:shadow-gray-800 bg-violet-200" alt="category"></a>
            <a  href="/categories/phones" data-link class="block text-lg md:text-xl text-center mt-6">تبلت و موبایل</a>
          </figure>
        </div>

        <!-- blogs -->
        ${blogHTML}

        <!-- call order -->
        <div class="flex flex-col md:flex-row dark:text-white">
          <div class="basis-[30%] rounded-xs overflow-hidden">
            <img src="/public/images/category-smaartphone.jpg" class="h-full w-full" alt="smartphone">
          </div>
          <div class="basis-[70%] flex flex-col justify-evenly shrink md:px-8 mt-8 md:mt-0">
            <h2 class="text-2xl md:text-3xl font-AlibabaBold">بهترین لوازم دیجیتال</h2>
            <p class="inline-flex leading-8 md:leading-10 text-md lg:text-xl mt-4 text-justify">
              بهترین محصولات و لوازم دیجیتال را از ما بخواهید هر آنچه که مربوط به حوزه تکنولوژی هست با بهترین کیفیت در خدمت شماست
            </p>
            <a href="" class="inline-flex w-fit text-green-700 border-2 border-green-900 transition-all hover:bg-green-900  hover:border-green-700 dark:border-green-400 hover:text-white py-1 px-4 my-2 rounded-l-full font-AlibabaLight dark:text-green-200 dark:hover:text-green-300 ">
              سفارش تلفنی
            </a>
          </div>
        </div>

        <!-- widgets -->
        <div class="flex flex-col sm:flex-row justify-evenly items-center gap-6 ">
          <div class="w-full flex gap-4 items-center justify-baseline md:justify-center dark:bg-gray-500 p-4 dark:text-white rounded-2xl">
            <img src="/public/images/svgs/express-delivery.svg" alt="delivery icon" class="size-14 lg:size-20">
            <h5>ارسال سریع به سراسر کشور</h5>
          </div>
          <div class="w-full flex gap-4 items-center justify-baseline md:justify-center dark:bg-gray-500 p-4 dark:text-white rounded-2xl">
            <img src="/public/images/svgs/support.svg" alt="support icon" class="size-14 lg:size-20">
            <h5>پشتیبانی 24 ساعته</h5>
          </div>
        </div>
      </section>
    `;
  }
}
