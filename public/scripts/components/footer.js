export default class Footer {
  constructor() {
    this.render();
    this.addEventListeners();
  }
  render() {
    document.getElementById("footer-root").innerHTML = `
            <section class=" relative inset-0 bottom-0 pt-20 bg-zinc-700 text-gray-300 text-center md:text-right  md:pt-10 px-6 md:px-20 shadow-2xl shadow-gray-800 ">
        <div id='scrollBtn' class=" absolute -top-3 right-0 left-0 w-fit m-auto text-gray-50 bg-violet-600 rounded-full p-1 shadow-2xl cursor-pointer hover:bg-violet-700">
            <svg class="size-6"><use href="#arrow-up"></use></svg>
        </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  items-center justify-between py-8 child:p-5">
            <div class="flex flex-col items-center lg:items-start justify-evenly shrink md:col-span-2 lg:col-span-1 text-center lg:text-right">
                <img src="images/logo-type.png" class="w-fit mb-3" alt="logo">
                <p>
                    هدف ما این هست که با اراِئه بهترین محصولات دیجیتال بیشترین سطح رضایت از تجربه خود را داشته باشید و
                    لذت ببرید. کیفیت اتفاقی نیست ما با گارانتی و تضمین تمامی محصولات این را به شما قول می دهیم.
                </p>
            </div>
            <div>
                <h3 class="font-AlibabaBold text-xl mb-3">دسترسی سریع</h3>
                <div class="flex items-baseline-last justify-evenly  child:list-disc">
                    <ul class="child:hover:text-violet-400 child:transition-all child:hover:cursor-pointer child:p-1">
                        <li>حریم خصوصی</li>
                        <li>عودت کالا</li>
                        <li>شرایط استفاده</li>
                        <li>ارسال سریع</li>
                    </ul>
                    <ul class="child:hover:text-violet-400 child:transition-all child:hover:cursor-pointer child:p-1">
                        <li>سوالات متداول</li>
                        <li>ثبت سفارش</li>
                        <li>ضمانت نامه</li>
                        <li>ارتباط با ما</li>
                    </ul>
                </div>

            </div>
            <div>
                <h3 class="font-AlibabaBold text-xl mb-3">در تماس باشیم</h3>
                <div class="flex flex-col items-start gap-1.5">
                    <div class=" w-full flex items-center justify-center md:justify-start gap-1">
                        <svg class="size-5 shrink-0"><use href="#map-pin"></use></svg>
                        جهان کره زمین همین حوالی در کرمان ایران دیار کریمان
                    </div>
                    <div class="flex items-center justify-center md:justify-start gap-2 sm:gap-10 w-full">
                        <div class="flex items-center gap-1">
                            <svg class="size-5"><use href="#chat-bubble"></use></svg>
                            info@support.com
                        </div>
                        <div class="flex items-center gap-1">
                            <svg class="size-5"><use href="#phone-arrow-up-righ"></use></svg>
                            <span>09135006973</span>
                        </div>
                    </div>
                </div>
             <div class="flex items-center justify-center md:justify-between gap-3 mt-6">
                <div class=" shrink flex items-center gap-2 justify-center basis-[40%] h-8 px-1 text-center rounded-lg border bg-indigo-500 cursor-pointer transition-all hover:bg-transparent">
                    <svg class="size-5"><use href="#telegram"></use></svg>
                    <span>alisolinejad@</span>
                </div>
                <div class=" shrink flex items-center gap-2 justify-center basis-[40%] h-8 px-1 text-center rounded-lg border bg-violet-600 cursor-pointer transition-all hover:bg-transparent">
                    <svg class="size-5"><use href="#instagram"></use></svg>
                    <span>alisolinejad@</span>
                </div>
                </div>
            </div>
        </div>
        <hr class="bg-gray-500 my-2">
        <div class="flex flex-col md:flex-row items-center justify-between py-4 text-center text-sm">
            <p>تمامی حقوق متعلق به سازنده <span class="text-violet-400">علی سلطانی</span> میباشد</p>
            <span>copyright © made by <span class="text-violet-400">Ali Soltani</span>, all rights reserved</span>
        </div>
    </section>
        `;
  }
  addEventListeners() {
    const scrollBtn = document.getElementById("scrollBtn");
    scrollBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
}
