import Swal from "https://cdn.jsdelivr.net/npm/sweetalert2/+esm";
export default class AuthManager {
  constructor(updateUIFn = () => {}, getThemeFn = () => "light") {
    this.onAuthChange = updateUIFn;
    this.getTheme = getThemeFn;
  }

  isLoggedIn() {
    return JSON.parse(localStorage.getItem("islogin")) === true;
  }

  setLoggedIn(status) {
    localStorage.setItem("islogin", JSON.stringify(status));
  }

  getUserInfo() {
    return JSON.parse(localStorage.getItem("userInfo") || "{}");
  }

  alertOptions({ icon, title, text = "" }) {
    return {
      icon,
      title,
      text,
      timer: 1250,
      theme: this.getTheme(),
      showConfirmButton: false,
      showClass: { popup: "animate__animated animate__bounceIn" },
      hideClass: { popup: "animate__animated animate__bounceOut" },
    };
  }

  showRegisterForm() {
    Swal.fire({
      title: "ثبت‌نام",
      html: `
        <input type="text" id="reg-username" class="swal2-input" placeholder="نام کاربری" required>
        <input type="email" id="reg-email" class="swal2-input" placeholder="ایمیل" required>
        <input type="password" id="reg-password" class="swal2-input" placeholder="رمز عبور (حداقل 4 رقم)" minlength="4" required>
        <p style="margin-top: 10px;">حساب دارید؟ <button id="to-login" class="swal2-confirm text-blue-500 hover:cursor-pointer">ورود</button></p>
      `,
      confirmButtonText: "ثبت‌نام",
      theme: this.getTheme(),
      showConfirmButton: true,
      didRender: () => {
        document
          .getElementById("to-login")
          ?.addEventListener("click", () => this.showLoginForm());
      },
      preConfirm: () => {
        const username = document.getElementById("reg-username").value.trim();
        const email = document.getElementById("reg-email").value.trim();
        const password = document.getElementById("reg-password").value;

        if (!username || !email || password.length < 4) {
          Swal.showValidationMessage(
            "لطفاً همه فیلدها را کامل و صحیح وارد کنید."
          );
          return false;
        }

        localStorage.setItem(
          "userInfo",
          JSON.stringify({ username, email, password })
        );
        this.setLoggedIn(true);
        this.onAuthChange(); // حالا کار می‌کنه چون تعریفش کردی
        Swal.fire(this.alertOptions({ icon: "success", title: "ثبت‌نام موفق بود!" }));
      },
    });
  }

  showLoginForm() {
    Swal.fire({
      title: "ورود",
      html: `
        <input type="email" id="login-email" class="swal2-input" placeholder="ایمیل">
        <input type="password" id="login-password" class="swal2-input" placeholder="رمز عبور">
        <p style="margin-top: 10px;">حساب ندارید؟ <button id="to-register" class="swal2-confirm text-blue-500 hover:cursor-pointer">ثبت‌نام</button></p>
      `,
      confirmButtonText: "ورود",
      theme: this.getTheme(),
      showConfirmButton: true,
      didRender: () => {
        document
          .getElementById("to-register")
          ?.addEventListener("click", () => this.showRegisterForm());
      },
      preConfirm: () => {
        const email = document.getElementById("login-email").value.trim();
        const password = document.getElementById("login-password").value;
        const { email: savedEmail, password: savedPassword } = this.getUserInfo();

        if (email === savedEmail && password === savedPassword) {
          this.setLoggedIn(true);
          this.onAuthChange();
          Swal.fire(this.alertOptions({ icon: "success", title: "ورود موفق بود!" }));
        } else {
          Swal.fire(this.alertOptions({ icon: "error", title: "کاربر یافت نشد!" }));
        }
      },
    });
  }

  logOut() {
    Swal.fire({
      title: "آیا مطمئن هستید؟",
      text: "می‌خواهید از حساب کاربری خارج شوید؟",
      icon: "warning",
      theme: this.getTheme(),
      showCancelButton: true,
      confirmButtonText: "بله، خروج",
      cancelButtonText: "لغو",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("islogin");
        this.onAuthChange();
        Swal.fire(this.alertOptions({ icon: "success", title: "خروج انجام شد" }));
      }
    });
  }
}
