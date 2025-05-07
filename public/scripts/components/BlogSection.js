export default class BlogSection {
  constructor() {
    let blogs = [];
    this.render();
  }
  render() {
    return `
         <div class="container mt-20">
        <div class="text-slate-700 dark:text-white flex items-end justify-between">
            <h2 class="font-AlibabaLight text-xl md:text-3xl">
                مطالب خواندنی
            </h2>
            <a href="/shop" data-link class="flex items-center justify-between text-violet-300">
                مشاهده همه مطالب
                <svg class="w-4 h-4">
                    <use href="#arrow-left"></use>
                </svg>
            </a>
        </div>
        <section class="blogs  mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 gap-y-10 ">
            ${this.createBlogBox()}
            ${this.createBlogBox()}
            ${this.createBlogBox()}
            ${this.createBlogBox()}
        </section>
    </div>`;
  }
  createBlogBox() {
    return `
        <div class="flex flex-col items-center justify-between p-2  bg-gray-50 dark:bg-slate-600 rounded-3xl shadow-2xs">
                <div class="rounded-3xl overflow-hidden">
                    <img src="images/category-smaartphone.jpg" alt="blog img">
                </div>
                <div class="flex items-b justify-between px-2 my-3 text-slate-700 dark:text-white">
                    <div class=" text-base mt-auto mx-2 basis-[80%]">این بلاگ یمی یاز یبعیریت بلت های یتای ت استت .</div>
                    <div class="divide h-full w-px bg-gray-400"></div>
                    <div class="font-AlibabaBold text-green-700  text-xs pr-1">
                        <p>21</p>
                        <p>مرداد</p>
                        <p>1404</p>
                    </div>
                </div>
            </div>`;
  }
}
