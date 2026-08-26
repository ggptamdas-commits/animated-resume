/**
 * RestoTrack - Restaurant Order Tracking & Kitchen Management System
 * Interactive Single Page Application Logic
 */

// =============================================================================
// 1. DATA MODELS & INITIAL STATE
// =============================================================================

const MENU_ITEMS = [
  { id: 'm1', name: 'Special Chicken Mandi', category: 'mains', price: 12.50, desc: 'Smoked fragrant basmati rice with tender roasted half chicken', badge: 'Popular' },
  { id: 'm2', name: 'Royal Mutton Kabsa', category: 'mains', price: 16.00, desc: 'Slow-cooked spiced lamb shank served with spiced rice', badge: 'Chef Special' },
  { id: 'm3', name: 'Fresh Wood-Fired Khamir', category: 'breads', price: 3.50, desc: 'Traditional stone-baked warm puffy bread with black seeds' },
  { id: 'm4', name: 'Charcoal Mixed Grill', category: 'grills', price: 18.50, desc: 'Shish Tawook, Lamb Kofta, and Kebab skewers with garlic dip', badge: 'Best Seller' },
  { id: 'm5', name: 'Garlic Yogurt Dip & Salata', category: 'breads', price: 2.50, desc: 'Creamy garlic sauce and fresh chopped Arabian salad' },
  { id: 'm6', name: 'Authentic Cheese Kunafa', category: 'drinks', price: 6.00, desc: 'Crispy warm shredded pastry layered with sweet melted cheese' },
  { id: 'm7', name: 'Fresh Mint Lemonade', category: 'drinks', price: 3.00, desc: 'Cold pressed lemon juice with fresh garden crushed mint' },
  { id: 'm8', name: 'Arabic Spiced Tea / Qahwa', category: 'drinks', price: 2.00, desc: 'Cardamom infused traditional warm black tea' }
];

const INITIAL_ORDERS = [
  {
    id: 'ORD-1081',
    customerName: 'Ahmed Al-Harbi',
    customerPhone: '+966 54 221 9988',
    orderType: 'Pickup',
    tableOrAddress: 'Counter Pickup',
    placedTime: '12:20 PM',
    placedTimestamp: Date.now() - 25 * 60 * 1000,
    status: 'ready', // 'placed', 'kitchen', 'ready', 'completed'
    items: [
      { id: 'm1', name: 'Special Chicken Mandi', qty: 2, price: 12.50 },
      { id: 'm7', name: 'Fresh Mint Lemonade', qty: 2, price: 3.00 }
    ],
    notes: 'Extra hot sauce and napkins please',
    estMinutes: 0
  },
  {
    id: 'ORD-1082',
    customerName: 'Md. Emdadul',
    customerPhone: '+966 50 123 4567',
    orderType: 'Dine-in',
    tableOrAddress: 'Table #4 (Main Hall)',
    placedTime: '12:35 PM',
    placedTimestamp: Date.now() - 10 * 60 * 1000,
    status: 'kitchen',
    items: [
      { id: 'm2', name: 'Royal Mutton Kabsa', qty: 1, price: 16.00 },
      { id: 'm3', name: 'Fresh Wood-Fired Khamir', qty: 2, price: 3.50 },
      { id: 'm5', name: 'Garlic Yogurt Dip & Salata', qty: 1, price: 2.50 }
    ],
    notes: 'Mild spicy, extra crispy Khamir bread',
    estMinutes: 12
  },
  {
    id: 'ORD-1083',
    customerName: 'Fahad Al-Shehri',
    customerPhone: '+966 56 778 3344',
    orderType: 'Delivery',
    tableOrAddress: 'Sabya North District, Villa 12',
    placedTime: '12:42 PM',
    placedTimestamp: Date.now() - 3 * 60 * 1000,
    status: 'placed',
    items: [
      { id: 'm4', name: 'Charcoal Mixed Grill', qty: 1, price: 18.50 },
      { id: 'm6', name: 'Authentic Cheese Kunafa', qty: 1, price: 6.00 }
    ],
    notes: 'Ring the door bell when arrived',
    estMinutes: 25
  },
  {
    id: 'ORD-1080',
    customerName: 'Rashid Khan',
    customerPhone: '+966 55 990 1122',
    orderType: 'Dine-in',
    tableOrAddress: 'Table #2',
    placedTime: '11:55 AM',
    placedTimestamp: Date.now() - 50 * 60 * 1000,
    status: 'completed',
    items: [
      { id: 'm1', name: 'Special Chicken Mandi', qty: 1, price: 12.50 },
      { id: 'm8', name: 'Arabic Spiced Tea / Qahwa', qty: 2, price: 2.00 }
    ],
    notes: 'Paid via Apple Pay',
    estMinutes: 0
  }
];

// Local Storage Key
const STORAGE_KEY = 'restotrack_orders_v2';

// Application State
let appState = {
  orders: [],
  selectedOrderId: 'ORD-1082',
  currentView: 'customer', // 'customer' | 'kitchen'
  soundEnabled: true,
  autoSimulating: false,
  simIntervalId: null,
  activeCart: {}, // itemId -> qty
  kdsFilter: 'all',
  kdsSearchQuery: ''
};

// =============================================================================
// 2. AUDIO CHIME ENGINE (Web Audio API Synthesizer)
// =============================================================================

function playNotificationSound(type = 'chime') {
  if (!appState.soundEnabled) return;
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    if (type === 'success' || type === 'chime') {
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sine';
      osc2.type = 'triangle';
      osc1.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc1.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5

      osc2.frequency.setValueAtTime(880, ctx.currentTime);
      osc2.frequency.exponentialRampToValueAtTime(1174.66, ctx.currentTime + 0.2); // D6

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start();
      osc2.start();
      osc1.stop(ctx.currentTime + 0.35);
      osc2.stop(ctx.currentTime + 0.35);
    } else if (type === 'advance') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc.frequency.exponentialRampToValueAtTime(659.25, ctx.currentTime + 0.1); // E5
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    }
  } catch (e) {
    console.log('Audio playback context error:', e);
  }
}

// =============================================================================
// 3. STORAGE & STATE PERSISTENCE
// =============================================================================

function loadOrders() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      appState.orders = JSON.parse(saved);
    } catch (e) {
      appState.orders = [...INITIAL_ORDERS];
    }
  } else {
    appState.orders = [...INITIAL_ORDERS];
    saveOrders();
  }
}

function saveOrders() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appState.orders));
}

// =============================================================================
// 4. UI INITIALIZATION & EVENT LISTENERS
// =============================================================================

document.addEventListener('DOMContentLoaded', () => {
  loadOrders();
  setupLiveClock();
  setupHeaderTabs();
  setupCustomerTracker();
  setupKdsView();
  setupNewOrderModal();
  setupReceiptModal();

  // Initial render
  renderCustomerTracker();
  renderKdsBoard();
  updateHeaderBadges();
});

function setupLiveClock() {
  const clockEl = document.getElementById('liveClock');
  function update() {
    const now = new Date();
    clockEl.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
  }
  update();
  setInterval(update, 1000);
}

function setupHeaderTabs() {
  const tabCustomer = document.getElementById('tabCustomerView');
  const tabKitchen = document.getElementById('tabKitchenView');
  const customerView = document.getElementById('customerView');
  const kitchenView = document.getElementById('kitchenView');

  tabCustomer.addEventListener('click', () => {
    tabCustomer.classList.add('active');
    tabKitchen.classList.remove('active');
    customerView.classList.add('active');
    kitchenView.classList.remove('active');
    appState.currentView = 'customer';
    renderCustomerTracker();
  });

  tabKitchen.addEventListener('click', () => {
    tabKitchen.classList.add('active');
    tabCustomer.classList.remove('active');
    kitchenView.classList.add('active');
    customerView.classList.remove('active');
    appState.currentView = 'kitchen';
    renderKdsBoard();
  });

  // Sound Toggle
  const btnSound = document.getElementById('btnSoundToggle');
  const soundOn = document.getElementById('soundIconOn');
  const soundOff = document.getElementById('soundIconOff');

  btnSound.addEventListener('click', () => {
    appState.soundEnabled = !appState.soundEnabled;
    soundOn.classList.toggle('hidden', !appState.soundEnabled);
    soundOff.classList.toggle('hidden', appState.soundEnabled);
    showToast(appState.soundEnabled ? 'Sound alerts enabled' : 'Sound alerts muted', 'info');
  });
}

function updateHeaderBadges() {
  const activeCount = appState.orders.filter(o => o.status !== 'completed').length;
  const badge = document.getElementById('activeOrdersBadge');
  if (badge) badge.textContent = activeCount;
}

// =============================================================================
// 5. CUSTOMER ORDER TRACKING VIEW LOGIC
// =============================================================================

function setupCustomerTracker() {
  const btnTrack = document.getElementById('btnTrackOrder');
  const searchInput = document.getElementById('orderSearchInput');
  const btnAdvanceSim = document.getElementById('btnAdvanceStatusSim');

  btnTrack.addEventListener('click', () => {
    const q = searchInput.value.trim().toUpperCase();
    if (!q) return;
    const match = appState.orders.find(o => o.id.toUpperCase() === q);
    if (match) {
      appState.selectedOrderId = match.id;
      renderCustomerTracker();
      showToast(`Tracking order ${match.id}`, 'info');
    } else {
      showToast(`Order ID ${q} not found!`, 'info');
    }
  });

  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') btnTrack.click();
  });

  btnAdvanceSim.addEventListener('click', () => {
    advanceOrderStatus(appState.selectedOrderId);
  });
}

function renderCustomerTracker() {
  const order = appState.orders.find(o => o.id === appState.selectedOrderId) || appState.orders[0];
  const container = document.getElementById('trackingContainer');
  const emptyState = document.getElementById('noOrderState');
  const quickChips = document.getElementById('quickOrderChips');

  // Render quick select chips
  quickChips.innerHTML = appState.orders.map(o => {
    let dotClass = 'yellow';
    if (o.status === 'kitchen') dotClass = 'blue';
    if (o.status === 'ready') dotClass = 'green';
    if (o.status === 'completed') dotClass = 'gray';

    const isActive = o.id === (order ? order.id : null) ? 'active' : '';
    return `<button class="order-chip ${isActive}" onclick="selectOrderToTrack('${o.id}')">
      <span class="chip-status-dot ${dotClass}"></span>
      <span>${o.id}</span>
    </button>`;
  }).join('');

  if (!order) {
    container.classList.add('hidden');
    emptyState.classList.remove('hidden');
    return;
  }

  container.classList.remove('hidden');
  emptyState.classList.add('hidden');

  // Populate Meta
  document.getElementById('trackOrderId').textContent = order.id;
  document.getElementById('trackOrderType').textContent = `${order.orderType} • ${order.tableOrAddress}`;
  document.getElementById('trackOrderTime').textContent = `Placed at ${order.placedTime}`;

  // Stepper State Logic
  const statusSteps = {
    placed: { stepNum: 1, pct: '12%', eta: '25 min', title: 'Order Placed & Confirmed', desc: 'The kitchen has received your order ticket and is queueing ingredients.' },
    kitchen: { stepNum: 2, pct: '50%', eta: '10 min', title: 'Cooking in Progress', desc: 'Our chef is preparing your meal with authentic fresh spices on the grill.' },
    ready: { stepNum: 3, pct: '85%', eta: 'Ready Now!', title: 'Order Ready for Service', desc: 'Your meal is freshly plated and packed. Ready for pickup or immediate table serving.' },
    completed: { stepNum: 4, pct: '100%', eta: 'Enjoy!', title: 'Order Completed & Served', desc: 'Thank you for choosing RestoTrack! We hope you love every bite.' }
  };

  const currentStatusInfo = statusSteps[order.status] || statusSteps.placed;
  document.getElementById('trackEtaCounter').textContent = currentStatusInfo.eta;
  document.getElementById('stepperProgressFill').style.width = currentStatusInfo.pct;
  document.getElementById('statusBannerTitle').textContent = currentStatusInfo.title;
  document.getElementById('statusBannerDesc').textContent = currentStatusInfo.desc;

  // Stepper items classes
  const stepsList = document.getElementById('stepperStepsList');
  const stepItems = stepsList.querySelectorAll('.step-item');
  stepItems.forEach((el) => {
    const s = parseInt(el.getAttribute('data-step'));
    el.className = 'step-item';
    if (s < currentStatusInfo.stepNum) {
      el.classList.add('step-completed');
      el.querySelector('.step-circle').innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
    } else if (s === currentStatusInfo.stepNum) {
      el.classList.add('step-active');
      el.querySelector('.step-circle').innerHTML = `<div class="pulse-ring"></div><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="8"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`;
    } else {
      el.classList.add('step-pending');
      el.querySelector('.step-circle').innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle></svg>`;
    }
  });

  // Render Order Items Summary
  const itemsListEl = document.getElementById('trackOrderItemsList');
  let subtotal = 0;
  itemsListEl.innerHTML = order.items.map(item => {
    const itemTotal = item.price * item.qty;
    subtotal += itemTotal;
    return `
      <div class="order-item-row">
        <div class="item-left">
          <span class="item-qty-badge">${item.qty}x</span>
          <div>
            <div class="item-name">${item.name}</div>
            <span class="item-notes">$${item.price.toFixed(2)} each</span>
          </div>
        </div>
        <div class="item-price">$${itemTotal.toFixed(2)}</div>
      </div>
    `;
  }).join('');

  const tax = subtotal * 0.15;
  const service = order.orderType === 'Delivery' ? 3.00 : 0.00;
  const grandTotal = subtotal + tax + service;

  document.getElementById('billSubtotal').textContent = `$${subtotal.toFixed(2)}`;
  document.getElementById('billTax').textContent = `$${tax.toFixed(2)}`;
  document.getElementById('billService').textContent = `$${service.toFixed(2)}`;
  document.getElementById('billTotal').textContent = `$${grandTotal.toFixed(2)}`;

  document.getElementById('trackOrderNotes').querySelector('span').textContent = order.notes || 'None';
  document.getElementById('trackCustomerName').textContent = order.customerName;
  document.getElementById('trackCustomerPhone').textContent = order.customerPhone || 'N/A';
  document.getElementById('trackCustomerDestination').textContent = `${order.orderType} • ${order.tableOrAddress}`;
}

window.selectOrderToTrack = function(id) {
  appState.selectedOrderId = id;
  renderCustomerTracker();
  showToast(`Viewing Order #${id}`, 'info');
};

function advanceOrderStatus(orderId) {
  const order = appState.orders.find(o => o.id === orderId);
  if (!order) return;

  const sequence = ['placed', 'kitchen', 'ready', 'completed'];
  const currentIndex = sequence.indexOf(order.status);

  if (currentIndex < sequence.length - 1) {
    order.status = sequence[currentIndex + 1];
    saveOrders();
    playNotificationSound('advance');
    renderCustomerTracker();
    renderKdsBoard();
    updateHeaderBadges();
    showToast(`Order ${order.id} updated to: ${order.status.toUpperCase()}`, 'success');
  } else {
    showToast(`Order ${order.id} is already completed!`, 'info');
  }
}

// =============================================================================
// 6. KITCHEN DISPLAY SYSTEM (KDS) & KANBAN LOGIC
// =============================================================================

function setupKdsView() {
  const filterInput = document.getElementById('kdsFilterInput');
  const filterChips = document.querySelectorAll('.kds-filter-chips .chip');
  const btnAutoSim = document.getElementById('btnAutoSimulate');

  filterInput.addEventListener('input', (e) => {
    appState.kdsSearchQuery = e.target.value.toLowerCase().trim();
    renderKdsBoard();
  });

  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      appState.kdsFilter = chip.getAttribute('data-filter');
      renderKdsBoard();
    });
  });

  btnAutoSim.addEventListener('click', toggleAutoSimulator);
}

function renderKdsBoard() {
  const query = appState.kdsSearchQuery;
  const filter = appState.kdsFilter;

  // Filter orders
  let filtered = appState.orders.filter(o => {
    const matchesFilter = filter === 'all' || o.orderType === filter;
    const matchesSearch = !query || 
      o.id.toLowerCase().includes(query) ||
      o.customerName.toLowerCase().includes(query) ||
      o.tableOrAddress.toLowerCase().includes(query);
    return matchesFilter && matchesSearch;
  });

  // Calculate Metrics
  const totalActive = appState.orders.filter(o => o.status !== 'completed').length;
  const inKitchen = appState.orders.filter(o => o.status === 'kitchen').length;
  const readyCount = appState.orders.filter(o => o.status === 'ready').length;

  let totalSales = 0;
  appState.orders.forEach(o => {
    const sub = o.items.reduce((sum, item) => sum + (item.price * item.qty), 0);
    totalSales += sub * 1.15;
  });

  document.getElementById('metricTotalActive').textContent = totalActive;
  document.getElementById('metricInKitchen').textContent = inKitchen;
  document.getElementById('metricReady').textContent = readyCount;
  document.getElementById('metricTodaySales').textContent = `$${totalSales.toFixed(2)}`;

  // Column Lists
  const placedList = document.getElementById('colListPlaced');
  const kitchenList = document.getElementById('colListKitchen');
  const readyList = document.getElementById('colListReady');
  const completedList = document.getElementById('colListCompleted');

  const placedOrders = filtered.filter(o => o.status === 'placed');
  const kitchenOrders = filtered.filter(o => o.status === 'kitchen');
  const readyOrders = filtered.filter(o => o.status === 'ready');
  const completedOrders = filtered.filter(o => o.status === 'completed');

  document.getElementById('countPlaced').textContent = placedOrders.length;
  document.getElementById('countKitchen').textContent = kitchenOrders.length;
  document.getElementById('countReady').textContent = readyOrders.length;
  document.getElementById('countCompleted').textContent = completedOrders.length;

  placedList.innerHTML = placedOrders.map(o => createKdsCardHtml(o, 'Start Cooking', 'kitchen')).join('') || '<div class="empty-cart-text">No pending orders</div>';
  kitchenList.innerHTML = kitchenOrders.map(o => createKdsCardHtml(o, 'Mark Ready', 'ready')).join('') || '<div class="empty-cart-text">Kitchen idle</div>';
  readyList.innerHTML = readyOrders.map(o => createKdsCardHtml(o, 'Complete Order', 'completed')).join('') || '<div class="empty-cart-text">None ready</div>';
  completedList.innerHTML = completedOrders.map(o => createKdsCardHtml(o, null, null)).join('') || '<div class="empty-cart-text">No past orders</div>';
}

function createKdsCardHtml(order, nextLabel, nextStatus) {
  const itemsHtml = order.items.map(i => `
    <div class="kds-item-line">
      <span><strong>${i.qty}x</strong> ${i.name}</span>
      <span>$${(i.price * i.qty).toFixed(2)}</span>
    </div>
  `).join('');

  return `
    <div class="kds-card">
      <div class="kds-card-head">
        <span class="kds-card-id">${order.id}</span>
        <span class="kds-card-timer">⏱ ${order.placedTime}</span>
      </div>
      <div class="kds-card-meta">
        <strong>${order.customerName}</strong>
        <span>${order.orderType} • ${order.tableOrAddress}</span>
      </div>
      <div class="kds-card-items">
        ${itemsHtml}
      </div>
      ${order.notes ? `<div style="font-size:0.75rem; color:#f59e0b;">📝 ${order.notes}</div>` : ''}
      <div class="kds-card-actions">
        <button class="btn btn-ghost btn-sm" onclick="selectOrderToTrack('${order.id}'); document.getElementById('tabCustomerView').click();" title="View Customer Tracker">
          🔍 Track
        </button>
        ${nextLabel ? `
          <button class="btn btn-primary btn-sm kds-action-btn" onclick="updateOrderStatusDirect('${order.id}', '${nextStatus}')">
            ${nextLabel} →
          </button>
        ` : `<span style="font-size:0.75rem; color:#10b981; font-weight:700; display:flex; align-items:center; justify-content:center; width:100%;">✓ Completed</span>`}
      </div>
    </div>
  `;
}

window.updateOrderStatusDirect = function(orderId, targetStatus) {
  const order = appState.orders.find(o => o.id === orderId);
  if (!order) return;
  order.status = targetStatus;
  saveOrders();
  playNotificationSound('advance');
  renderKdsBoard();
  renderCustomerTracker();
  updateHeaderBadges();
  showToast(`Order ${order.id} moved to ${targetStatus.toUpperCase()}`, 'success');
};

function toggleAutoSimulator() {
  appState.autoSimulating = !appState.autoSimulating;
  const btn = document.getElementById('btnAutoSimulate');
  const text = document.getElementById('autoSimText');

  if (appState.autoSimulating) {
    btn.classList.add('btn-primary');
    btn.classList.remove('btn-secondary');
    text.textContent = 'Auto-Sim Active (Running)';
    showToast('Simulation started: Orders will advance automatically', 'info');

    appState.simIntervalId = setInterval(() => {
      // Find an incomplete order and advance it
      const activeList = appState.orders.filter(o => o.status !== 'completed');
      if (activeList.length > 0) {
        const randomOrder = activeList[Math.floor(Math.random() * activeList.length)];
        advanceOrderStatus(randomOrder.id);
      }
    }, 4500);
  } else {
    btn.classList.remove('btn-primary');
    btn.classList.add('btn-secondary');
    text.textContent = 'Start Auto-Simulator';
    clearInterval(appState.simIntervalId);
    showToast('Simulation stopped', 'info');
  }
}

// =============================================================================
// 7. NEW ORDER CREATION MODAL & CART SYSTEM
// =============================================================================

function setupNewOrderModal() {
  const modal = document.getElementById('newOrderModal');
  const btnOpen = document.getElementById('btnNewOrder');
  const btnClose = document.getElementById('btnCloseNewOrder');
  const btnSubmit = document.getElementById('btnSubmitOrder');
  const selectOrderType = document.getElementById('selectOrderType');
  const inputTableAddress = document.getElementById('inputTableAddress');

  btnOpen.addEventListener('click', () => {
    appState.activeCart = {};
    renderModalMenu('all');
    renderModalCart();
    modal.classList.remove('hidden');
  });

  btnClose.addEventListener('click', () => {
    modal.classList.add('hidden');
  });

  selectOrderType.addEventListener('change', () => {
    const val = selectOrderType.value;
    if (val === 'Dine-in') inputTableAddress.value = 'Table ' + (Math.floor(Math.random() * 8) + 1);
    else if (val === 'Pickup') inputTableAddress.value = 'Takeaway Counter';
    else inputTableAddress.value = 'Sabya District, Street 14';
  });

  // Categories Tabs
  const catTabs = document.querySelectorAll('#menuCatTabs .cat-tab');
  catTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      catTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderModalMenu(tab.getAttribute('data-cat'));
    });
  });

  btnSubmit.addEventListener('click', submitNewOrder);
}

function renderModalMenu(cat = 'all') {
  const grid = document.getElementById('menuItemsGrid');
  const items = cat === 'all' ? MENU_ITEMS : MENU_ITEMS.filter(m => m.category === cat);

  grid.innerHTML = items.map(item => `
    <div class="menu-item-card">
      <div class="menu-item-info">
        <h5>${item.name}</h5>
        <p>${item.desc}</p>
      </div>
      <div class="menu-item-action">
        <span class="menu-price">$${item.price.toFixed(2)}</span>
        <button class="btn-add-item" onclick="addToCart('${item.id}')">+ Add</button>
      </div>
    </div>
  `).join('');
}

window.addToCart = function(itemId) {
  appState.activeCart[itemId] = (appState.activeCart[itemId] || 0) + 1;
  renderModalCart();
  playNotificationSound('chime');
};

window.modifyCartQty = function(itemId, delta) {
  if (!appState.activeCart[itemId]) return;
  appState.activeCart[itemId] += delta;
  if (appState.activeCart[itemId] <= 0) {
    delete appState.activeCart[itemId];
  }
  renderModalCart();
};

function renderModalCart() {
  const cartList = document.getElementById('selectedCartList');
  const cartTotalEl = document.getElementById('modalCartTotal');
  const btnSubmit = document.getElementById('btnSubmitOrder');

  const keys = Object.keys(appState.activeCart);
  if (keys.length === 0) {
    cartList.innerHTML = '<div class="empty-cart-text">No items added yet. Click on menu dishes to add.</div>';
    cartTotalEl.textContent = '$0.00';
    btnSubmit.disabled = true;
    return;
  }

  let total = 0;
  cartList.innerHTML = keys.map(id => {
    const item = MENU_ITEMS.find(m => m.id === id);
    const qty = appState.activeCart[id];
    const lineTotal = item.price * qty;
    total += lineTotal;
    return `
      <div class="cart-item-row">
        <span>${item.name}</span>
        <div class="cart-qty-ctrl">
          <button class="btn-qty" onclick="modifyCartQty('${id}', -1)">-</button>
          <span>${qty}</span>
          <button class="btn-qty" onclick="modifyCartQty('${id}', 1)">+</button>
          <strong style="margin-left:8px;">$${lineTotal.toFixed(2)}</strong>
        </div>
      </div>
    `;
  }).join('');

  const tax = total * 0.15;
  const grand = total + tax;
  cartTotalEl.textContent = `$${grand.toFixed(2)}`;
  btnSubmit.disabled = false;
}

function submitNewOrder() {
  const name = document.getElementById('inputCustName').value.trim() || 'Guest Customer';
  const phone = document.getElementById('inputCustPhone').value.trim();
  const type = document.getElementById('selectOrderType').value;
  const table = document.getElementById('inputTableAddress').value.trim() || 'Counter';
  const notes = document.getElementById('inputOrderNotes').value.trim();

  const cartKeys = Object.keys(appState.activeCart);
  if (cartKeys.length === 0) return;

  const items = cartKeys.map(id => {
    const item = MENU_ITEMS.find(m => m.id === id);
    return {
      id: item.id,
      name: item.name,
      qty: appState.activeCart[id],
      price: item.price
    };
  });

  const nextNum = 1080 + appState.orders.length + 1;
  const now = new Date();
  const placedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

  const newOrder = {
    id: `ORD-${nextNum}`,
    customerName: name,
    customerPhone: phone,
    orderType: type,
    tableOrAddress: table,
    placedTime: placedTime,
    placedTimestamp: Date.now(),
    status: 'placed',
    items: items,
    notes: notes,
    estMinutes: 20
  };

  appState.orders.unshift(newOrder);
  saveOrders();
  appState.selectedOrderId = newOrder.id;

  // Close modal
  document.getElementById('newOrderModal').classList.add('hidden');
  playNotificationSound('success');
  showToast(`Order ${newOrder.id} successfully created!`, 'success');

  // Render & switch to customer tracker view
  document.getElementById('tabCustomerView').click();
  renderCustomerTracker();
  renderKdsBoard();
  updateHeaderBadges();
}

// =============================================================================
// 8. RECEIPT / INVOICE MODAL
// =============================================================================

function setupReceiptModal() {
  const btnPrint = document.getElementById('btnPrintInvoice');
  const modal = document.getElementById('receiptModal');
  const btnClose = document.getElementById('btnCloseReceipt');

  btnPrint.addEventListener('click', () => {
    const order = appState.orders.find(o => o.id === appState.selectedOrderId);
    if (!order) return;

    document.getElementById('recOrderId').textContent = order.id;
    document.getElementById('recDate').textContent = new Date().toISOString().split('T')[0];
    document.getElementById('recType').textContent = `${order.orderType} (${order.tableOrAddress})`;
    document.getElementById('recCustomer').textContent = order.customerName;

    let subtotal = 0;
    document.getElementById('receiptTableBody').innerHTML = order.items.map(item => {
      const line = item.price * item.qty;
      subtotal += line;
      return `
        <tr>
          <td>${item.name}</td>
          <td align="center">${item.qty}</td>
          <td align="right">$${line.toFixed(2)}</td>
        </tr>
      `;
    }).join('');

    const tax = subtotal * 0.15;
    const service = order.orderType === 'Delivery' ? 3.00 : 0.00;
    const grand = subtotal + tax + service;

    document.getElementById('recSubtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('recTax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('recService').textContent = `$${service.toFixed(2)}`;
    document.getElementById('recTotal').textContent = `$${grand.toFixed(2)}`;

    modal.classList.remove('hidden');
  });

  btnClose.addEventListener('click', () => {
    modal.classList.add('hidden');
  });
}

// =============================================================================
// 9. TOAST NOTIFICATIONS HELPER
// =============================================================================

function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
      ${type === 'success' 
        ? '<polyline points="20 6 9 17 4 12"></polyline>' 
        : '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line>'}
    </svg>
    <span>${message}</span>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.25s ease';
    setTimeout(() => toast.remove(), 250);
  }, 3500);
}
