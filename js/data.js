/**
 * TechStore - Data Store & LocalStorage Manager
 */

const DEFAULT_CATEGORIES = [
  {
    id: "smartphones",
    name_az: "Smartfonlar",
    name_en: "Smartphones",
    icon: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=400&q=80",
    badge: "12 məhsul"
  },
  {
    id: "laptops",
    name_az: "Kompüterlər",
    name_en: "Laptops & PC",
    icon: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80",
    badge: "8 məhsul"
  },
  {
    id: "audio",
    name_az: "Audio",
    name_en: "Audio",
    icon: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80",
    badge: "15 məhsul"
  },
  {
    id: "smartwatches",
    name_az: "Ağıllı saatlar",
    name_en: "Smartwatches",
    icon: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80",
    badge: "9 məhsul"
  },
  {
    id: "gaming",
    name_az: "Gaming",
    name_en: "Gaming",
    icon: "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&w=400&q=80",
    badge: "14 məhsul"
  },
  {
    id: "accessories",
    name_az: "Aksesuarlar",
    name_en: "Accessories",
    icon: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=400&q=80",
    badge: "22 məhsul"
  }
];

const DEFAULT_PRODUCTS = [
  {
    id: 1,
    title_az: "iPhone 15 Pro 128GB Black Titanium",
    title_en: "iPhone 15 Pro 128GB Black Titanium",
    category: "smartphones",
    price: 1999,
    oldPrice: 2350,
    discount: "-15%",
    rating: 5.0,
    reviewsCount: 124,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=600&q=80"
    ],
    isBestSeller: true,
    isFeatured: true,
    inStock: true,
    stockCount: 18,
    description_az: "Titan korpus, super güclü A17 Pro prosessoru, 48 MP təkmilləşdirilmiş əsas kamera və universal Type-C dəstəyi ilə ən mükəmməl flaqman smartfon.",
    description_en: "Aerospace-grade titanium design, revolutionary A17 Pro chip, versatile 48MP main camera and universal USB-C connectivity.",
    specs: {
      "Ekran / Screen": "6.1\" Super Retina XDR OLED, 120Hz ProMotion",
      "Prosessor / Processor": "Apple A17 Pro (3 nm)",
      "Yaddaş / Storage": "128 GB NVMe, 8 GB RAM",
      "Kamera / Camera": "48 MP + 12 MP + 12 MP / 12 MP Selfie",
      "Batareya / Battery": "3274 mAh, 20W sürətli enerji"
    }
  },
  {
    id: 2,
    title_az: "MacBook Air M2 13.6\" 256GB Midnight",
    title_en: "MacBook Air M2 13.6\" 256GB Midnight",
    category: "laptops",
    price: 2199,
    oldPrice: 2450,
    discount: "-10%",
    rating: 4.9,
    reviewsCount: 98,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=600&q=80"
    ],
    isBestSeller: true,
    isFeatured: true,
    inStock: true,
    stockCount: 12,
    description_az: "Yeni M2 çipinin misilsiz performansı, ultra incə alüminium korpus, 18 saatlıq batareya ömrü və Liquid Retina parlaq ekranı.",
    description_en: "Supercharged by M2 chip, remarkably thin aluminum enclosure, up to 18 hours of battery life and stunning Liquid Retina display.",
    specs: {
      "Ekran / Screen": "13.6\" Liquid Retina Display (2560 x 1664)",
      "Prosessor / Processor": "Apple M2 8-core CPU / 8-core GPU",
      "Yaddaş / Storage": "256 GB SSD, 8 GB Birləşmiş Yaddaş",
      "Ağırlıq / Weight": "1.24 kq",
      "Batareya / Battery": "52.6 Wh, 18 saata qədər"
    }
  },
  {
    id: 3,
    title_az: "Apple AirPods Pro (2-ci Nəsil) Type-C",
    title_en: "Apple AirPods Pro (2nd Gen) USB-C",
    category: "audio",
    price: 499,
    oldPrice: 625,
    discount: "-20%",
    rating: 4.8,
    reviewsCount: 76,
    image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=600&q=80"
    ],
    isBestSeller: true,
    isFeatured: true,
    inStock: true,
    stockCount: 25,
    description_az: "2 qat daha güclü Aktiv Səs-küyün Ləğvi (ANC), adaptiv şəffaflıq rejimi, fərdiləşdirilmiş məkan səsi və MagSafe enerji qutusu.",
    description_en: "Up to 2x more Active Noise Cancellation, Adaptive Audio, Personalized Spatial Audio and MagSafe charging case.",
    specs: {
      "Çip / Chip": "Apple H2 qulaqlıq çipi",
      "Səs izolyasiyası": "Aktiv Küy Ləğvi (ANC) + Şəffaflıq",
      "İşləmə müddəti": "6 saat (qutu ilə 30 saat)",
      "Qorunma dərəcəsi": "IP54 toz və suya davamlılıq",
      "Qoşulma": "Bluetooth 5.3"
    }
  },
  {
    id: 4,
    title_az: "Samsung Galaxy Watch 6 Classic 47mm",
    title_en: "Samsung Galaxy Watch 6 Classic 47mm",
    category: "smartwatches",
    price: 549,
    oldPrice: 620,
    discount: "-12%",
    rating: 4.7,
    reviewsCount: 83,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80"
    ],
    isBestSeller: true,
    isFeatured: true,
    inStock: true,
    stockCount: 15,
    description_az: "Fırlanan mexaniki çərçivə, böyük Sapphire Crystal ekran, EKQ, qan təzyiqi və dərin yuxu analizi edən premium ağıllı saat.",
    description_en: "Rotating bezel, larger sapphire crystal screen, comprehensive body composition & sleep coaching analysis.",
    specs: {
      "Ekran / Screen": "1.5\" Super AMOLED (480 x 480)",
      "Korpus / Body": "Paslanmaz polad, Fırlanan çərçivə",
      "Sensorlar / Sensors": "EKQ, BioActive, Ürək ritmi, Yuxu",
      "Qorunma / Resistance": "5ATM + IP68 / MIL-STD-810H",
      "Batareya": "425 mAh, 40 saata qədər"
    }
  },
  {
    id: 5,
    title_az: "Sony PlayStation 5 DualSense Wireless Controller",
    title_en: "Sony PlayStation 5 DualSense Wireless Controller",
    category: "gaming",
    price: 159,
    oldPrice: 189,
    discount: "-16%",
    rating: 4.9,
    reviewsCount: 112,
    image: "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&w=600&q=80"
    ],
    isBestSeller: true,
    isFeatured: false,
    inStock: true,
    stockCount: 30,
    description_az: "İnnovativ Haptik geribildirim, dinamik adaptiv tətiqlər və daxili mikrofonu ilə yeni nəsil oyun hissi.",
    description_en: "Discover a deeper gaming experience with the innovative PS5 DualSense controller with haptic feedback.",
    specs: {
      "Qoşulma / Connection": "Bluetooth & USB-C",
      "Uyğunluq": "PS5, PC, Mac, iOS, Android",
      "Xüsusiyyətlər": "Haptik geribildirim, Adaptiv tətiqlər",
      "Batareya": "Daxili təkrar doldurulan Li-Ion"
    }
  },
  {
    id: 6,
    title_az: "Apple 67W USB-C Sürətli Şarj Adapteri",
    title_en: "Apple 67W USB-C Power Adapter",
    category: "accessories",
    price: 119,
    oldPrice: 140,
    discount: "-15%",
    rating: 4.8,
    reviewsCount: 45,
    image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=600&q=80"
    ],
    isBestSeller: true,
    isFeatured: false,
    inStock: true,
    stockCount: 40,
    description_az: "MacBook, iPad və iPhone üçün sürətli və etibarlı orijinal enerji adapteri.",
    description_en: "Fast, efficient charging at home, in the office, or on the go for compatible USB-C devices.",
    specs: {
      "Güc / Power": "67 Watt",
      "Port": "USB Type-C",
      "Uyğunluq": "MacBook Pro/Air, iPad Pro, iPhone 15 seriyası",
      "Rəng": "Ağ / White"
    }
  },
  {
    id: 7,
    title_az: "Sony WH-1000XM5 Simsiz Qulaqlıq",
    title_en: "Sony WH-1000XM5 Wireless Headphones",
    category: "audio",
    price: 689,
    oldPrice: 799,
    discount: "-14%",
    rating: 5.0,
    reviewsCount: 94,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80"
    ],
    isBestSeller: false,
    isFeatured: true,
    inStock: true,
    stockCount: 8,
    description_az: "Sənayenin ən qabaqcıl səs-küy boğma texnologiyası, 8 mikrofon sistemi və 30 saatlıq fasiləsiz dinləmə həzzi.",
    description_en: "Industry-leading noise canceling with two processors and eight microphones for unprecedented sound.",
    specs: {
      "İş vaxtı": "30 saat (ANC açıq)",
      "Audio kodeklər": "LDAC, AAC, SBC, Hi-Res Audio",
      "Çəki": "250 qram",
      "Sürətli enerji": "3 dəqiqə şarjla 3 saat işləmə"
    }
  },
  {
    id: 8,
    title_az: "Apple iPad Air M2 11 düym 128GB Wi-Fi",
    title_en: "Apple iPad Air M2 11-inch 128GB Wi-Fi",
    category: "laptops",
    price: 1399,
    oldPrice: 1550,
    discount: "-10%",
    rating: 4.9,
    reviewsCount: 67,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=600&q=80"
    ],
    isBestSeller: false,
    isFeatured: true,
    inStock: true,
    stockCount: 10,
    description_az: "Apple M2 çipi, heyrətamiz Liquid Retina ekran və Apple Pencil Pro ilə yaradıcılığınız üçün sərhədsiz imkanlar.",
    description_en: "Supercharged by Apple M2, brilliant 11-inch Liquid Retina display, ready for Apple Pencil Pro and Magic Keyboard.",
    specs: {
      "Ekran": "11\" Liquid Retina (2360 x 1640), True Tone",
      "Prosessor": "Apple M2 8-core CPU / 10-core GPU",
      "Yaddaş": "128 GB",
      "Kamera": "12 MP arxa / 12 MP ultra-geniş ön kamera"
    }
  }
];

const DEFAULT_ORDERS = [
  {
    id: "TS-1084",
    customer: "Rəşad Quliyev",
    phone: "+994 50 234 56 78",
    city: "Bakı, Nəsimi ray.",
    total: 2199,
    status: "Gözləyir",
    date: "2026-10-06 14:30",
    items: [
      { id: 2, title: "MacBook Air M2 13.6\" 256GB Midnight", quantity: 1, price: 2199 }
    ]
  },
  {
    id: "TS-1083",
    customer: "Aysel Məmmədova",
    phone: "+994 55 987 65 43",
    city: "Bakı, Yasamal ray.",
    total: 2498,
    status: "Təsdiqləndi",
    date: "2026-10-06 11:15",
    items: [
      { id: 1, title: "iPhone 15 Pro 128GB Black Titanium", quantity: 1, price: 1999 },
      { id: 3, title: "Apple AirPods Pro (2-ci Nəsil) Type-C", quantity: 1, price: 499 }
    ]
  },
  {
    id: "TS-1082",
    customer: "Kamran Əliyev",
    phone: "+994 70 333 22 11",
    city: "Sumqayıt, 5-ci mkr.",
    total: 708,
    status: "Göndərildi",
    date: "2026-10-05 18:40",
    items: [
      { id: 4, title: "Samsung Galaxy Watch 6 Classic 47mm", quantity: 1, price: 549 },
      { id: 5, title: "Sony PlayStation 5 DualSense Wireless Controller", quantity: 1, price: 159 }
    ]
  },
  {
    id: "TS-1081",
    customer: "Nərmin Hüseynova",
    phone: "+994 77 444 88 99",
    city: "Gəncə şəhəri",
    total: 499,
    status: "Çatdırıldı",
    date: "2026-10-04 10:20",
    items: [
      { id: 3, title: "Apple AirPods Pro (2-ci Nəsil) Type-C", quantity: 1, price: 499 }
    ]
  }
];

const DEFAULT_BANNERS = [
  {
    id: 1,
    tag_az: "✨ Yenilik",
    tag_en: "✨ New Release",
    title_az: "Texnologiya əlinizin altında",
    title_en: "Technology at your fingertips",
    desc_az: "Ən son smartfonlar, kompüterlər və aksesuarları müstəsna keyfiyyət və münasib qiymətlərlə kəşf edin.",
    desc_en: "Discover the latest smartphones, laptops and accessories with exceptional quality and unbeatable prices.",
    buttonText_az: "Kolleksiyanı kəşf et",
    buttonText_en: "Discover collection",
    link: "shop.html",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80",
    active: true
  },
  {
    id: 2,
    tag_az: "🔥 Xüsusi Təklif",
    tag_en: "🔥 Special Offer",
    title_az: "Güclü M2 Mac Modelləri",
    title_en: "Powerful M2 Mac Models",
    desc_az: "İşiniz və təhsiliniz üçün inanılmaz sürət, heyrətamiz ekran və 18 saata qədər fasiləsiz batareya ömrü.",
    desc_en: "Unmatched performance for your work and study with all-day battery life and liquid retina display.",
    buttonText_az: "İndi al",
    buttonText_en: "Shop Now",
    link: "shop.html?category=laptops",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
    active: true
  }
];

const DEFAULT_COUPONS = [
  { code: "TECH10", discountType: "percent", value: 10, active: true, desc: "Bütün sifarişlərə 10% endirim" },
  { code: "SUPER20", discountType: "percent", value: 20, active: true, desc: "Seçilmiş məhsullara 20% endirim" },
  { code: "ENDIRIM50", discountType: "fixed", value: 50, active: true, desc: "50 AZN dərhal endirim" }
];

// Data Store Class
class DataStore {
  constructor() {
    this.init();
  }

  init() {
    if (!localStorage.getItem("techstore_products")) {
      this.saveProducts(DEFAULT_PRODUCTS);
    }
    if (!localStorage.getItem("techstore_categories")) {
      this.saveCategories(DEFAULT_CATEGORIES);
    }
    if (!localStorage.getItem("techstore_orders")) {
      this.saveOrders(DEFAULT_ORDERS);
    }
    if (!localStorage.getItem("techstore_banners")) {
      this.saveBanners(DEFAULT_BANNERS);
    }
    if (!localStorage.getItem("techstore_coupons")) {
      this.saveCoupons(DEFAULT_COUPONS);
    }
    if (!localStorage.getItem("techstore_cart")) {
      localStorage.setItem("techstore_cart", JSON.stringify([]));
    }
    if (!localStorage.getItem("techstore_wishlist")) {
      localStorage.setItem("techstore_wishlist", JSON.stringify([]));
    }
  }

  // Products
  getProducts() {
    return JSON.parse(localStorage.getItem("techstore_products") || "[]");
  }

  saveProducts(products) {
    localStorage.setItem("techstore_products", JSON.stringify(products));
  }

  getProductById(id) {
    const list = this.getProducts();
    return list.find(p => p.id == id);
  }

  addProduct(product) {
    const list = this.getProducts();
    product.id = Date.now();
    list.unshift(product);
    this.saveProducts(list);
    return product;
  }

  updateProduct(id, updated) {
    let list = this.getProducts();
    list = list.map(p => (p.id == id ? { ...p, ...updated } : p));
    this.saveProducts(list);
  }

  deleteProduct(id) {
    let list = this.getProducts();
    list = list.filter(p => p.id != id);
    this.saveProducts(list);
  }

  // Categories
  getCategories() {
    return JSON.parse(localStorage.getItem("techstore_categories") || "[]");
  }

  saveCategories(cats) {
    localStorage.setItem("techstore_categories", JSON.stringify(cats));
  }

  addCategory(category) {
    const list = this.getCategories();
    category.id = category.id || `cat_${Date.now()}`;
    list.push(category);
    this.saveCategories(list);
    return category;
  }

  deleteCategory(id) {
    let list = this.getCategories();
    list = list.filter(c => c.id !== id);
    this.saveCategories(list);
  }

  // Orders
  getOrders() {
    return JSON.parse(localStorage.getItem("techstore_orders") || "[]");
  }

  saveOrders(orders) {
    localStorage.setItem("techstore_orders", JSON.stringify(orders));
  }

  addOrder(order) {
    const list = this.getOrders();
    order.id = `TS-${Math.floor(1000 + Math.random() * 9000)}`;
    order.date = new Date().toISOString().replace("T", " ").substring(0, 16);
    list.unshift(order);
    this.saveOrders(list);
    return order;
  }

  updateOrderStatus(orderId, newStatus) {
    let list = this.getOrders();
    list = list.map(o => (o.id === orderId ? { ...o, status: newStatus } : o));
    this.saveOrders(list);
  }

  deleteOrder(orderId) {
    let list = this.getOrders();
    list = list.filter(o => o.id !== orderId);
    this.saveOrders(list);
  }

  // Banners
  getBanners() {
    return JSON.parse(localStorage.getItem("techstore_banners") || "[]");
  }

  saveBanners(banners) {
    localStorage.setItem("techstore_banners", JSON.stringify(banners));
  }

  // Coupons
  getCoupons() {
    return JSON.parse(localStorage.getItem("techstore_coupons") || "[]");
  }

  saveCoupons(coupons) {
    localStorage.setItem("techstore_coupons", JSON.stringify(coupons));
  }

  // Cart
  getCart() {
    return JSON.parse(localStorage.getItem("techstore_cart") || "[]");
  }

  saveCart(cart) {
    localStorage.setItem("techstore_cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
  }

  addToCart(productId, quantity = 1) {
    const cart = this.getCart();
    const product = this.getProductById(productId);
    if (!product) return;

    const existing = cart.find(item => item.id == productId);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({
        id: product.id,
        title_az: product.title_az,
        title_en: product.title_en,
        price: product.price,
        image: product.image,
        category: product.category,
        quantity: quantity
      });
    }
    this.saveCart(cart);
  }

  removeFromCart(productId) {
    let cart = this.getCart();
    cart = cart.filter(item => item.id != productId);
    this.saveCart(cart);
  }

  updateCartQuantity(productId, quantity) {
    let cart = this.getCart();
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }
    const item = cart.find(i => i.id == productId);
    if (item) {
      item.quantity = quantity;
      this.saveCart(cart);
    }
  }

  clearCart() {
    this.saveCart([]);
  }

  // Wishlist
  getWishlist() {
    return JSON.parse(localStorage.getItem("techstore_wishlist") || "[]");
  }

  toggleWishlist(productId) {
    let list = this.getWishlist();
    const index = list.indexOf(productId);
    let added = false;
    if (index > -1) {
      list.splice(index, 1);
    } else {
      list.push(productId);
      added = true;
    }
    localStorage.setItem("techstore_wishlist", JSON.stringify(list));
    window.dispatchEvent(new Event("wishlistUpdated"));
    return added;
  }

  isInWishlist(productId) {
    const list = this.getWishlist();
    return list.includes(productId);
  }

  // Reset to default
  resetAll() {
    localStorage.removeItem("techstore_products");
    localStorage.removeItem("techstore_categories");
    localStorage.removeItem("techstore_orders");
    localStorage.removeItem("techstore_banners");
    localStorage.removeItem("techstore_coupons");
    localStorage.removeItem("techstore_cart");
    localStorage.removeItem("techstore_wishlist");
    this.init();
  }
}

// Global data store instance
window.dataStore = new DataStore();
