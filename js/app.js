/**
 * TechStore - Main Application Logic
 * Slider, Dynamic Product Rendering, Cart System, Search & Modals
 */

document.addEventListener("DOMContentLoaded", () => {
  initHeroSlider();
  renderCategories();
  renderBestSellers();
  initCart();
  initSearch();
  initWishlist();
  initMobileNav();
  initLanguageSelector();
});

// ==========================================================================
// Toast Notification Utility
// ==========================================================================
function showToast(message, type = "success") {
  let container = document.querySelector(".toast-container");
  if (!container) {
    container = document.createElement("div");
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(100%)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ==========================================================================
// Hero Slider
// ==========================================================================
let currentSlideIndex = 0;
let slideInterval = null;

function initHeroSlider() {
  const slides = document.querySelectorAll(".hero-slide");
  const dots = document.querySelectorAll(".hero-dot");
  const prevBtn = document.querySelector(".hero-prev");
  const nextBtn = document.querySelector(".hero-next");

  if (!slides.length) return;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
    currentSlideIndex = index;
  }

  function nextSlide() {
    let next = (currentSlideIndex + 1) % slides.length;
    showSlide(next);
  }

  function prevSlide() {
    let prev = (currentSlideIndex - 1 + slides.length) % slides.length;
    showSlide(prev);
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      clearInterval(slideInterval);
      nextSlide();
      startAutoSlide();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      clearInterval(slideInterval);
      prevSlide();
      startAutoSlide();
    });
  }

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      clearInterval(slideInterval);
      showSlide(i);
      startAutoSlide();
    });
  });

  function startAutoSlide() {
    slideInterval = setInterval(nextSlide, 5500);
  }

  startAutoSlide();
}

// ==========================================================================
// Categories Rendering
// ==========================================================================
function renderCategories() {
  const container = document.getElementById("categories-container");
  if (!container) return;

  const categories = window.dataStore.getCategories();
  const lang = window.i18n.getLang();

  container.innerHTML = categories.map(cat => {
    const name = lang === "az" ? cat.name_az : cat.name_en;
    return `
      <div class="cat-card" onclick="window.location.href='shop.html?category=${cat.id}'">
        <div class="cat-img-box">
          <img src="${cat.icon}" alt="${name}" loading="lazy">
        </div>
        <div class="cat-name">${name}</div>
      </div>
    `;
  }).join("");
}

// ==========================================================================
// Best Sellers Rendering
// ==========================================================================
function renderBestSellers() {
  const container = document.getElementById("bestsellers-container");
  if (!container) return;

  const products = window.dataStore.getProducts();
  const lang = window.i18n.getLang();
  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 4);

  container.innerHTML = bestSellers.map(product => {
    const title = lang === "az" ? product.title_az : product.title_en;
    const isWished = window.dataStore.isInWishlist(product.id);
    const formattedPrice = window.i18n.formatPrice(product.price);
    const formattedOldPrice = product.oldPrice ? window.i18n.formatPrice(product.oldPrice) : "";
    const addToCartText = window.i18n.t("add_to_cart");

    return `
      <div class="product-card" data-product-id="${product.id}">
        <div class="product-card-top">
          <span class="discount-badge">${product.discount || "-10%"}</span>
          <button class="wishlist-btn ${isWished ? 'active' : ''}" onclick="handleWishlistToggle(event, ${product.id})" aria-label="Wishlist">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="${isWished ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
        </div>

        <div class="product-thumb-wrap" onclick="window.location.href='product.html?id=${product.id}'">
          <img src="${product.image}" alt="${title}" loading="lazy">
        </div>

        <div class="product-meta">
          <h3 class="product-title" onclick="window.location.href='product.html?id=${product.id}'">${title}</h3>
          
          <div class="product-rating">
            <div class="stars-list">
              ★★★★★
            </div>
            <span class="reviews-num">(${product.reviewsCount})</span>
          </div>

          <div class="product-price-box">
            <span class="current-price">${formattedPrice}</span>
            ${formattedOldPrice ? `<span class="old-price">${formattedOldPrice}</span>` : ''}
          </div>

          <button class="btn-add-cart" onclick="handleAddToCart(event, ${product.id})">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-2z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            <span>${addToCartText}</span>
          </button>
        </div>
      </div>
    `;
  }).join("");
}

// ==========================================================================
// Cart System & Drawer
// ==========================================================================
function initCart() {
  updateCartBadge();
  setupCartDrawer();

  window.addEventListener("cartUpdated", () => {
    updateCartBadge();
    renderCartDrawerItems();
  });
}

function updateCartBadge() {
  const cart = window.dataStore.getCart();
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  document.querySelectorAll(".cart-count-badge").forEach(badge => {
    badge.textContent = totalCount;
    badge.style.display = totalCount > 0 ? "flex" : "none";
  });
}

function setupCartDrawer() {
  const drawer = document.getElementById("cart-drawer");
  const overlay = document.getElementById("cart-drawer-overlay");
  const openButtons = document.querySelectorAll(".open-cart-btn");
  const closeButtons = document.querySelectorAll(".close-drawer-btn");

  if (!drawer || !overlay) return;

  function openDrawer() {
    renderCartDrawerItems();
    drawer.classList.add("active");
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeDrawer() {
    drawer.classList.remove("active");
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  openButtons.forEach(btn => btn.addEventListener("click", (e) => {
    e.preventDefault();
    openDrawer();
  }));

  closeButtons.forEach(btn => btn.addEventListener("click", closeDrawer));
  overlay.addEventListener("click", closeDrawer);
}

function renderCartDrawerItems() {
  const container = document.getElementById("drawer-cart-list");
  const totalElement = document.getElementById("drawer-cart-total");
  if (!container) return;

  const cart = window.dataStore.getCart();
  const lang = window.i18n.getLang();

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty-state">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
        <p>${window.i18n.t("cart_empty")}</p>
      </div>
    `;
    if (totalElement) totalElement.textContent = window.i18n.formatPrice(0);
    return;
  }

  let subtotal = 0;

  container.innerHTML = cart.map(item => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;
    const title = lang === "az" ? item.title_az : item.title_en;

    return `
      <div class="drawer-cart-item">
        <img src="${item.image}" alt="${title}">
        <div class="drawer-item-info">
          <h4 class="drawer-item-title">${title}</h4>
          <div class="drawer-item-price">${window.i18n.formatPrice(item.price)}</div>
          <div class="drawer-item-actions">
            <div class="qty-counter">
              <button class="qty-btn" onclick="updateItemQty(${item.id}, ${item.quantity - 1})">-</button>
              <span class="qty-display">${item.quantity}</span>
              <button class="qty-btn" onclick="updateItemQty(${item.id}, ${item.quantity + 1})">+</button>
            </div>
            <button class="drawer-remove-item" onclick="removeDrawerItem(${item.id})">
              Sil
            </button>
          </div>
        </div>
      </div>
    `;
  }).join("");

  if (totalElement) {
    totalElement.textContent = window.i18n.formatPrice(subtotal);
  }
}

window.handleAddToCart = function(e, productId) {
  e.stopPropagation();
  window.dataStore.addToCart(productId, 1);
  showToast(window.i18n.t("added_to_cart"));
};

window.updateItemQty = function(productId, qty) {
  window.dataStore.updateCartQuantity(productId, qty);
};

window.removeDrawerItem = function(productId) {
  window.dataStore.removeFromCart(productId);
  showToast("Məhsul səbətdən silindi", "info");
};

// ==========================================================================
// Wishlist Logic
// ==========================================================================
function initWishlist() {
  window.addEventListener("wishlistUpdated", () => {
    renderBestSellers();
  });
}

window.handleWishlistToggle = function(e, productId) {
  e.stopPropagation();
  const added = window.dataStore.toggleWishlist(productId);
  showToast(added ? "Məhsul bəyənilənlərə əlavə edildi ❤️" : "Məhsul bəyənilənlərdən çıxarıldı 💔");
};

// ==========================================================================
// Live Search System
// ==========================================================================
function initSearch() {
  const searchInputs = document.querySelectorAll(".global-search-input");
  const dropdown = document.getElementById("search-results-box");

  if (!dropdown) return;

  searchInputs.forEach(input => {
    input.addEventListener("input", (e) => {
      const query = e.target.value.trim().toLowerCase();
      if (query.length < 2) {
        dropdown.classList.remove("active");
        dropdown.innerHTML = "";
        return;
      }

      const products = window.dataStore.getProducts();
      const lang = window.i18n.getLang();
      const results = products.filter(p => {
        const title = (lang === "az" ? p.title_az : p.title_en).toLowerCase();
        return title.includes(query) || p.category.toLowerCase().includes(query);
      }).slice(0, 5);

      if (results.length === 0) {
        dropdown.innerHTML = `<div style="padding: 14px; text-align: center; color: #64748B;">Məhsul tapılmadı</div>`;
        dropdown.classList.add("active");
        return;
      }

      dropdown.innerHTML = results.map(p => {
        const title = lang === "az" ? p.title_az : p.title_en;
        return `
          <div class="search-result-item" onclick="window.location.href='product.html?id=${p.id}'">
            <img src="${p.image}" alt="${title}">
            <div class="search-item-info">
              <h5>${title}</h5>
              <span>${window.i18n.formatPrice(p.price)}</span>
            </div>
          </div>
        `;
      }).join("");

      dropdown.classList.add("active");
    });
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".header-search")) {
      dropdown.classList.remove("active");
    }
  });
}

// ==========================================================================
// Language Selector
// ==========================================================================
function initLanguageSelector() {
  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const selected = btn.getAttribute("data-lang");
      window.i18n.setLang(selected);
      renderCategories();
      renderBestSellers();
      renderCartDrawerItems();
    });
  });

  window.addEventListener("languageChanged", () => {
    renderCategories();
    renderBestSellers();
    renderCartDrawerItems();
  });
}

// ==========================================================================
// Mobile Navigation Drawer
// ==========================================================================
function initMobileNav() {
  const toggleBtn = document.querySelector(".mobile-menu-toggle");
  const drawer = document.getElementById("mobile-nav-drawer");
  const overlay = document.getElementById("mobile-drawer-overlay");
  const closeBtn = document.querySelector(".close-mobile-nav");

  if (!toggleBtn || !drawer) return;

  function openNav() {
    drawer.classList.add("active");
    if (overlay) overlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeNav() {
    drawer.classList.remove("active");
    if (overlay) overlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  toggleBtn.addEventListener("click", openNav);
  if (closeBtn) closeBtn.addEventListener("click", closeNav);
  if (overlay) overlay.addEventListener("click", closeNav);
}
