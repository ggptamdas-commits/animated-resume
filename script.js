/**
 * KHAMER RESTAURANT - Responsive Interactive Application Logic
 */

// =============================================================================
// 1. DATA MODELS & EXACT SAMPLE ORDERS
// =============================================================================

const EXACT_MENU = [
  { id: 'item_burger', name: 'Chicken Burger', price: 23.00, icon: '🍔' },
  { id: 'item_fries', name: 'French Fries', price: 15.00, icon: '🍟' },
  { id: 'item_pepsi', name: 'Pepsi', price: 5.00, icon: '🥤' },
  { id: 'item_shawarma', name: 'Shawarma', price: 20.00, icon: '🌯' },
  { id: 'item_rice', name: 'Arabic Rice', price: 25.00, icon: '🍚' },
  { id: 'item_salad', name: 'Salad', price: 10.00, icon: '🥗' },
  { id: 'item_water', name: 'Water', price: 5.00, icon: '💧' },
  { id: 'item_steak', name: 'Beef Steak', price: 40.00, icon: '🥩' },
  { id: 'item_potato', name: 'Mashed Potato', price: 15.00, icon: '🥔' },
  { id: 'item_zinger', name: 'Zinger Burger', price: 28.00, icon: '🍔' },
  { id: 'item_coke', name: 'Coke', price: 5.00, icon: '🥤' }
];

const INITIAL_ORDERS = [
  {
    id: 'ORD-1025',
    table: 'Table 08',
    type: 'Dine In',
    date: '26 May 2024',
    time: '08:42 PM',
    timeAgo: '2 min ago',
    timestamp: Date.now() - 2 * 60 * 1000,
    status: 'NEW', // 'NEW', 'PREPARING', 'READY', 'OUT FOR DELIVERY', 'COMPLETED', 'CANCELLED'
    paymentMethod: 'Cash',
    customerName: 'Ahmad Al Omar',
    customerPhone: '+966 50 123 4567',
    cashier: 'Riham',
    note: 'Please no onion',
    items: [
      { name: 'Chicken Burger', qty: 2, price: 23.00, total: 46.00, icon: '🍔' },
      { name: 'French Fries', qty: 1, price: 15.00, total: 15.00, icon: '🍟' },
      { name: 'Pepsi', qty: 2, price: 5.00, total: 10.00, icon: '🥤' }
    ],
    totalPrice: 86.00,
    timeline: {
      received: '08:34 PM',
      accepted: '08:35 PM',
      preparing: '08:38 PM',
      ready: '08:45 PM',
      deliv: '08:47 PM',
      comp: null
    }
  },
  {
    id: 'ORD-1024',
    table: 'Table 03',
    type: 'Dine In',
    date: '26 May 2024',
    time: '08:36 PM',
    timeAgo: '8 min ago',
    timestamp: Date.now() - 8 * 60 * 1000,
    status: 'PREPARING',
    paymentMethod: 'Card',
    customerName: 'Fahad Al Harbi',
    customerPhone: '+966 55 998 1122',
    cashier: 'Riham',
    note: 'Extra garlic sauce',
    items: [
      { name: 'Shawarma', qty: 2, price: 20.00, total: 40.00, icon: '🌯' },
      { name: 'Arabic Rice', qty: 1, price: 25.00, total: 25.00, icon: '🍚' },
      { name: 'Salad', qty: 1, price: 10.00, total: 10.00, icon: '🥗' },
      { name: 'Water', qty: 1, price: 5.00, total: 5.00, icon: '💧' }
    ],
    totalPrice: 120.00,
    timeline: {
      received: '08:30 PM',
      accepted: '08:32 PM',
      preparing: '08:36 PM',
      ready: null,
      deliv: null,
      comp: null
    }
  },
  {
    id: 'ORD-1023',
    table: 'Table 12',
    type: 'Dine In',
    date: '26 May 2024',
    time: '08:20 PM',
    timeAgo: '15 min ago',
    timestamp: Date.now() - 15 * 60 * 1000,
    status: 'READY',
    paymentMethod: 'Cash',
    customerName: 'Sami Al Otaibi',
    customerPhone: '+966 54 332 4455',
    cashier: 'Riham',
    note: 'Medium well steak',
    items: [
      { name: 'Beef Steak', qty: 1, price: 40.00, total: 40.00, icon: '🥩' },
      { name: 'Mashed Potato', qty: 1, price: 15.00, total: 15.00, icon: '🥔' }
    ],
    totalPrice: 55.00,
    timeline: {
      received: '08:15 PM',
      accepted: '08:17 PM',
      preparing: '08:20 PM',
      ready: '08:38 PM',
      deliv: null,
      comp: null
    }
  },
  {
    id: 'ORD-1022',
    table: 'Delivery',
    type: 'Home Delivery',
    date: '26 May 2024',
    time: '08:10 PM',
    timeAgo: '20 min ago',
    timestamp: Date.now() - 20 * 60 * 1000,
    status: 'OUT FOR DELIVERY',
    paymentMethod: 'Online',
    customerName: 'Nasser Al Ghamdi',
    customerPhone: '+966 56 778 9900',
    cashier: 'Riham',
    note: 'Call when arriving at the gate',
    items: [
      { name: 'Zinger Burger', qty: 2, price: 28.00, total: 56.00, icon: '🍔' },
      { name: 'Coke', qty: 1, price: 5.00, total: 5.00, icon: '🥤' }
    ],
    totalPrice: 75.00,
    timeline: {
      received: '08:05 PM',
      accepted: '08:08 PM',
      preparing: '08:12 PM',
      ready: '08:28 PM',
      deliv: '08:32 PM',
      comp: null
    }
  }
];

// App Global State
let state = {
  orders: [...INITIAL_ORDERS],
  selectedOrderId: 'ORD-1025',
  currentTab: 'dashboard',
  theme: 'light',
  lang: 'en',
  cart: {}
};

// =============================================================================
// 2. INITIALIZATION
// =============================================================================

document.addEventListener('DOMContentLoaded', () => {
  renderLiveOrderCards();
  renderOrderDetailsDrawer();
  setupPosDishPicker();

  const search = document.getElementById('globalSearchInput');
  if (search) {
    search.addEventListener('input', (e) => {
      renderLiveOrderCards();
    });
  }
});

// =============================================================================
// 3. RENDER LIVE ORDER CARDS
// =============================================================================

function renderLiveOrderCards() {
  const container = document.getElementById('liveOrderCardsGrid');
  if (!container) return;

  const statusFilter = document.getElementById('selFilterStatus')?.value || 'all';
  const sortOrder = document.getElementById('selSortOrder')?.value || 'newest';
  const query = document.getElementById('globalSearchInput')?.value.toLowerCase().trim() || '';

  let list = state.orders.filter(o => {
    const matchStatus = statusFilter === 'all' || o.status === statusFilter;
    const matchSearch = !query || 
      o.id.toLowerCase().includes(query) ||
      o.table.toLowerCase().includes(query) ||
      o.customerName.toLowerCase().includes(query);
    return matchStatus && matchSearch;
  });

  if (sortOrder === 'oldest') {
    list.sort((a, b) => a.timestamp - b.timestamp);
  } else if (sortOrder === 'highest') {
    list.sort((a, b) => b.totalPrice - a.totalPrice);
  } else {
    list.sort((a, b) => b.timestamp - a.timestamp);
  }

  container.innerHTML = list.map(order => {
    const totalItems = order.items.reduce((sum, i) => sum + i.qty, 0);
    const isSelected = order.id === state.selectedOrderId ? 'selected' : '';

    let badgeClass = 'badge-new';
    if (order.status === 'PREPARING') badgeClass = 'badge-prep';
    else if (order.status === 'READY') badgeClass = 'badge-ready';
    else if (order.status === 'OUT FOR DELIVERY') badgeClass = 'badge-deliv';

    let payClass = 'pay-pill-cash';
    if (order.paymentMethod === 'Card') payClass = 'pay-pill-card';
    else if (order.paymentMethod === 'Online') payClass = 'pay-pill-online';

    const itemsHtml = order.items.map(item => `
      <div class="loc-item-line">
        <div class="item-left-side">
          <span>${item.icon}</span>
          <span>${item.name}</span>
        </div>
        <span class="item-qty-tag">x${item.qty}</span>
      </div>
    `).join('');

    return `
      <div class="live-order-card ${isSelected}" data-order-id="${order.id}">
        <div class="loc-top-row">
          <span class="order-badge-pill ${badgeClass}">${order.status}</span>
          <span class="loc-time-ago">${order.timeAgo}</span>
        </div>

        <div class="loc-id-row">
          <h3 class="loc-order-id">#${order.id}</h3>
          <span class="loc-table-tag">${order.table}</span>
        </div>

        <div class="loc-meta-summary">
          ${totalItems} Items • SAR ${order.totalPrice.toFixed(2)}
        </div>

        <div class="loc-items-list">
          ${itemsHtml}
        </div>

        <div class="loc-bottom-actions">
          <span class="loc-pay-pill ${payClass}">${order.paymentMethod}</span>
          <button class="btn-view-order-orange" onclick="selectOrder('${order.id}')">View Order</button>
        </div>
      </div>
    `;
  }).join('');

  updateMetricCounters();
}

function updateMetricCounters() {
  const o = state.orders;
  document.getElementById('cntNew').textContent = o.filter(x => x.status === 'NEW').length;
  document.getElementById('cntPrep').textContent = o.filter(x => x.status === 'PREPARING').length;
  document.getElementById('cntReady').textContent = o.filter(x => x.status === 'READY').length;
  document.getElementById('cntDeliv').textContent = o.filter(x => x.status === 'OUT FOR DELIVERY').length;
  document.getElementById('cntComp').textContent = o.filter(x => x.status === 'COMPLETED').length;
  document.getElementById('cntCanc').textContent = o.filter(x => x.status === 'CANCELLED').length;
}

function filterByStatus(st) {
  const sel = document.getElementById('selFilterStatus');
  if (sel) {
    sel.value = st;
    renderLiveOrderCards();
  }
}

// =============================================================================
// 4. ORDER DETAILS DRAWER LOGIC
// =============================================================================

function selectOrder(orderId) {
  state.selectedOrderId = orderId;
  renderLiveOrderCards();
  renderOrderDetailsDrawer();
  toggleOrderDrawer(true);
}

function renderOrderDetailsDrawer() {
  const order = state.orders.find(o => o.id === state.selectedOrderId) || state.orders[0];
  if (!order) return;

  document.getElementById('dtlOrderId').textContent = `#${order.id}`;
  document.getElementById('dtlStatusChip').textContent = order.status;
  document.getElementById('dtlTableType').textContent = `${order.table} • ${order.type}`;
  document.getElementById('dtlDate').textContent = order.date;
  document.getElementById('dtlTime').textContent = order.time;
  document.getElementById('dtlCustomerName').textContent = order.customerName;
  document.getElementById('dtlPhone').textContent = order.customerPhone;
  document.getElementById('dtlTotalPrice').textContent = `SAR ${order.totalPrice.toFixed(2)}`;

  document.getElementById('dtlPayment').textContent = order.paymentMethod;
  document.getElementById('dtlStatus').textContent = order.status;
  document.getElementById('dtlCashier').textContent = order.cashier;
  document.getElementById('dtlNotes').textContent = order.note || 'None';

  const itemsList = document.getElementById('dtlItemsList');
  itemsList.innerHTML = order.items.map(item => `
    <div class="dtl-item-row">
      <div>
        <span>${item.name}</span>
        <span class="qty">x${item.qty}</span>
      </div>
      <strong>SAR ${item.total.toFixed(2)}</strong>
    </div>
  `).join('');

  const tl = order.timeline || {};
  document.getElementById('tlTime1').textContent = tl.received || '08:34 PM';
  document.getElementById('tlTime2').textContent = tl.accepted || '08:35 PM';
  document.getElementById('tlTime3').textContent = tl.preparing || (order.status !== 'NEW' ? '08:38 PM' : '--:--');
  document.getElementById('tlTime4').textContent = tl.ready || (['READY', 'OUT FOR DELIVERY', 'COMPLETED'].includes(order.status) ? '08:45 PM' : '--:--');
  document.getElementById('tlTime5').textContent = tl.deliv || (order.status === 'OUT FOR DELIVERY' ? '08:47 PM' : '--:--');
  document.getElementById('tlTime6').textContent = tl.comp || (order.status === 'COMPLETED' ? '09:00 PM' : '--:--');

  const statusRanks = { 'NEW': 1, 'PREPARING': 3, 'READY': 4, 'OUT FOR DELIVERY': 5, 'COMPLETED': 6 };
  const currentRank = statusRanks[order.status] || 1;

  for (let i = 1; i <= 6; i++) {
    const node = document.getElementById(`tlNode${i}`);
    if (!node) continue;
    node.className = 'tl-step-item';
    if (i < currentRank) {
      node.classList.add('done');
      node.querySelector('.tl-dot').textContent = '✔';
    } else if (i === currentRank) {
      node.classList.add('active');
      node.querySelector('.tl-dot').innerHTML = '<span class="tl-pulse"></span>';
    } else {
      node.querySelector('.tl-dot').textContent = '○';
    }
  }
}

function toggleOrderDrawer(show) {
  const drawer = document.getElementById('orderDrawerPanel');
  if (!drawer) return;
  if (show) drawer.classList.add('open');
  else drawer.classList.remove('open');
}

function advanceSelectedOrder() {
  const order = state.orders.find(o => o.id === state.selectedOrderId);
  if (!order) return;

  const flow = ['NEW', 'PREPARING', 'READY', 'OUT FOR DELIVERY', 'COMPLETED'];
  const curIdx = flow.indexOf(order.status);

  if (curIdx < flow.length - 1) {
    order.status = flow[curIdx + 1];
    order.timeAgo = 'Just now';
    renderLiveOrderCards();
    renderOrderDetailsDrawer();
    showToast(`Order #${order.id} status updated to: ${order.status}`, 'success');
  } else {
    showToast(`Order #${order.id} is already completed!`, 'info');
  }
}

function cancelSelectedOrder() {
  const order = state.orders.find(o => o.id === state.selectedOrderId);
  if (!order) return;
  order.status = 'CANCELLED';
  renderLiveOrderCards();
  renderOrderDetailsDrawer();
  showToast(`Order #${order.id} has been cancelled`, 'warning');
}

// =============================================================================
// 5. NAVIGATION & RESPONSIVE TOGGLES
// =============================================================================

function switchNavTab(tabId) {
  state.currentTab = tabId;

  // Sidebar link highlight
  document.querySelectorAll('.sidebar-link').forEach(l => {
    l.classList.toggle('active', l.getAttribute('data-tab') === tabId);
  });

  // Mobile bottom bar highlight
  document.querySelectorAll('.m-nav-tab').forEach(b => {
    b.classList.toggle('active', b.getAttribute('data-tab') === tabId);
  });

  // Update Page Title
  const titles = {
    dashboard: 'Order Tracking Dashboard',
    orders: 'Orders Management',
    kitchen: 'Kitchen Display System',
    tracking: 'Live Order Tracking',
    menu: 'Menu Items',
    customers: 'Customers',
    reports: 'Sales Reports',
    staff: 'Staff Management',
    settings: 'System Settings',
    more: 'More Options'
  };
  const titleEl = document.getElementById('pageMainHeading');
  if (titleEl && titles[tabId]) titleEl.textContent = titles[tabId];

  // Tab views toggle
  document.querySelectorAll('.tab-page').forEach(p => p.classList.remove('active'));
  const targetView = document.getElementById(`view${tabId.charAt(0).toUpperCase() + tabId.slice(1)}`);
  if (targetView) targetView.classList.add('active');
  else document.getElementById('viewDashboard').classList.add('active');

  toggleMobileSidebar(false);
}

function toggleMobileSidebar(show) {
  const sidebar = document.getElementById('appSidebar');
  const overlay = document.getElementById('sidebarOverlay');
  if (show) {
    sidebar.classList.add('open');
    overlay.classList.remove('hidden');
  } else {
    sidebar.classList.remove('open');
    overlay.classList.add('hidden');
  }
}

function toggleTheme() {
  state.theme = state.theme === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', state.theme);
  document.getElementById('themeIcon').textContent = state.theme === 'light' ? '🌙' : '☀️';
  showToast(state.theme === 'light' ? 'Light mode enabled' : 'Dark mode enabled', 'info');
}

function toggleLanguage() {
  state.lang = state.lang === 'en' ? 'ar' : 'en';
  document.documentElement.lang = state.lang;
  document.documentElement.dir = state.lang === 'ar' ? 'rtl' : 'ltr';
  document.getElementById('langTextBadge').textContent = state.lang === 'en' ? 'العربية' : 'English';
  showToast(state.lang === 'ar' ? 'تم تحويل الواجهة إلى العربية' : 'Switched to English', 'info');
}

// =============================================================================
// 6. POS MODAL ENGINE
// =============================================================================

function openNewOrderModal() {
  state.cart = {};
  renderPosCart();
  document.getElementById('modalNewOrder')?.classList.remove('hidden');
}

function closeNewOrderModal() {
  document.getElementById('modalNewOrder')?.classList.add('hidden');
}

function setupPosDishPicker() {
  const grid = document.getElementById('posDishesGrid');
  if (!grid) return;

  grid.innerHTML = EXACT_MENU.map(item => `
    <div class="pos-dish-card">
      <div>
        <h5>${item.icon} ${item.name}</h5>
        <span style="font-size:0.75rem; color:#f97316; font-weight:700;">SAR ${item.price.toFixed(2)}</span>
      </div>
      <div class="pos-dish-bottom">
        <button class="btn-add-mini" onclick="addToPosCart('${item.id}')">+ Add</button>
      </div>
    </div>
  `).join('');
}

window.addToPosCart = function(id) {
  state.cart[id] = (state.cart[id] || 0) + 1;
  renderPosCart();
};

function renderPosCart() {
  const box = document.getElementById('posCartBox');
  const totalEl = document.getElementById('posCartTotal');
  const keys = Object.keys(state.cart);

  if (keys.length === 0) {
    box.innerHTML = '<div style="text-align:center; color:#94a3b8;">No items added</div>';
    totalEl.textContent = 'SAR 0.00';
    return;
  }

  let grandTotal = 0;
  box.innerHTML = keys.map(id => {
    const item = EXACT_MENU.find(m => m.id === id);
    const qty = state.cart[id];
    const line = item.price * qty;
    grandTotal += line;

    return `
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <span>${item.icon} ${item.name} (x${qty})</span>
        <strong>SAR ${line.toFixed(2)}</strong>
      </div>
    `;
  }).join('');

  totalEl.textContent = `SAR ${grandTotal.toFixed(2)}`;
}

function submitPosOrder() {
  const keys = Object.keys(state.cart);
  if (keys.length === 0) {
    showToast('Please add items to cart first!', 'warning');
    return;
  }

  const name = document.getElementById('posCustName').value || 'Customer';
  const phone = document.getElementById('posPhone').value || '+966 50 000 0000';
  const type = document.getElementById('posOrderType').value;
  const table = document.getElementById('posTableNo').value || 'Table 01';
  const pay = document.getElementById('posPayment').value;
  const note = document.getElementById('posNotes').value;

  const items = keys.map(id => {
    const item = EXACT_MENU.find(m => m.id === id);
    return {
      name: item.name,
      qty: state.cart[id],
      price: item.price,
      total: item.price * state.cart[id],
      icon: item.icon
    };
  });

  const totalPrice = items.reduce((s, i) => s + i.total, 0);
  const nextId = `ORD-${1020 + state.orders.length + 1}`;

  const newOrder = {
    id: nextId,
    table: table,
    type: type,
    date: '26 May 2024',
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    timeAgo: 'Just now',
    timestamp: Date.now(),
    status: 'NEW',
    paymentMethod: pay,
    customerName: name,
    customerPhone: phone,
    cashier: 'Riham',
    note: note,
    items: items,
    totalPrice: totalPrice,
    timeline: {
      received: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      accepted: null,
      preparing: null,
      ready: null,
      deliv: null,
      comp: null
    }
  };

  state.orders.unshift(newOrder);
  state.selectedOrderId = nextId;
  closeNewOrderModal();
  renderLiveOrderCards();
  renderOrderDetailsDrawer();
  showToast(`Order #${nextId} created successfully!`, 'success');
}

// =============================================================================
// 7. TOAST NOTIFICATIONS
// =============================================================================

function showToast(msg, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'toast-item';
  toast.innerHTML = `<span>${type === 'success' ? '✅' : '🔔'}</span> <span>${msg}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-10px)';
    toast.style.transition = 'all 0.25s ease';
    setTimeout(() => toast.remove(), 250);
  }, 3000);
}
