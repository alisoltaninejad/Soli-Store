export default class Footer {
  constructor() {
    this.render();
    this.addEventListeners();
  }
  render() {
    document.getElementById("footer-root").innerHTML = `
            <section class=" relative mt-20 bg-zinc-700 text-gray-300 pt-10 px-20">
        <div id='scrollBtn' class=" absolute -top-3 right-0 left-0 w-fit m-auto text-gray-50 bg-violet-600 rounded-full p-1 shadow-2xl cursor-pointer hover:bg-violet-700">
            <svg class="size-6"><use href="#arrow-up"></use></svg>
        </div>
        <div class="grid grid-cols-3 items-start justify-between py-8 child:p-5">
            <div class="flex flex-col items-start justify-evenly">
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
                    <div class="flex items-center gap-1">
                        <svg class="size-5"><use href="#briefcase"></use></svg>
                        جهان کره زمین همین حوالی در کرمان ایران دیار کریمان
                    </div>
                    <div class="flex items-center justify-start gap-10">
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
                <div class="flex items-center justify-between mt-6">
                    <div class="basis-[44%] h-8 text-center leading-8 rounded-lg bg bg-indigo-500 ">
                        alisolinejad@
                    </div>
                    <div class="basis-[44%] h-8 text-center leading-8 rounded-lg bg border border-violet-400">
                        alisolinejad@
                    </div>
                </div>
            </div>
        </div>
        <hr class="bg-gray-500 my-2">
        <div class="flex items-center justify-between py-4">
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
