/**
 * ==========================================================================
 * NANGKRING SKUY 45 — DATABASE SERVICE MODULE (db.js)
 * Universal Data Layer: LocalStorage + JSON Master + Supabase / Cloud Ready
 * ==========================================================================
 */

const NangkringDB = (function () {
  const STORAGE_KEYS = {
    MENU: 'nangkring_skuy_db_menu',
    ORDERS: 'nangkring_skuy_orders',
    TABLES: 'nangkring_skuy_db_tables',
    RESERVATIONS: 'nangkring_skuy_reservations',
    SETTINGS: 'nangkring_skuy_settings',
    CLOUD_CONFIG: 'nangkring_skuy_cloud_config'
  };

  let masterDataCache = null;

  // Initialize Database
  async function init() {
    try {
      // Try to fetch database.json
      const response = await fetch('database.json');
      if (response.ok) {
        masterDataCache = await response.json();
        // Seed menu into storage if not customized
        if (!localStorage.getItem(STORAGE_KEYS.MENU)) {
          localStorage.setItem(STORAGE_KEYS.MENU, JSON.stringify(masterDataCache.menu_items));
        }
        if (!localStorage.getItem(STORAGE_KEYS.TABLES)) {
          localStorage.setItem(STORAGE_KEYS.TABLES, JSON.stringify(masterDataCache.tables));
        }
      }
    } catch (e) {
      console.warn("NangkringDB: database.json fetch fallback to static cache", e);
    }

    // Ensure orders table exists
    if (!localStorage.getItem(STORAGE_KEYS.ORDERS)) {
      const demoOrders = [
        {
          orderId: "#NS-4501",
          customer: "Kak Dimas",
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
          customer: "Sarah & Friends",
          table: "Meja 05",
          time: "Hari ini, 21:15 WIB",
          status: "Lunas",
          method: "Tunai / Cash",
          total: 82000,
          items: [
            { name: "Nasi Goreng BBQ Spesial", qty: 2, price: 28000 },
            { name: "Signature Kopi Gula Aren Skuy", qty: 2, price: 18000 }
          ]
        }
      ];
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(demoOrders));
    }
  }

  // --- MENU OPERATIONS ---
  function getMenuItems() {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MENU);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return (masterDataCache && masterDataCache.menu_items) || (typeof MENU_DATA !== 'undefined' ? MENU_DATA : []);
  }

  function getMenuItemById(id) {
    const items = getMenuItems();
    return items.find(item => item.id === Number(id));
  }

  function saveMenuItem(itemData) {
    const items = getMenuItems();
    const existingIndex = items.findIndex(i => i.id === Number(itemData.id));
    if (existingIndex > -1) {
      items[existingIndex] = { ...items[existingIndex], ...itemData };
    } else {
      const newId = itemData.id || Date.now();
      items.push({ ...itemData, id: newId });
    }
    localStorage.setItem(STORAGE_KEYS.MENU, JSON.stringify(items));
    return items;
  }

  // --- ORDER OPERATIONS ---
  function getOrders(filterStatus = 'all') {
    let orders = [];
    try {
      orders = JSON.parse(localStorage.getItem(STORAGE_KEYS.ORDERS) || '[]');
    } catch (e) {
      orders = [];
    }

    if (filterStatus === 'all') return orders;
    return orders.filter(o => o.status === filterStatus);
  }

  function createOrder(orderData) {
    const orders = getOrders('all');
    const newOrder = {
      orderId: orderData.orderId || `#NS-45${Math.floor(1000 + Math.random() * 9000).toString().substring(0, 2)}`,
      customer: orderData.customer || "Pelanggan",
      table: orderData.table || "Meja 01",
      time: orderData.time || new Date().toLocaleString('id-ID'),
      status: orderData.status || "Menunggu Pembayaran",
      method: orderData.method || "Bayar di Kasir",
      total: orderData.total || 0,
      items: orderData.items || []
    };

    orders.unshift(newOrder);
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));

    // Broadcast change if cloud configured
    syncCloudOrder(newOrder);

    return newOrder;
  }

  function updateOrderStatus(orderId, newStatus, payMethod = null) {
    const orders = getOrders('all');
    const order = orders.find(o => o.orderId === orderId);
    if (!order) return null;

    order.status = newStatus;
    if (payMethod) order.method = payMethod;
    order.updatedAt = new Date().toISOString();

    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    return order;
  }

  function deleteOrder(orderId) {
    let orders = getOrders('all');
    orders = orders.filter(o => o.orderId !== orderId);
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    return orders;
  }

  // --- SALES & ANALYTICS ---
  function getSalesStats() {
    const orders = getOrders('all');
    const paidOrders = orders.filter(o => o.status === 'Lunas' || o.status === 'Selesai');

    const totalRevenue = paidOrders.reduce((sum, o) => sum + (Number(o.total) || 0), 0);
    const totalTransactions = paidOrders.length;
    const pendingOrdersCount = orders.filter(o => o.status === 'Menunggu Pembayaran').length;

    // Item popularity calculation
    const itemCounts = {};
    paidOrders.forEach(o => {
      if (Array.isArray(o.items)) {
        o.items.forEach(it => {
          const rawName = it.name.split('(')[0].trim();
          itemCounts[rawName] = (itemCounts[rawName] || 0) + (it.qty || 1);
        });
      }
    });

    const topItems = Object.entries(itemCounts)
      .map(([name, qty]) => ({ name, qty }))
      .sort((a, b) => b.qty - a.qty);

    return {
      totalRevenue,
      totalTransactions,
      pendingOrdersCount,
      topItem: topItems[0] ? `${topItems[0].name} (${topItems[0].qty} terjual)` : 'Sate Mental Skuy 45',
      allTopItems: topItems
    };
  }

  // --- BACKUP & EXPORT ---
  function exportDatabaseJSON() {
    const fullDb = {
      exported_at: new Date().toISOString(),
      store: "Nangkring Skuy 45",
      menu: getMenuItems(),
      orders: getOrders('all'),
      settings: getSettings()
    };
    return JSON.stringify(fullDb, null, 2);
  }

  function downloadDatabaseJSON() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(exportDatabaseJSON());
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute("href", dataStr);
    dlAnchor.setAttribute("download", `database_nangkring_skuy_${new Date().toISOString().slice(0,10)}.json`);
    document.body.appendChild(dlAnchor);
    dlAnchor.click();
    dlAnchor.remove();
  }

  function downloadOrdersCSV() {
    const orders = getOrders('all');
    if (orders.length === 0) return alert("Belum ada transaksi untuk di-export!");

    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "No Order,Nama Pemesan,Posisi Meja,Waktu,Status,Metode Bayar,Total (Rp),Daftar Item\r\n";

    orders.forEach(o => {
      const itemsStr = o.items.map(it => `${it.qty}x ${it.name}`).join('; ').replace(/"/g, '""');
      const row = `"${o.orderId}","${o.customer || 'Pelanggan'}","${o.table}","${o.time}","${o.status}","${o.method}","${o.total}","${itemsStr}"`;
      csvContent += row + "\r\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `laporan_transaksi_nangkring_skuy_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  function importDatabaseJSON(jsonString) {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.menu && Array.isArray(parsed.menu)) {
        localStorage.setItem(STORAGE_KEYS.MENU, JSON.stringify(parsed.menu));
      }
      if (parsed.orders && Array.isArray(parsed.orders)) {
        localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(parsed.orders));
      }
      return { success: true, message: "Database berhasil di-import!" };
    } catch (e) {
      return { success: false, message: "Format JSON database tidak valid: " + e.message };
    }
  }

  function resetToDefault() {
    localStorage.removeItem(STORAGE_KEYS.MENU);
    localStorage.removeItem(STORAGE_KEYS.ORDERS);
    localStorage.removeItem(STORAGE_KEYS.TABLES);
    init();
    return { success: true, message: "Database direset ke master default!" };
  }

  // --- CLOUD SINKRONISASI (SUPABASE / REST API CONNECTOR) ---
  function getCloudConfig() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.CLOUD_CONFIG) || '{}');
    } catch (e) {
      return {};
    }
  }

  function saveCloudConfig(supabaseUrl, supabaseAnonKey) {
    const config = {
      supabaseUrl: supabaseUrl.trim(),
      supabaseAnonKey: supabaseAnonKey.trim(),
      enabled: Boolean(supabaseUrl && supabaseAnonKey)
    };
    localStorage.setItem(STORAGE_KEYS.CLOUD_CONFIG, JSON.stringify(config));
    return config;
  }

  async function syncCloudOrder(order) {
    const config = getCloudConfig();
    if (!config.enabled || !config.supabaseUrl || !config.supabaseAnonKey) return;

    try {
      await fetch(`${config.supabaseUrl}/rest/v1/orders`, {
        method: 'POST',
        headers: {
          'apikey': config.supabaseAnonKey,
          'Authorization': `Bearer ${config.supabaseAnonKey}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify(order)
      });
      console.log("NangkringDB: Order synced to Supabase Cloud", order.orderId);
    } catch (e) {
      console.warn("NangkringDB: Cloud sync error", e);
    }
  }

  function getSettings() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.SETTINGS) || '{}');
    } catch (e) {
      return {};
    }
  }

  return {
    init,
    getMenuItems,
    getMenuItemById,
    saveMenuItem,
    getOrders,
    createOrder,
    updateOrderStatus,
    deleteOrder,
    getSalesStats,
    exportDatabaseJSON,
    downloadDatabaseJSON,
    downloadOrdersCSV,
    importDatabaseJSON,
    resetToDefault,
    getCloudConfig,
    saveCloudConfig
  };
})();

// Auto-initialize on load
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    NangkringDB.init();
  });
}
