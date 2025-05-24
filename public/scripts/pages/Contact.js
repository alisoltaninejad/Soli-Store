import Swal from "https://cdn.jsdelivr.net/npm/sweetalert2/+esm";
export default function ContactPage() {
  const container = document.createElement('div');
  container.className = ' flex flex-col items-center justify-center min-h-full  bg-violet-100 dark:bg-gray-900';

  container.innerHTML = `
    <div class="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 md:p-10 w-full max-w-2xl mt-36 md:mt-44 mb-32">
      <h2 class="text-center text-violet-700 dark:text-violet-300 font-Dana text-xl md:text-4xl mb-2">تماس با ما</h2>
      <span class="block w-[100px] h-0.5 bg-violet-300 dark:bg-violet-600 mx-auto my-4"></span>
      <p class="text-center text-gray-600 dark:text-gray-300 text-sm md:text-base mb-8">
        خوشحال می‌شویم نظرات یا سوالات شما را بشنویم. لطفاً فرم زیر را پر کنید.
      </p>
      <form class="space-y-4">
        <div>
          <label class="block text-right  text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">نام</label>
          <input
            type="text"
            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
            placeholder="نام شما"
          />
        </div>
        <div>
          <label class="block text-right text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">ایمیل</label>
          <input
            type="email"
            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
            placeholder="example@email.com"
          />
        </div>
        <div>
          <label class="block text-right text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">پیام</label>
          <textarea
            rows="4"
            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
            placeholder="پیام شما..."
          ></textarea>
        </div>
        <button
          type="submit"
          class="w-full bg-violet-600 text-white py-2 rounded-xl hover:bg-violet-700 transition"
        >
          ارسال پیام
        </button>
      </form>
    </div>
  `;
  const form = container.querySelector('form');
  form.addEventListener('submit', function (event) {
    event.preventDefault(); // جلوگیری از رفرش یا رفتار پیش‌فرض

    Swal.fire({
      icon: "success",
      title: "پیام ارسال شد",
      text: "از تماس شما سپاسگزاریم.",
      timer: 1250,
      showConfirmButton: false,
      background: localStorage.getItem("theme") === "dark" ? "#1f2937" : "#fff",
      color: localStorage.getItem("theme") === "dark" ? "#f9fafb" : "#000",
      showClass: {
        popup: "animate__animated animate__bounceIn",
      },
      hideClass: {
        popup: "animate__animated animate__bounceOut",
      },
    });
  });

  return container;
}
