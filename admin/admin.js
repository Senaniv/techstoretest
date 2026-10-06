/**
 * TechStore - Admin Panel Management Logic
 * Clean, reactive and fully synced with localStorage DataStore
 */

document.addEventListener("DOMContentLoaded", () => {
  initTabs();
  initStats();
  renderAdminProducts();
  renderAdminCategories();
  renderAdminOrders();
  renderAdminBanners();
  renderAdminDiscounts();
  initMobileSidebar();
});

// ==========================================================================
// Tabs Switching
// ==========================================================================
function initTabs() {
  const buttons = document.querySelectorAll(".menu-item-btn[data-tab]");
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetTab = btn.getAttribute("data-tab");
      switchTab(targetTab);
    });
  });
}

function switchTab(tabId) {
  document.querySelectorAll(".menu-item-btn[data-tab]").forEach(b => {
    b.classList.toggle("active", b.getAttribute("data-tab") === tabId);
  });

  document.querySelectorAll(".tab-pane").forEach(pane => {
    pane.classList.toggle("active", pane.id === `tab-${tabId}`);
  });

  const titles = {
    dashboard: "İdarəetmə Paneli",
    products: "Məhsulların İdarə Edilməsi",
    categories: "Kateqoriyalar",
    orders: "Sifarişlərin İdarə Edilməsi",
    banners: "Hero Bannerlər",
    discounts: "Endirim və Kuponlar"
  };

  const titleEl = document.getElementById("admin-page-title");
  if (titleEl) titleEl.textContent = titles[tabId] || "Admin Panel";

  // Re-render target data
  if (tabId === "dashboard") initStats();
  if (tabId === "products") renderAdminProducts();
  if (tabId === "categories") renderAdminCategories();
  if (tabId === "orders") renderAdminOrders();
  if (tabId === "banners") renderAdminBanners();
  if (tabId === "discounts") renderAdminDiscounts();

  // Close mobile sidebar if open
  document.querySelector(".admin-sidebar").classList.remove("open");
}

// ==========================================================================
// Dashboard Metrics
// ==========================================================================
function initStats() {
  const products = window.dataStore.getProducts();
  const orders = window.dataStore.getOrders();

  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const pendingCount = orders.filter(o => o.status === "Gözləyir").length;

  document.getElementById("stat-products-count").textContent = products.length;
  document.getElementById("stat-orders-count").textContent = orders.length;
  document.getElementById("stat-pending-count").textContent = pendingCount;
  document.getElementById("stat-revenue-total").textContent = window.i18n.formatPrice(totalRevenue);

  // Render recent orders on dashboard
  const recentTable = document.getElementById("dashboard-recent-orders");
  if (recentTable) {
    const recent = orders.slice(0, 5);
    if (recent.length === 0) {
      recentTable.innerHTML = `<tr><td colspan="5" style="text-align:center; color:#94A3B8;">Hələ sifariş yoxdur</td></tr>`;
      return;
    }
    recentTable.innerHTML = recent.map(o => `
      <tr>
        <td><strong>${o.id}</strong></td>
        <td>${o.customer}</td>
        <td>${o.date}</td>
        <td><strong>${window.i18n.formatPrice(o.total)}</strong></td>
        <td><span class="status-badge ${getStatusBadgeClass(o.status)}">${o.status}</span></td>
      </tr>
    `).join("");
  }
}

function getStatusBadgeClass(status) {
  if (status === "Gözləyir") return "status-pending";
  if (status === "Təsdiqləndi") return "status-confirmed";
  if (status === "Göndərildi") return "status-shipped";
  if (status === "Çatdırıldı") return "status-delivered";
  return "";
}

// ==========================================================================
// Products CRUD
// ==========================================================================
let editingProductId = null;

function renderAdminProducts() {
  const tbody = document.getElementById("admin-products-table");
  if (!tbody) return;

  const products = window.dataStore.getProducts();
  const searchQuery = (document.getElementById("product-search-input")?.value || "").toLowerCase();

  const filtered = products.filter(p => 
    p.title_az.toLowerCase().includes(searchQuery) ||
    p.category.toLowerCase().includes(searchQuery)
  );

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: #94A3B8; padding: 32px;">Məhsul tapılmadı</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(p => `
    <tr>
      <td>
        <img src="${p.image}" class="product-thumb-sm" alt="${p.title_az}">
      </td>
      <td>
        <div style="font-weight: 700; color: var(--admin-text);">${p.title_az}</div>
        <div style="font-size: 0.8rem; color: var(--admin-muted);">${p.title_en || ''}</div>
      </td>
      <td><span style="background: #F1F5F9; padding: 3px 8px; border-radius: 6px; font-size: 0.82rem;">${p.category}</span></td>
      <td><strong>${window.i18n.formatPrice(p.price)}</strong></td>
      <td>
        <span style="color: ${p.stockCount > 0 ? '#10B981' : '#EF4444'}; font-weight: 700;">
          ${p.stockCount || 10} ədəd
        </span>
      </td>
      <td>
        <div class="action-btn-group">
          <button class="action-icon-btn-admin" onclick="openEditProductModal(${p.id})" title="Redaktə et">✏️</button>
          <button class="action-icon-btn-admin delete" onclick="deleteProductConfirm(${p.id})" title="Sil">🗑️</button>
        </div>
      </td>
    </tr>
  `).join("");
}

function openAddProductModal() {
  editingProductId = null;
  document.getElementById("product-modal-title").textContent = "Yeni Məhsul Əlavə Et";
  document.getElementById("product-form").reset();
  populateCategorySelect();
  document.getElementById("product-modal").classList.add("active");
}

function openEditProductModal(id) {
  const product = window.dataStore.getProductById(id);
  if (!product) return;

  editingProductId = id;
  document.getElementById("product-modal-title").textContent = "Məhsulu Redaktə Et";
  populateCategorySelect();

  document.getElementById("p-title-az").value = product.title_az;
  document.getElementById("p-title-en").value = product.title_en || "";
  document.getElementById("p-category").value = product.category;
  document.getElementById("p-price").value = product.price;
  document.getElementById("p-old-price").value = product.oldPrice || "";
  document.getElementById("p-discount").value = product.discount || "";
  document.getElementById("p-image").value = product.image;
  document.getElementById("p-stock").value = product.stockCount || 10;
  document.getElementById("p-desc-az").value = product.description_az || "";
  document.getElementById("p-bestseller").checked = !!product.isBestSeller;

  document.getElementById("product-modal").classList.add("active");
}

function closeProductModal() {
  document.getElementById("product-modal").classList.remove("active");
}

function populateCategorySelect() {
  const select = document.getElementById("p-category");
  const categories = window.dataStore.getCategories();
  select.innerHTML = categories.map(c => `
    <option value="${c.id}">${c.name_az} (${c.id})</option>
  `).join("");
}

function handleSaveProduct(e) {
  e.preventDefault();
  const titleAz = document.getElementById("p-title-az").value;
  const titleEn = document.getElementById("p-title-en").value || titleAz;
  const category = document.getElementById("p-category").value;
  const price = parseFloat(document.getElementById("p-price").value);
  const oldPrice = parseFloat(document.getElementById("p-old-price").value) || null;
  const discount = document.getElementById("p-discount").value || "-10%";
  const image = document.getElementById("p-image").value || "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=600&q=80";
  const stock = parseInt(document.getElementById("p-stock").value) || 10;
  const descAz = document.getElementById("p-desc-az").value;
  const isBestSeller = document.getElementById("p-bestseller").checked;

  const productData = {
    title_az: titleAz,
    title_en: titleEn,
    category: category,
    price: price,
    oldPrice: oldPrice,
    discount: discount,
    image: image,
    stockCount: stock,
    description_az: descAz,
    description_en: descAz,
    isBestSeller: isBestSeller,
    rating: 5.0,
    reviewsCount: Math.floor(10 + Math.random() * 90)
  };

  if (editingProductId) {
    window.dataStore.updateProduct(editingProductId, productData);
    alert("Məhsul uğurla yeniləndi! ✅");
  } else {
    window.dataStore.addProduct(productData);
    alert("Yeni məhsul uğurla əlavə edildi! 🎉");
  }

  closeProductModal();
  renderAdminProducts();
  initStats();
}

function deleteProductConfirm(id) {
  if (confirm("Bu məhsulu silmək istədiyinizə əminsiniz?")) {
    window.dataStore.deleteProduct(id);
    renderAdminProducts();
    initStats();
  }
}

// ==========================================================================
// Categories CRUD
// ==========================================================================
function renderAdminCategories() {
  const tbody = document.getElementById("admin-categories-table");
  if (!tbody) return;

  const categories = window.dataStore.getCategories();
  tbody.innerHTML = categories.map(c => `
    <tr>
      <td><img src="${c.icon}" class="product-thumb-sm" alt="${c.name_az}"></td>
      <td><strong>${c.name_az}</strong></td>
      <td>${c.name_en}</td>
      <td><code>${c.id}</code></td>
      <td>
        <button class="action-icon-btn-admin delete" onclick="deleteCategoryConfirm('${c.id}')" title="Sil">🗑️</button>
      </td>
    </tr>
  `).join("");
}

function addNewCategoryPrompt() {
  const id = prompt("Kateqoriya ID-si (məs. smart-home):");
  if (!id) return;
  const nameAz = prompt("Kateqoriya adı (AZ):");
  if (!nameAz) return;
  const nameEn = prompt("Kateqoriya adı (EN):", nameAz);

  window.dataStore.addCategory({
    id: id.toLowerCase().replace(/\s+/g, "-"),
    name_az: nameAz,
    name_en: nameEn,
    icon: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=400&q=80",
    badge: "0 məhsul"
  });

  renderAdminCategories();
  alert("Kateqoriya əlavə edildi! ✅");
}

function deleteCategoryConfirm(id) {
  if (confirm(`'${id}' kateqoriyasını silmək istəyirsiniz?`)) {
    window.dataStore.deleteCategory(id);
    renderAdminCategories();
  }
}

// ==========================================================================
// Orders Management
// ==========================================================================
function renderAdminOrders() {
  const tbody = document.getElementById("admin-orders-table");
  if (!tbody) return;

  const orders = window.dataStore.getOrders();
  if (orders.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: #94A3B8; padding: 32px;">Sifariş yoxdur</td></tr>`;
    return;
  }

  tbody.innerHTML = orders.map(o => `
    <tr>
      <td><strong>${o.id}</strong></td>
      <td>
        <div style="font-weight: 700;">${o.customer}</div>
        <div style="font-size: 0.8rem; color: var(--admin-muted);">${o.phone}</div>
      </td>
      <td><small>${o.city}</small></td>
      <td>
        <span title="${o.items ? o.items.map(i => i.title).join(', ') : ''}" style="cursor: help;">
          ${o.items ? o.items.length : 1} ədəd məhsul ℹ️
        </span>
      </td>
      <td><strong>${window.i18n.formatPrice(o.total)}</strong></td>
      <td>
        <select onchange="updateOrderStatus('${o.id}', this.value)" style="padding: 4px 8px; border-radius: 6px; font-size: 0.85rem; border: 1px solid var(--admin-border); font-weight: 600;">
          <option value="Gözləyir" ${o.status === 'Gözləyir' ? 'selected' : ''}>⏳ Gözləyir</option>
          <option value="Təsdiqləndi" ${o.status === 'Təsdiqləndi' ? 'selected' : ''}>✓ Təsdiqləndi</option>
          <option value="Göndərildi" ${o.status === 'Göndərildi' ? 'selected' : ''}>🚚 Göndərildi</option>
          <option value="Çatdırıldı" ${o.status === 'Çatdırıldı' ? 'selected' : ''}>🎉 Çatdırıldı</option>
        </select>
      </td>
      <td>
        <button class="action-icon-btn-admin delete" onclick="deleteOrderConfirm('${o.id}')" title="Sil">🗑️</button>
      </td>
    </tr>
  `).join("");
}

function updateOrderStatus(id, newStatus) {
  window.dataStore.updateOrderStatus(id, newStatus);
  initStats();
}

function deleteOrderConfirm(id) {
  if (confirm(`'${id}' sifarişini silmək istəyirsiniz?`)) {
    window.dataStore.deleteOrder(id);
    renderAdminOrders();
    initStats();
  }
}

// ==========================================================================
// Banners & Discounts
// ==========================================================================
function renderAdminBanners() {
  const container = document.getElementById("admin-banners-list");
  if (!container) return;

  const banners = window.dataStore.getBanners();
  container.innerHTML = banners.map(b => `
    <div style="display: flex; gap: 20px; align-items: center; background: #FFFFFF; padding: 18px; border-radius: 12px; border: 1px solid var(--admin-border); margin-bottom: 14px;">
      <img src="${b.image}" style="width: 100px; height: 60px; object-fit: cover; border-radius: 8px;">
      <div style="flex: 1;">
        <h4 style="font-size: 1rem; font-weight: 700;">${b.title_az}</h4>
        <p style="font-size: 0.85rem; color: var(--admin-muted);">${b.desc_az}</p>
      </div>
      <span class="status-badge ${b.active ? 'status-delivered' : 'status-pending'}">
        ${b.active ? 'Aktiv' : 'Qeyri-aktiv'}
      </span>
    </div>
  `).join("");
}

function renderAdminDiscounts() {
  const container = document.getElementById("admin-discounts-list");
  if (!container) return;

  const coupons = window.dataStore.getCoupons();
  container.innerHTML = coupons.map(c => `
    <div style="display: flex; justify-content: space-between; align-items: center; background: #FFFFFF; padding: 16px 20px; border-radius: 12px; border: 1px solid var(--admin-border); margin-bottom: 12px;">
      <div>
        <span style="font-weight: 800; font-size: 1.1rem; color: var(--admin-primary); background: #EAF7EE; padding: 4px 10px; border-radius: 6px; letter-spacing: 1px;">
          ${c.code}
        </span>
        <span style="margin-left: 14px; color: var(--admin-text); font-weight: 600;">${c.desc}</span>
      </div>
      <div style="display: flex; align-items: center; gap: 14px;">
        <strong style="color: #10B981;">-${c.value}%</strong>
        <span class="status-badge status-delivered">Aktiv</span>
      </div>
    </div>
  `).join("");
}

function resetAllDataConfirm() {
  if (confirm("Bütün məlumatları ilkin vəziyyətinə qaytarmaq istəyirsiniz? (Məhsullar, sifarişlər yenilənəcək)")) {
    window.dataStore.resetAll();
    alert("Məlumatlar ilkin vəziyyətinə qaytarıldı! ✅");
    location.reload();
  }
}

function initMobileSidebar() {
  const toggleBtn = document.querySelector(".admin-mobile-toggle");
  const sidebar = document.querySelector(".admin-sidebar");
  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener("click", () => {
      sidebar.classList.toggle("open");
    });
  }
}
