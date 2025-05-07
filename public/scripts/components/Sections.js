import BlogSection from "./BlogSection.js"
export default class Sections {
    constructor(){
        this.blogSection = new BlogSection();
        this.render()
    }
    render(){
        return `
          <section class="container mt-34 w-[80%] m-auto space-y-30">
        <!-- banners -->
        <div
            class=" grid gap-4 grid-cols-1 md:grid-cols-2 items-center justify-center   child:rounded-2xl child:shadow-2xl ">
            <img src="./images/banner-computer.jpg" class="block h-full w-full md:-mt-7" alt="banner">
            <img src="./images/banner-portable.jpg" alt="banner">
            <img src="./images/banner-playstation.jpg" class='md:-mt-7' alt="banner">
            <img src="./images/banner-xbox.jpg" alt="banner">
        </div>

        <!-- categories -->
        <div class="grid gap-14 grid-cols-2 md:grid-cols-4 items-center justify-center  ">
            <figure>
                <a href=""><img src="./images/category-man-watches.png" class="rounded-full shadow-xl bg-blue-200"
                        alt="category"></a>
                <figcaption class="block text-lg md:text-xl text-center mt-6"> ساعت </figcaption>
            </figure>
            <figure>
                <a href=""> <img src="./images/category-mobile-accessories.jpg" class="rounded-full shadow-xl"
                        alt="category"> </a>
                <figcaption class="block text-lg md:text-xl text-center mt-6"> لوازم جانبی</figcaption>
            </figure>
            <figure>
                <a href=""> <img src="./images/category-laptops.jpg" class="rounded-full shadow-xl" alt="category"> </a>
                <figcaption class="block text-lg md:text-xl text-center mt-6"> لپ تاپ</figcaption>
            </figure>
            <figure>
                <a href=""> <img src="./images/category-tablets.png" class="rounded-full shadow-xl bg-violet-200" alt="category"> </a>
                <figcaption class="block text-lg md:text-xl text-center mt-6"> تبلت و موبایل</figcaption>
            </figure>
        </div>

        <!-- blogs -->
        ${blogHTML}
        <!-- call order -->
        <div class="flex flex-col md:flex-row">
            <div class="basis-[30%] rounded-xs overflow-hidden">
                <img src="images/category-smaartphone.jpg" class="h-full w-full" alt="smartphone">
            </div>
            <div class="basis-[70%] flex flex-col justify-evenly shrink md:px-8 mt-8 md:mt-0">
                <h2 class="text-2xl md:text-3xl font-AlibabaBold">بهترین لوازم دیجیتال</h2>
                <p class="inline-flex leading-8 md:leading-10 text-md lg:text-xl mt-4 text-justify">بهترین محصولات و لوازم دیجیتال را از ما بخواهید هر آنچه که مربوط به حوزه
                    تگنولوژی هست با بهترین کیفیت در خدمت شماست
                </p>
                <a href=""
                    class="inline-flex w-fit text-green-700 border border-green-900  transition-all hover:bg-green-900 hover:border-green-700 hover:text-white py-1 px-4 my-2 rounded-l-full font-AlibabaLight">سفارش
                    تلفنی</a>

            </div>
        </div>

        <!-- widgets -->
         <div class="flex flex-col sm:flex-row justify-evenly items-center gap-6 ">
            <div class="w-full flex gap-4 items-center justify-baseline md:justify-center">
                <img src="./images/svgs/express-delivery.svg" alt="delivery icon" class="size-14 lg:size-20">
                <h5>ارسال سریع به سراسر کشور</h5>
            </div>
            <div class="w-full flex gap-4 items-center justify-baseline md:justify-center">
                <img src="./images/svgs/support.svg" alt="support icon" class="size-14  lg:size-20">
                <h5>پشتیبانی 24 ساعته</h5>
            </div>
         </div>
    </section>
        `
    }
}