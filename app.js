/**
 * NANGKRING SKUY 45 - JAVASCRIPT APPLICATION LOGIC
 * Street Food, BBQ & Urban Streetwear Concept (EST. 2026)
 * Features:
 * - Slideshow Carousel (BBQ & Street Food Highlights)
 * - Interactive Menu Catalog (Search, Filter, Detail Modal with Spicy/Temp/Sugar options)
 * - Self-Ordering & Table Barcode Detection (e.g. ?meja=05)
 * - Digital E-Receipt (Waiting for payment at Cashier)
 * - Full Cashier POS Dashboard (Live Orders, Payment Processing, QR Table Generator, Sales Recap)
 */

// ==========================================
// 1. DATA STORE (MENU ITEMS)
// ==========================================
const MENU_DATA = [
  // --- BBQ & SATE SPESIAL (FEATURED IN PROMPT) ---
  {
    id: 101,
    name: "Sate Mental Skuy 45",
    category: "bbq",
    price: 25000,
    rating: 4.9,
    reviews: 380,
    tags: ["bestseller", "bbq", "food"],
    badge: "#1 BEST SELLER",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80",
    desc: "Sate daging sapi bakar bumbu rempah bakar pedas manis spesial yang bikin mental nagih! Dibakar di atas arang batok kelapa asli hingga wangi smokey.",
    isFood: true,
    available: true
  },
  {
    id: 102,
    name: "Sate Ayam Bumbu Kacang",
    category: "bbq",
    price: 20000,
    rating: 4.8,
    reviews: 290,
    tags: ["bestseller", "bbq", "food"],
    badge: "FAVORIT",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop&q=80",
    desc: "Potongan daging ayam empuk tanpa lemak, dibakar dengan kecap manis karamelisasi dan siraman saus kacang gurih kental bertekstur legit.",
    isFood: true,
    available: true
  },
  {
    id: 103,
    name: "Sosis Bakar Jumbo BBQ",
    category: "bbq",
    price: 18000,
    rating: 4.8,
    reviews: 310,
    tags: ["bestseller", "bbq", "snack"],
    badge: "JUMBO",
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&auto=format&fit=crop&q=80",
    desc: "Sosis sapi bratwurst ukuran jumbo dengan sayatan spiral, dipanggang dengan olesan saus BBQ lada hitam pedas manis dan mayones creamy.",
    isFood: true,
    available: true
  },
  {
    id: 104,
    name: "Crispy Chicken Wings BBQ",
    category: "bbq",
    price: 22000,
    rating: 4.9,
    reviews: 240,
    tags: ["bestseller", "bbq", "snack"],
    badge: "CRISPY",
    image: "https://images.unsplash.com/photo-1527477378408-1bc0e6761005?w=600&auto=format&fit=crop&q=80",
    desc: "6 potong sayap ayam renyah digoreng keemasan lalu diglaze saus BBQ pedas manis pekat dengan taburan wijen sangrai gurih.",
    isFood: true,
    available: true
  },

  // --- MAKANAN UTAMA (MAIN COURSE) ---
  {
    id: 105,
    name: "Nasi Goreng BBQ Spesial",
    category: "main-course",
    price: 28000,
    rating: 4.9,
    reviews: 360,
    tags: ["bestseller", "food"],
    badge: "KENYANG",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&auto=format&fit=crop&q=80",
    desc: "Nasi goreng aroma smokey wajan panas dengan bumbu BBQ rahasia, suwiran daging bakar, telur mata sapi setengah matang, kerupuk, dan acar segar.",
    isFood: true,
    available: true
  },
  {
    id: 106,
    name: "Wagyu Skuy Rice Bowl",
    category: "main-course",
    price: 38000,
    rating: 4.9,
    reviews: 280,
    tags: ["bestseller", "food"],
    badge: "CHEF CHOICE",
    image: "assets/images/wagyu_bowl.jpg",
    desc: "Daging wagyu juicy dengan saus teriyaki lada hitam, onsen egg lembut yang meleleh, dan bawang putih renyah di atas nasi pulen hangat.",
    isFood: true,
    available: true
  },
  {
    id: 107,
    name: "Chicken Katsu Japanese Curry",
    category: "main-course",
    price: 32000,
    rating: 4.8,
    reviews: 195,
    tags: ["food"],
    badge: "POPULER",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600&auto=format&fit=crop&q=80",
    desc: "Dada ayam fillet berbalut tepung panko super renyah dengan kuah kari kental Jepang kaya rempah dan sayuran wortel-kentang.",
    isFood: true,
    available: true
  },
  {
    id: 108,
    name: "Spaghetti Aglio Olio Smoked Beef",
    category: "main-course",
    price: 30000,
    rating: 4.7,
    reviews: 115,
    tags: ["food"],
    badge: "ITALIAN",
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=600&auto=format&fit=crop&q=80",
    desc: "Pasta al dente ditumis dengan minyak zaitun extra virgin, bawang putih cincang, cabai kering, dan potongan smoked beef gurih.",
    isFood: true,
    available: true
  },

  // --- STREET FOOD & SNACKS ---
  {
    id: 109,
    name: "Crispy Truffle Fries Supreme",
    category: "snacks",
    price: 20000,
    rating: 4.8,
    reviews: 410,
    tags: ["bestseller", "snack"],
    badge: "CRISPY",
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&auto=format&fit=crop&q=80",
    desc: "Kentang goreng renyah dengan baluran aroma truffle oil harum, taburan keju parmesan parut, dan saus cocolan garlic aioli.",
    isFood: true,
    available: true
  },
  {
    id: 110,
    name: "Cireng Salju Bumbu Rujak",
    category: "snacks",
    price: 16000,
    rating: 4.9,
    reviews: 240,
    tags: ["bestseller", "snack"],
    badge: "NONGKRONG",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&auto=format&fit=crop&q=80",
    desc: "Cireng kenyal di dalam krispi di luar, disajikan dengan saus cocol bumbu rujak asam manis pedas yang bikin merem melek.",
    isFood: true,
    available: true
  },
  {
    id: 111,
    name: "French Butter Croissant",
    category: "snacks",
    price: 18000,
    rating: 4.9,
    reviews: 150,
    tags: ["snack"],
    badge: "BAKERY",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&auto=format&fit=crop&q=80",
    desc: "Pastry croissant klasik dengan aroma butter Prancis wangi, tekstur luar garing berlapis dan dalam super lembut.",
    isFood: true,
    available: true
  },

  // --- SIGNATURE COFFEE ---
  {
    id: 112,
    name: "Skuy Signature Aren Latte",
    category: "signature",
    price: 22000,
    rating: 4.9,
    reviews: 320,
    tags: ["bestseller", "coffee"],
    badge: "#1 COFFEE",
    image: "assets/images/signature_aren.jpg",
    desc: "Perpaduan double shot espresso arabika-robusta pilihan dengan fresh milk creamy dan gula aren organik asli.",
    isBeverage: true,
    available: true
  },
  {
    id: 113,
    name: "Black Charcoal Velvet Latte",
    category: "signature",
    price: 25000,
    rating: 4.8,
    reviews: 190,
    tags: ["bestseller", "coffee"],
    badge: "SIGNATURE",
    image: "assets/images/charcoal_latte.jpg",
    desc: "Menu ikonik bertema hitam-putih khas Nangkring Skuy. Activated charcoal vanila dengan latte art swan elegan.",
    isBeverage: true,
    available: true
  },
  {
    id: 114,
    name: "Salted Caramel Macchiato",
    category: "signature",
    price: 26000,
    rating: 4.9,
    reviews: 140,
    tags: ["coffee"],
    badge: "POPULER",
    image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600&auto=format&fit=crop&q=80",
    desc: "Espresso lembut dengan saus karamel gurih asin, sirup vanila, dan buih susu kental yang memanjakan lidah.",
    isBeverage: true,
    available: true
  },
  {
    id: 115,
    name: "Cold Brew Vanilla Cream",
    category: "signature",
    price: 24000,
    rating: 4.7,
    reviews: 95,
    tags: ["coffee"],
    badge: "SLOW BREW",
    image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=600&auto=format&fit=crop&q=80",
    desc: "Kopi seduh dingin selama 16 jam, minim asam, disajikan dengan topping sweet vanilla cream lembut.",
    isBeverage: true,
    available: true
  },

  // --- FRESH DRINKS & NON-COFFEE ---
  {
    id: 116,
    name: "Kyoto Matcha Fusion Latte",
    category: "non-coffee",
    price: 25000,
    rating: 4.9,
    reviews: 210,
    tags: ["bestseller"],
    badge: "FAVORIT",
    image: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=600&auto=format&fit=crop&q=80",
    desc: "Bubuk matcha premium asal Uji, Kyoto berpadu dengan susu segar menghasilkan aroma earthy manis yang menenangkan.",
    isBeverage: true,
    available: true
  },
  {
    id: 117,
    name: "Lychee Berry Sparkler",
    category: "non-coffee",
    price: 22000,
    rating: 4.9,
    reviews: 130,
    tags: ["bestseller"],
    badge: "SEGAR",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&auto=format&fit=crop&q=80",
    desc: "Minuman soda mocktail menyegarkan dengan buah leci utuh, sirup wild berry, dan daun mint segar.",
    isBeverage: true,
    available: true
  },
  {
    id: 118,
    name: "Artisan Belgian Dark Chocolate",
    category: "non-coffee",
    price: 24000,
    rating: 4.8,
    reviews: 160,
    tags: [],
    badge: "RICH",
    image: "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=600&auto=format&fit=crop&q=80",
    desc: "Cokelat hitam Belgia murni 70% dengan rasa pekat, sedikit pahit manis, dan tekstur kental yang mewah.",
    isBeverage: true,
    available: true
  }
];

// ==========================================
// 2. APPLICATION STATE
// ==========================================
let state = {
  currentTable: "Belum Dipilih",
  customerName: "",
  cart: [],
  activeCategory: "all",
  activeTag: "all",
  searchQuery: "",
  activeSlide: 0,
  slideInterval: null,
  selectedModalDish: null,
  modalQty: 1,
  
  // POS System State
  posFilterStatus: "all",
  posPayMethod: "Tunai / Cash",
  currentPayingOrder: null,
  manualPosBill: []
};

// Initial setup from LocalStorage / URL params
function initState() {
  // Load saved customer name
  state.customerName = localStorage.getItem('nangkring_skuy_customer_name') || "";
  const nameInput = document.getElementById('cartCustomerNameInput');
  if (nameInput && state.customerName) {
    nameInput.value = state.customerName;
  }

  // Check URL query param for table (e.g. ?meja=05 or ?table=05)
  const urlParams = new URLSearchParams(window.location.search);
  const tableFromUrl = urlParams.get('meja') || urlParams.get('table');

  if (tableFromUrl) {
    const formattedTable = tableFromUrl.toLowerCase().includes('meja') 
      ? tableFromUrl.toUpperCase() 
      : `Meja ${tableFromUrl.padStart(2, '0')}`;
    setTableNumber(formattedTable);
    showToast(`📍 Terhubung ke ${formattedTable}`);
  } else {
    const savedTable = localStorage.getItem('nangkring_skuy_table');
    if (savedTable) {
      state.currentTable = savedTable;
      updateTableUI();
    }
  }

  // Load cart from storage
  const savedCart = localStorage.getItem('nangkring_skuy_cart');
  if (savedCart) {
    try {
      state.cart = JSON.parse(savedCart);
    } catch (e) {
      state.cart = [];
    }
  }

  // Initialize POS Orders in localStorage if not exist
  if (!localStorage.getItem('nangkring_skuy_orders')) {
    const initialOrders = [
      {
        orderId: "#NS-4501",
        table: "Meja 02",
        time: "Hari ini, 20:30 WIB",
        status: "Lunas",
        method: "QRIS",
        total: 70000,
        items: [
          { name: "Sate Mental Skuy 45 (Pedas Mantap)", qty: 2, price: 25000 },
          { name: "Sosis Bakar Jumbo BBQ", qty: 1, price: 20000 }
        ]
      },
      {
        orderId: "#NS-4502",
        table: "Meja 05",
        time: "Hari ini, 21:15 WIB",
        status: "Lunas",
        method: "Tunai / Cash",
        total: 50000,
        items: [
          { name: "Nasi Goreng BBQ Spesial", qty: 1, price: 28000 },
          { name: "Skuy Signature Aren Latte", qty: 1, price: 22000 }
        ]
      }
    ];
    localStorage.setItem('nangkring_skuy_orders', JSON.stringify(initialOrders));
  }

  renderMenu();
  renderCart();
  startSlideshow();
  initTableGrid();
}

// ==========================================
// 3. SLIDESHOW CAROUSEL LOGIC
// ==========================================
function startSlideshow() {
  const slides = document.querySelectorAll('.slide-item');
  if (!slides.length) return;

  if (state.slideInterval) clearInterval(state.slideInterval);
  state.slideInterval = setInterval(() => {
    nextSlide();
  }, 5500);
}

function showSlide(index) {
  const slides = document.querySelectorAll('.slide-item');
  const dots = document.querySelectorAll('.slide-indicators .dot');
  if (!slides.length) return;

  if (index >= slides.length) state.activeSlide = 0;
  else if (index < 0) state.activeSlide = slides.length - 1;
  else state.activeSlide = index;

  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === state.activeSlide);
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === state.activeSlide);
  });
}

function nextSlide() {
  showSlide(state.activeSlide + 1);
}

function prevSlide() {
  showSlide(state.activeSlide - 1);
}

function goToSlide(index) {
  showSlide(index);
  startSlideshow();
}

// ==========================================
// 4. MENU FILTERING & RENDERING
// ==========================================
function renderMenu() {
  const gridContainer = document.getElementById('menuGridContainer');
  const emptyState = document.getElementById('emptyMenuState');
  const countText = document.getElementById('menuCountText');
  if (!gridContainer) return;

  // Filter items
  const filtered = MENU_DATA.filter(item => {
    // Category filter
    const matchesCat = state.activeCategory === 'all' || item.category === state.activeCategory;
    
    // Tag filter
    const matchesTag = state.activeTag === 'all' || (item.tags && item.tags.includes(state.activeTag));

    // Search query
    const query = state.searchQuery.toLowerCase().trim();
    const matchesSearch = !query || 
      item.name.toLowerCase().includes(query) || 
      item.desc.toLowerCase().includes(query) || 
      item.category.toLowerCase().includes(query);

    return matchesCat && matchesTag && matchesSearch;
  });

  if (countText) {
    countText.innerHTML = `Menampilkan <strong>${filtered.length}</strong> dari ${MENU_DATA.length} menu`;
  }

  if (filtered.length === 0) {
    gridContainer.innerHTML = '';
    if (emptyState) emptyState.style.display = 'block';
    return;
  }

  if (emptyState) emptyState.style.display = 'none';

  gridContainer.innerHTML = filtered.map(item => {
    return `
      <div class="menu-card" data-id="${item.id}">
        <div class="menu-card-img-wrap" onclick="openDishDetailModal(${item.id})">
          <img src="${item.image}" alt="${item.name}" class="menu-card-img" onerror="this.src='https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop&q=80'">
          ${item.badge ? `<span class="menu-card-badge">${item.badge}</span>` : ''}
        </div>
        <div class="menu-card-body">
          <span class="menu-card-cat">${formatCategoryName(item.category)}</span>
          <h4 class="menu-card-title" onclick="openDishDetailModal(${item.id})">${item.name}</h4>
          <p class="menu-card-desc">${item.desc}</p>
          <div class="menu-card-footer">
            <div class="menu-card-price">${formatRupiah(item.price)}</div>
            <button class="btn-add-menu" onclick="quickAddToCart(${item.id}, '${item.name}', ${item.price}, '${item.image}')">
              <i class="fa-solid fa-plus"></i> Tambah
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function formatCategoryName(cat) {
  switch (cat) {
    case 'bbq': return 'BBQ & Sate Spesial';
    case 'main-course': return 'Makanan Utama';
    case 'snacks': return 'Street Food & Snacks';
    case 'signature': return 'Signature Coffee';
    case 'non-coffee': return 'Fresh Drinks';
    default: return 'Menu Spesial';
  }
}

function filterByCategory(cat) {
  state.activeCategory = cat;
  
  document.querySelectorAll('.cat-tab').forEach(tab => {
    tab.classList.toggle('active', tab.getAttribute('onclick').includes(`'${cat}'`));
  });

  renderMenu();
}

function filterByTag(tag) {
  state.activeTag = tag;
  
  document.querySelectorAll('.tag-filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('onclick').includes(`'${tag}'`));
  });

  renderMenu();
}

function handleMenuSearch(val) {
  state.searchQuery = val;
  const clearBtn = document.getElementById('clearSearchBtn');
  if (clearBtn) {
    clearBtn.style.display = val.length > 0 ? 'block' : 'none';
  }
  renderMenu();
}

function clearMenuSearch() {
  const searchInput = document.getElementById('menuSearchInput');
  const clearBtn = document.getElementById('clearSearchBtn');
  if (searchInput) searchInput.value = '';
  if (clearBtn) clearBtn.style.display = 'none';
  state.searchQuery = '';
  renderMenu();
}

// ==========================================
// 5. TABLE SELECTOR & QR SCANNER
// ==========================================
function initTableGrid() {
  const grid = document.getElementById('tableGridSelection');
  if (!grid) return;

  let html = '';
  for (let i = 1; i <= 20; i++) {
    const tableNumStr = `Meja ${i < 10 ? '0' + i : i}`;
    html += `
      <button class="table-btn-choice ${state.currentTable === tableNumStr ? 'active' : ''}" onclick="selectActiveTable('${tableNumStr}')">
        ${i < 10 ? '0' + i : i}
      </button>
    `;
  }
  grid.innerHTML = html;
}

function openTableSelectorModal() {
  initTableGrid();
  document.getElementById('tableSelectorModal')?.classList.add('active');
}

function closeTableSelectorModal() {
  document.getElementById('tableSelectorModal')?.classList.remove('active');
}

function selectActiveTable(tableStr) {
  setTableNumber(tableStr);
  closeTableSelectorModal();
  showToast(`✅ Meja Aktif: ${tableStr}`);
}

function setTableNumber(tableStr) {
  state.currentTable = tableStr;
  localStorage.setItem('nangkring_skuy_table', tableStr);
  updateTableUI();
}

function updateTableUI() {
  const activeText = state.currentTable || "Pilih Nomor Meja";
  
  const textElem = document.getElementById('activeTableText');
  if (textElem) textElem.innerText = activeText;

  const mobileTextElem = document.getElementById('mobileActiveTableText');
  if (mobileTextElem) mobileTextElem.innerText = activeText;

  const heroTableInfo = document.getElementById('heroTableInfo');
  if (heroTableInfo) {
    heroTableInfo.innerText = state.currentTable === "Belum Dipilih" 
      ? "Mode Pelanggan: Meja Belum Dipilih (Klik untuk Pilih Meja)" 
      : `Anda sedang memesan untuk: ${state.currentTable}`;
  }

  const menuTableLabel = document.getElementById('menuTableLabel');
  if (menuTableLabel) menuTableLabel.innerText = activeText;

  const drawerTableTag = document.getElementById('drawerTableTag');
  if (drawerTableTag) drawerTableTag.innerText = activeText;
}

// ==========================================
// 6. DISH DETAIL & CUSTOMIZATION MODAL
// ==========================================
function openDishDetailModal(dishId) {
  const dish = MENU_DATA.find(item => item.id === dishId);
  if (!dish) return;

  state.selectedModalDish = dish;
  state.modalQty = 1;

  document.getElementById('modalDishTitle').innerText = dish.name;
  document.getElementById('modalDishDesc').innerText = dish.desc;
  document.getElementById('modalDishPrice').innerText = formatRupiah(dish.price);
  document.getElementById('modalDishImg').src = dish.image;
  document.getElementById('modalDishBadge').innerText = formatCategoryName(dish.category);
  document.getElementById('modalQtyDisplay').innerText = state.modalQty;
  document.getElementById('modalTotalPay').innerText = formatRupiah(dish.price * state.modalQty);
  document.getElementById('modalDishNotes').value = '';

  // Show/Hide options based on food / beverage
  const spicyGroup = document.getElementById('spicyOptionGroup');
  const tempGroup = document.getElementById('tempOptionGroup');
  const sugarGroup = document.getElementById('sugarOptionGroup');

  if (dish.isFood) {
    if (spicyGroup) spicyGroup.style.display = 'block';
    if (tempGroup) tempGroup.style.display = 'none';
    if (sugarGroup) sugarGroup.style.display = 'none';
  } else if (dish.isBeverage) {
    if (spicyGroup) spicyGroup.style.display = 'none';
    if (tempGroup) tempGroup.style.display = 'block';
    if (sugarGroup) sugarGroup.style.display = 'block';
  } else {
    if (spicyGroup) spicyGroup.style.display = 'none';
    if (tempGroup) tempGroup.style.display = 'none';
    if (sugarGroup) sugarGroup.style.display = 'none';
  }

  document.getElementById('dishDetailModal')?.classList.add('active');
}

function closeDishDetailModal() {
  document.getElementById('dishDetailModal')?.classList.remove('active');
  state.selectedModalDish = null;
}

function adjustModalQty(delta) {
  state.modalQty = Math.max(1, state.modalQty + delta);
  document.getElementById('modalQtyDisplay').innerText = state.modalQty;
  if (state.selectedModalDish) {
    document.getElementById('modalTotalPay').innerText = formatRupiah(state.selectedModalDish.price * state.modalQty);
  }
}

function submitDishModalToCart() {
  if (!state.selectedModalDish) return;

  const dish = state.selectedModalDish;
  let customOptions = [];

  if (dish.isFood) {
    const selectedSpicy = document.querySelector('input[name="modalSpicy"]:checked')?.value || "Normal Gurih";
    customOptions.push(`Pedas: ${selectedSpicy}`);
  } else if (dish.isBeverage) {
    const selectedTemp = document.querySelector('input[name="modalTemp"]:checked')?.value || "Ice";
    const selectedSugar = document.querySelector('input[name="modalSugar"]:checked')?.value || "Normal";
    customOptions.push(selectedTemp);
    customOptions.push(selectedSugar);
  }

  const notes = document.getElementById('modalDishNotes')?.value.trim();
  if (notes) customOptions.push(`Catatan: ${notes}`);

  const itemOptionsStr = customOptions.join(" • ");

  addItemToCart({
    id: dish.id,
    name: dish.name,
    price: dish.price,
    image: dish.image,
    options: itemOptionsStr,
    qty: state.modalQty
  });

  closeDishDetailModal();
  showToast(`🔥 Ditambahkan: ${state.modalQty}x ${dish.name}`);
}

function quickAddToCart(id, name, price, image) {
  addItemToCart({
    id: id,
    name: name,
    price: price,
    image: image,
    options: "Standard Varian",
    qty: 1
  });
  showToast(`🔥 Ditambahkan ke pesanan: ${name}`);
}

// ==========================================
// 7. CART & TABLE BILL DRAWER
// ==========================================
function addItemToCart(item) {
  const existingIndex = state.cart.findIndex(c => c.id === item.id && c.options === item.options);
  if (existingIndex > -1) {
    state.cart[existingIndex].qty += item.qty;
  } else {
    state.cart.push(item);
  }

  saveCart();
  renderCart();
  playAudioChime();
}

function updateCartItemQty(index, delta) {
  if (!state.cart[index]) return;
  state.cart[index].qty += delta;

  if (state.cart[index].qty <= 0) {
    state.cart.splice(index, 1);
  }

  saveCart();
  renderCart();
}

function removeCartItem(index) {
  state.cart.splice(index, 1);
  saveCart();
  renderCart();
  showToast("Item dihapus dari pesanan");
}

function clearActiveCart() {
  if (state.cart.length === 0) return;
  state.cart = [];
  saveCart();
  renderCart();
  showToast("Daftar pesanan dikosongkan");
}

function saveCart() {
  localStorage.setItem('nangkring_skuy_cart', JSON.stringify(state.cart));
}

function renderCart() {
  const container = document.getElementById('cartItemsContainer');
  const cartBadge = document.getElementById('cartCount');
  const subtotalElem = document.getElementById('cartSubtotal');
  const totalElem = document.getElementById('cartTotalPay');
  if (!container) return;

  const totalCount = state.cart.reduce((sum, item) => sum + item.qty, 0);
  if (cartBadge) cartBadge.innerText = totalCount;

  if (state.cart.length === 0) {
    container.innerHTML = `
      <div class="empty-menu-state py-4" style="background: transparent; border: none;">
        <i class="fa-solid fa-receipt empty-icon"></i>
        <h4 style="font-family: var(--font-subheadline); font-size:1.2rem;">Pesanan Masih Kosong</h4>
        <p class="text-muted">Pilih menu BBQ, sate, dan minuman favoritmu dari daftar menu.</p>
      </div>
    `;
    if (subtotalElem) subtotalElem.innerText = formatRupiah(0);
    if (totalElem) totalElem.innerText = formatRupiah(0);
    return;
  }

  let subtotal = 0;
  container.innerHTML = state.cart.map((item, index) => {
    const itemTotal = item.price * item.qty;
    subtotal += itemTotal;

    return `
      <div class="cart-item-row">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img" onerror="this.src='https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop&q=80'">
        <div class="cart-item-info">
          <div class="cart-item-title">${item.name}</div>
          <div class="cart-item-meta">${item.options || 'Standard'}</div>
          <div class="cart-item-price">${formatRupiah(item.price)} x ${item.qty} = <strong>${formatRupiah(itemTotal)}</strong></div>
        </div>
        <div class="cart-item-actions">
          <button class="btn-remove-item" onclick="removeCartItem(${index})" title="Hapus Item">
            <i class="fa-solid fa-trash-can"></i>
          </button>
          <div class="cart-item-qty">
            <button class="cart-qty-btn" onclick="updateCartItemQty(${index}, -1)">-</button>
            <span>${item.qty}</span>
            <button class="cart-qty-btn" onclick="updateCartItemQty(${index}, 1)">+</button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  if (subtotalElem) subtotalElem.innerText = formatRupiah(subtotal);
  if (totalElem) totalElem.innerText = formatRupiah(subtotal);
}

function toggleCartDrawer() {
  const drawer = document.getElementById('cartDrawer');
  const backdrop = document.getElementById('cartDrawerBackdrop');
  if (!drawer) return;

  const isOpen = drawer.classList.contains('open');
  drawer.classList.toggle('open', !isOpen);
  backdrop?.classList.toggle('open', !isOpen);
}

function handleCustomerNameInput(val) {
  state.customerName = val;
  localStorage.setItem('nangkring_skuy_customer_name', val);
}

// ==========================================
// 8. CUSTOMER DIGITAL E-RECEIPT (BAYAR DI KASIR)
// ==========================================
function proceedToOrderReceipt() {
  if (state.cart.length === 0) {
    showToast("⚠️ Pesanan masih kosong. Silakan pilih menu dulu!");
    return;
  }

  if (!state.currentTable || state.currentTable === "Belum Dipilih") {
    openTableSelectorModal();
    showToast("⚠️ Silakan pilih nomor meja Anda terlebih dahulu!");
    return;
  }

  const nameInput = document.getElementById('cartCustomerNameInput');
  const custName = (nameInput ? nameInput.value.trim() : '') || state.customerName.trim();

  if (!custName) {
    showToast("⚠️ Mohon isi Nama Pemesan / Customer terlebih dahulu!");
    if (nameInput) {
      nameInput.focus();
      nameInput.classList.add('input-error-shake');
      setTimeout(() => nameInput.classList.remove('input-error-shake'), 600);
    }
    return;
  }

  state.customerName = custName;
  localStorage.setItem('nangkring_skuy_customer_name', custName);

  const randomId = Math.floor(1000 + Math.random() * 9000);
  const orderId = `#NS-45${randomId.toString().substring(0, 2)}`;
  const now = new Date();
  const timeStr = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')} WIB`;

  const totalAmount = state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  const newOrder = {
    orderId: orderId,
    customer: custName,
    table: state.currentTable,
    time: timeStr,
    status: "Menunggu Pembayaran",
    method: "Bayar di Kasir",
    total: totalAmount,
    items: state.cart.map(item => ({
      name: `${item.name} (${item.options || 'Standard'})`,
      qty: item.qty,
      price: item.price
    }))
  };

  let savedOrders = [];
  try {
    savedOrders = JSON.parse(localStorage.getItem('nangkring_skuy_orders') || '[]');
  } catch (e) {
    savedOrders = [];
  }
  savedOrders.unshift(newOrder);
  localStorage.setItem('nangkring_skuy_orders', JSON.stringify(savedOrders));

  // Render Receipt Modal
  document.getElementById('recOrderId').innerText = orderId;
  const recCustomerElem = document.getElementById('recCustomerName');
  if (recCustomerElem) recCustomerElem.innerText = custName;
  document.getElementById('recTable').innerText = state.currentTable;
  document.getElementById('recTime').innerText = timeStr;
  document.getElementById('recTotalAmount').innerText = formatRupiah(totalAmount);
  document.getElementById('recBarcodeText').innerText = orderId.replace('#', '');

  const recItemsList = document.getElementById('recItemsList');
  if (recItemsList) {
    recItemsList.innerHTML = state.cart.map(item => `
      <div>
        <div class="receipt-item-line">
          <span>${item.qty}x ${item.name}</span>
          <strong>${formatRupiah(item.price * item.qty)}</strong>
        </div>
        <div class="receipt-item-sub">${item.options || 'Standard'}</div>
      </div>
    `).join('');
  }

  // QR Code for Order ID
  const qrContainer = document.getElementById('receiptQrCode');
  if (qrContainer) {
    qrContainer.innerHTML = '';
    if (typeof QRCode !== 'undefined') {
      new QRCode(qrContainer, {
        text: `NANGKRING_SKUY_45_ORDER:${orderId}:${custName}:${state.currentTable}:${totalAmount}`,
        width: 120,
        height: 120,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.M
      });
    }
  }

  toggleCartDrawer();
  document.getElementById('orderReceiptModal')?.classList.add('active');

  state.cart = [];
  saveCart();
  renderCart();
  playAudioChime();
  showToast(`🎉 Pesanan atas nama ${custName} siap dibayar di kasir!`);
}

function closeOrderReceiptModal() {
  document.getElementById('orderReceiptModal')?.classList.remove('active');
}

function sendOrderToCashierWhatsApp() {
  const orderId = document.getElementById('recOrderId').innerText;
  const customer = document.getElementById('recCustomerName')?.innerText || state.customerName || 'Pelanggan';
  const table = document.getElementById('recTable').innerText;
  const total = document.getElementById('recTotalAmount').innerText;

  const message = `Halo Kasir Nangkring Skuy 45! 🔥%0A%0ASaya ingin konfirmasi pesanan meja:%0A*No. Order:* ${orderId}%0A*Nama Pemesan:* ${customer}%0A*Posisi:* ${table}%0A*Total Tagihan:* ${total}%0A%0ASaya akan segera bayar di kasir. Terima kasih!`;
  window.open(`https://wa.me/6285184320877?text=${message}`, '_blank');
}

// ==========================================
// 9. CASHIER POS DASHBOARD
// ==========================================
function openCashierLoginModal() {
  document.getElementById('cashierPin').value = '';
  document.getElementById('cashierLoginModal')?.classList.add('active');
}

function closeCashierLoginModal() {
  document.getElementById('cashierLoginModal')?.classList.remove('active');
}

function handleCashierLogin(e) {
  e.preventDefault();
  const pin = document.getElementById('cashierPin').value.trim();

  if (pin === "1234") {
    closeCashierLoginModal();
    openCashierDashboard();
    showToast("🔑 Berhasil masuk ke Portal Kasir Nangkring Skuy 45");
  } else {
    showToast("❌ PIN Salah! Gunakan PIN default: 1234");
  }
}

function openCashierDashboard() {
  const posOverlay = document.getElementById('posDashboardOverlay');
  if (posOverlay) {
    posOverlay.style.display = 'flex';
    switchPosTab('orders');
    refreshPosOrders();
    initPosManualMenu();
  }
}

function closeCashierDashboard() {
  const posOverlay = document.getElementById('posDashboardOverlay');
  if (posOverlay) {
    posOverlay.style.display = 'none';
  }
}

function switchPosTab(tabKey) {
  document.querySelectorAll('.pos-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.pos-tab-panel').forEach(p => p.style.display = 'none');

  if (tabKey === 'orders') {
    document.getElementById('tabBtnOrders')?.classList.add('active');
    document.getElementById('posPanelOrders').style.display = 'block';
    refreshPosOrders();
  } else if (tabKey === 'manualOrder') {
    document.getElementById('tabBtnManualOrder')?.classList.add('active');
    document.getElementById('posPanelManualOrder').style.display = 'block';
    initPosManualMenu();
  } else if (tabKey === 'qrGen') {
    document.getElementById('tabBtnQrGen')?.classList.add('active');
    document.getElementById('posPanelQrGen').style.display = 'block';
    generateTableQrs();
  } else if (tabKey === 'sales') {
    document.getElementById('tabBtnSales')?.classList.add('active');
    document.getElementById('posPanelSales').style.display = 'block';
    renderSalesRecap();
  } else if (tabKey === 'database') {
    document.getElementById('tabBtnDatabase')?.classList.add('active');
    document.getElementById('posPanelDatabase').style.display = 'block';
    loadCloudDbSettings();
  }
}

function refreshPosOrders() {
  let orders = [];
  try {
    orders = JSON.parse(localStorage.getItem('nangkring_skuy_orders') || '[]');
  } catch (e) {
    orders = [];
  }

  const pendingCount = orders.filter(o => o.status === "Menunggu Pembayaran").length;
  const pendingBadge = document.getElementById('posPendingBadge');
  if (pendingBadge) pendingBadge.innerText = pendingCount;

  const ordersGrid = document.getElementById('posOrdersGrid');
  if (!ordersGrid) return;

  const filtered = orders.filter(o => {
    if (state.posFilterStatus === 'all') return true;
    return o.status === state.posFilterStatus;
  });

  if (filtered.length === 0) {
    ordersGrid.innerHTML = `
      <div class="empty-menu-state py-4" style="grid-column: 1 / -1;">
        <i class="fa-solid fa-inbox empty-icon"></i>
        <h4>Tidak Ada Pesanan</h4>
        <p class="text-muted">Semua pesanan pada filter ini sudah diproses.</p>
      </div>
    `;
    return;
  }

  ordersGrid.innerHTML = filtered.map(order => {
    const isPending = order.status === "Menunggu Pembayaran";
    const isPaid = order.status === "Lunas";

    return `
      <div class="pos-order-card">
        <div class="pos-card-head">
          <div>
            <div class="pos-card-id">${order.orderId}</div>
            <div class="pos-card-table">
              <i class="fa-solid fa-chair text-orange"></i> <strong>${order.table}</strong> • 
              <i class="fa-solid fa-user text-orange"></i> <strong>${order.customer || 'Pelanggan'}</strong>
              <div class="text-muted" style="font-size:0.75rem; margin-top:2px;">${order.time}</div>
            </div>
          </div>
          <span class="pos-status-tag ${isPending ? 'tag-pending' : isPaid ? 'tag-paid' : 'tag-completed'}">
            ${order.status}
          </span>
        </div>

        <div class="pos-card-items-list">
          ${order.items.map(it => `
            <div class="pos-card-item">
              <span>${it.qty}x ${it.name}</span>
              <strong>${formatRupiah(it.price * it.qty)}</strong>
            </div>
          `).join('')}
        </div>

        <div class="pos-card-foot">
          <div class="pos-card-total">
            <small class="text-muted">Total:</small>
            <strong>${formatRupiah(order.total)}</strong>
          </div>
          <div class="pos-card-actions">
            ${isPending ? `
              <button class="btn btn-primary btn-sm" onclick="openCashierPaymentModal('${order.orderId}')">
                <i class="fa-solid fa-money-bill"></i> Proses Bayar
              </button>
            ` : isPaid ? `
              <button class="btn btn-glass btn-xs" onclick="markOrderCompleted('${order.orderId}')">
                <i class="fa-solid fa-check-double text-orange"></i> Selesai
              </button>
              <button class="btn btn-glass btn-xs" onclick="printReceiptForOrder('${order.orderId}')">
                <i class="fa-solid fa-print"></i> Cetak
              </button>
            ` : `
              <button class="btn btn-glass btn-xs" onclick="printReceiptForOrder('${order.orderId}')">
                <i class="fa-solid fa-print"></i> Cetak Ulang
              </button>
            `}
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function filterPosOrders(status) {
  state.posFilterStatus = status;
  document.querySelectorAll('.pos-filter-group .filter-chip').forEach(chip => {
    chip.classList.toggle('active', chip.innerText.toLowerCase().includes(status.toLowerCase()) || (status === 'all' && chip.innerText === 'SEMUA'));
  });
  refreshPosOrders();
}

function openCashierPaymentModal(orderId) {
  let orders = JSON.parse(localStorage.getItem('nangkring_skuy_orders') || '[]');
  const order = orders.find(o => o.orderId === orderId);
  if (!order) return;

  state.currentPayingOrder = order;

  document.getElementById('posPayOrderId').innerText = order.orderId;
  document.getElementById('posPayTable').innerText = order.table;
  document.getElementById('posPayAmount').innerText = formatRupiah(order.total);
  document.getElementById('posCashGiven').value = '';
  document.getElementById('posChangeText').innerText = formatRupiah(0);

  document.getElementById('cashierPaymentModal')?.classList.add('active');
}

function closeCashierPaymentModal() {
  document.getElementById('cashierPaymentModal')?.classList.remove('active');
  state.currentPayingOrder = null;
}

function selectPosPayMethod(method) {
  state.posPayMethod = method;
  document.querySelectorAll('.pay-method-pill').forEach(pill => {
    pill.classList.toggle('active', pill.innerText.includes(method.split(' ')[0]));
  });

  const cashBox = document.getElementById('cashCalculationBox');
  if (cashBox) {
    cashBox.style.display = method.includes('Tunai') ? 'block' : 'none';
  }
}

function setQuickCash(val) {
  if (!state.currentPayingOrder) return;
  const input = document.getElementById('posCashGiven');
  if (val === 'exact') {
    input.value = state.currentPayingOrder.total;
  } else {
    input.value = val;
  }
  calculatePosChange();
}

function calculatePosChange() {
  if (!state.currentPayingOrder) return;
  const given = parseFloat(document.getElementById('posCashGiven').value) || 0;
  const change = Math.max(0, given - state.currentPayingOrder.total);
  document.getElementById('posChangeText').innerText = formatRupiah(change);
}

function confirmCashierPayment() {
  if (!state.currentPayingOrder) return;

  const orderId = state.currentPayingOrder.orderId;
  let orders = JSON.parse(localStorage.getItem('nangkring_skuy_orders') || '[]');
  const orderIndex = orders.findIndex(o => o.orderId === orderId);

  if (orderIndex > -1) {
    orders[orderIndex].status = "Lunas";
    orders[orderIndex].method = state.posPayMethod;
    localStorage.setItem('nangkring_skuy_orders', JSON.stringify(orders));
  }

  closeCashierPaymentModal();
  refreshPosOrders();
  playAudioChime();
  showToast(`✅ Pembayaran ${orderId} LUNAS via ${state.posPayMethod}`);
  printReceiptForOrder(orderId);
}

function markOrderCompleted(orderId) {
  let orders = JSON.parse(localStorage.getItem('nangkring_skuy_orders') || '[]');
  const orderIndex = orders.findIndex(o => o.orderId === orderId);
  if (orderIndex > -1) {
    orders[orderIndex].status = "Selesai";
    localStorage.setItem('nangkring_skuy_orders', JSON.stringify(orders));
  }
  refreshPosOrders();
  showToast(`Pesanan ${orderId} ditandai Selesai`);
}

function printReceiptForOrder(orderId) {
  let orders = JSON.parse(localStorage.getItem('nangkring_skuy_orders') || '[]');
  const order = orders.find(o => o.orderId === orderId);
  if (!order) return;

  document.getElementById('recOrderId').innerText = order.orderId;
  document.getElementById('recTable').innerText = order.table;
  document.getElementById('recTime').innerText = order.time;
  document.getElementById('recTotalAmount').innerText = formatRupiah(order.total);
  document.getElementById('recBarcodeText').innerText = order.orderId.replace('#', '');
  
  const statusBadge = document.getElementById('recStatus');
  if (statusBadge) {
    statusBadge.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${order.status.toUpperCase()} (${order.method || 'KASIR'})`;
    statusBadge.style.background = "#FF6B00";
  }

  const recItemsList = document.getElementById('recItemsList');
  if (recItemsList) {
    recItemsList.innerHTML = order.items.map(it => `
      <div class="receipt-item-line">
        <span>${it.qty}x ${it.name}</span>
        <strong>${formatRupiah(it.price * it.qty)}</strong>
      </div>
    `).join('');
  }

  window.print();
}

// Manual Orders
function initPosManualMenu() {
  const grid = document.getElementById('posManualMenuGrid');
  if (!grid) return;

  grid.innerHTML = MENU_DATA.map(item => `
    <div class="pos-mini-item-card" onclick="addManualPosItem(${item.id})">
      <h5>${item.name}</h5>
      <span>${formatRupiah(item.price)}</span>
    </div>
  `).join('');
}

function addManualPosItem(id) {
  const item = MENU_DATA.find(m => m.id === id);
  if (!item) return;

  const existing = state.manualPosBill.find(b => b.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    state.manualPosBill.push({
      id: item.id,
      name: item.name,
      price: item.price,
      qty: 1
    });
  }
  renderManualPosBill();
}

function renderManualPosBill() {
  const container = document.getElementById('posManualBillItems');
  const totalElem = document.getElementById('posManualTotal');
  if (!container) return;

  if (state.manualPosBill.length === 0) {
    container.innerHTML = `<p class="text-muted text-center py-4">Belum ada item dipilih.</p>`;
    if (totalElem) totalElem.innerText = formatRupiah(0);
    return;
  }

  let total = 0;
  container.innerHTML = state.manualPosBill.map((item, idx) => {
    const itemTotal = item.price * item.qty;
    total += itemTotal;
    return `
      <div class="d-flex justify-content-between align-items-center mb-2" style="display:flex; justify-content:space-between; font-size:0.88rem; padding: 4px 0;">
        <span>${item.qty}x ${item.name}</span>
        <div>
          <strong style="color:var(--color-yellow);">${formatRupiah(itemTotal)}</strong>
          <button style="color:#ef4444; margin-left:8px;" onclick="removeManualPosItem(${idx})">✕</button>
        </div>
      </div>
    `;
  }).join('');

  if (totalElem) totalElem.innerText = formatRupiah(total);
}

function removeManualPosItem(idx) {
  state.manualPosBill.splice(idx, 1);
  renderManualPosBill();
}

function processManualCashierCheckout() {
  if (state.manualPosBill.length === 0) {
    showToast("⚠️ Pilih menu terlebih dahulu!");
    return;
  }

  const table = document.getElementById('posDirectTableSelect')?.value || "Kasir / Direct";
  const total = state.manualPosBill.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const randomId = Math.floor(1000 + Math.random() * 9000);
  const orderId = `#NS-45${randomId.toString().substring(0, 2)}`;
  const now = new Date();
  const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')} WIB`;

  const newOrder = {
    orderId: orderId,
    table: table,
    time: timeStr,
    status: "Lunas",
    method: "Kasir Langsung",
    total: total,
    items: state.manualPosBill.map(i => ({ name: i.name, qty: i.qty, price: i.price }))
  };

  let orders = JSON.parse(localStorage.getItem('nangkring_skuy_orders') || '[]');
  orders.unshift(newOrder);
  localStorage.setItem('nangkring_skuy_orders', JSON.stringify(orders));

  state.manualPosBill = [];
  renderManualPosBill();
  showToast(`✅ Transaksi ${orderId} lunas!`);
  printReceiptForOrder(orderId);
}

// Table QR Generator
function generateTableQrs() {
  const container = document.getElementById('tableQrPrintGrid');
  if (!container) return;

  const currentUrlBase = window.location.origin + window.location.pathname;

  let html = '';
  for (let i = 1; i <= 10; i++) {
    const tableId = `Meja ${i < 10 ? '0' + i : i}`;
    const tableParam = i < 10 ? '0' + i : i;
    const targetUrl = `${currentUrlBase}?meja=${tableParam}`;

    html += `
      <div class="table-qr-stand-card">
        <i class="fa-solid fa-fire" style="font-size: 1.6rem; color: #FF6B00; margin-bottom: 4px;"></i>
        <h4>NANGKRING SKUY 45</h4>
        <span class="table-sub">${tableId}</span>
        <div id="tableQrCanvas_${i}" class="table-qr-canvas"></div>
        <p class="table-scan-instruction">Scan Barcode untuk Buka Menu & Pesan</p>
        <button class="btn-print-single-qr" onclick="printSingleQr('${tableId}')">
          <i class="fa-solid fa-print"></i> Cetak Meja Ini
        </button>
      </div>
    `;
  }
  container.innerHTML = html;

  for (let i = 1; i <= 10; i++) {
    const tableParam = i < 10 ? '0' + i : i;
    const targetUrl = `${currentUrlBase}?meja=${tableParam}`;
    const holder = document.getElementById(`tableQrCanvas_${i}`);
    if (holder && typeof QRCode !== 'undefined') {
      new QRCode(holder, {
        text: targetUrl,
        width: 130,
        height: 130,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.M
      });
    }
  }
}

function printAllTableQrs() {
  window.print();
}

function printSingleQr(tableId) {
  window.print();
}

// Sales Recap
function renderSalesRecap() {
  let orders = [];
  try {
    orders = JSON.parse(localStorage.getItem('nangkring_skuy_orders') || '[]');
  } catch (e) {
    orders = [];
  }

  const completedOrders = orders.filter(o => o.status === "Lunas" || o.status === "Selesai");
  const totalRevenue = completedOrders.reduce((sum, o) => sum + (o.total || 0), 0);
  const totalOrdersCount = completedOrders.length;
  const avgValue = totalOrdersCount > 0 ? Math.round(totalRevenue / totalOrdersCount) : 0;

  document.getElementById('posDailyRevenue').innerText = formatRupiah(totalRevenue);
  document.getElementById('posTotalOrdersCount').innerText = totalOrdersCount;
  document.getElementById('posAvgOrderValue').innerText = formatRupiah(avgValue);

  const tbody = document.getElementById('posHistoryTableBody');
  if (tbody) {
    if (orders.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" class="text-center py-3 text-muted">Belum ada riwayat transaksi.</td></tr>`;
      return;
    }

    tbody.innerHTML = orders.map(o => `
      <tr>
        <td><strong>${o.orderId}</strong></td>
        <td>${o.time}</td>
        <td>${o.table}</td>
        <td>${o.method || 'Kasir'}</td>
        <td><strong style="color:var(--color-yellow);">${formatRupiah(o.total)}</strong></td>
        <td><span class="pos-status-tag ${o.status === 'Lunas' ? 'tag-paid' : o.status === 'Menunggu Pembayaran' ? 'tag-pending' : 'tag-completed'}">${o.status}</span></td>
        <td>
          <button class="btn btn-xs btn-glass" onclick="printReceiptForOrder('${o.orderId}')"><i class="fa-solid fa-print"></i></button>
        </td>
      </tr>
    `).join('');
  }
}

// ==========================================
// 10. RESERVATION & CONTACT FORM
// ==========================================
function handleReservationSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('resName').value.trim();
  const date = document.getElementById('resDate').value;
  const time = document.getElementById('resTime').value;
  const guests = document.getElementById('resGuests').value;
  const area = document.getElementById('resArea').value;

  const msg = `Halo Nangkring Skuy 45! 🔥%0A%0ASaya ingin reservasi meja:%0A*Nama:* ${name}%0A*Tanggal:* ${date}%0A*Jam:* ${time} WIB%0A*Jumlah Tamu:* ${guests}%0A*Area:* ${area}%0A%0AMohon konfirmasi ketersediaannya. Terima kasih!`;
  window.open(`https://wa.me/6285184320877?text=${msg}`, '_blank');
}

// ==========================================
// 11. HELPER UTILITIES
// ==========================================
function formatRupiah(number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(number);
}

function showToast(msg) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast-msg';
  toast.innerHTML = `<i class="fa-solid fa-fire text-orange"></i> <span>${msg}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = '0.3s';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

function playAudioChime() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(440, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
    osc.start();
    osc.stop(ctx.currentTime + 0.3);
  } catch (e) {
    // Unsupported
  }
}

// ==========================================
// 12. DATABASE MANAGER HELPERS
// ==========================================
function loadCloudDbSettings() {
  if (typeof NangkringDB !== 'undefined') {
    const config = NangkringDB.getCloudConfig();
    const urlInput = document.getElementById('supabaseUrlInput');
    const keyInput = document.getElementById('supabaseKeyInput');
    if (urlInput && config.supabaseUrl) urlInput.value = config.supabaseUrl;
    if (keyInput && config.supabaseAnonKey) keyInput.value = config.supabaseAnonKey;
  }
}

function saveCloudDbSettings() {
  const url = document.getElementById('supabaseUrlInput')?.value.trim() || '';
  const key = document.getElementById('supabaseKeyInput')?.value.trim() || '';

  if (typeof NangkringDB !== 'undefined') {
    NangkringDB.saveCloudConfig(url, key);
    if (url && key) {
      showToast("☁️ Konfigurasi Cloud Supabase tersimpan!");
    } else {
      showToast("ℹ️ Mode database lokal aktif.");
    }
  }
}

function handleDbFileImport(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    const result = NangkringDB.importDatabaseJSON(e.target.result);
    if (result.success) {
      showToast("✅ " + result.message);
      refreshPosOrders();
      renderMenu();
    } else {
      alert(result.message);
    }
  };
  reader.readAsText(file);
}

function confirmResetDatabase() {
  if (confirm("Apakah Anda yakin ingin me-reset database transaksi ke master awal default?")) {
    const result = NangkringDB.resetToDefault();
    showToast("🔄 " + result.message);
    refreshPosOrders();
    renderMenu();
  }
}

function toggleMobileNav() {
  document.getElementById('mobileNavDrawer')?.classList.toggle('open');
}

window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  const scrollY = window.pageYOffset;

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 120;
    const sectionId = current.getAttribute('id');
    const navLink = document.querySelector(`.nav-links a[href*=${sectionId}]`);

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLink?.classList.add('active');
    } else {
      navLink?.classList.remove('active');
    }
  });
});

document.addEventListener('DOMContentLoaded', initState);


