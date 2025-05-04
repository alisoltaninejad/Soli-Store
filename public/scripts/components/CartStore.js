export default class CartStore {
  
  static setItems(items) {
    if (!Array.isArray(items)) {
      console.warn("setItems فقط آرایه قبول می‌کنه");
      return;
    }
    localStorage.setItem("cart", JSON.stringify(items));
    window.dispatchEvent(new Event("storage"));
  }
  
  static getItems() {
    const raw = localStorage.getItem("cart");
    if (!raw) return [];
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      console.error("خطا در JSON.parse:", e);
      return [];
    }
  }
  
  
    static getCount() {
      return this.getItems().length;
    }
  
    static getTotal() {
      return this.getItems().reduce((sum, item) =>
        sum + item.price * (1 - item.discountPercentage / 100), 0
      ).toLocaleString("fa-IR");
    }
  }
  