'use strict';
/* ---------- Helpers ---------- */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const money = n => '$' + n.toFixed(2);
const PH = "data:image/svg+xml;utf8," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="500" height="375"><rect width="100%" height="100%" fill="#e2e8f0"/><text x="50%" y="50%" fill="#94a3b8" font-family="sans-serif" font-size="22" text-anchor="middle">Image unavailable</text></svg>');
const store = {
  get(k, d) { try { const v = localStorage.getItem('shoponline_' + k); return v ? JSON.parse(v) : d; } catch { return d; } },
  set(k, v) { try { localStorage.setItem('shoponline_' + k, JSON.stringify(v)); } catch {} }
};

/* ---------- Data: [id, name, category, price, original, rating, reviews, unsplash photo, featured] ---------- */
const CATS = { 'Electronics': 'fa-headphones-simple', 'Fashion': 'fa-shirt', 'Home & Living': 'fa-house', 'Beauty': 'fa-spa', 'Accessories': 'fa-glasses' };
const PRODUCTS = [
[1,'Aura Pro Wireless Headphones','Electronics',199.99,249.99,4.8,142,'1505740420928-5e560c06d30e',1],
[2,'Smart Fitness Watch Ultra','Electronics',149.50,199.00,4.7,98,'1523275335684-37898b6baf30',1],
[3,'Minimalist Leather Backpack','Fashion',89.00,120.00,4.6,64,'1553062407-98eeb64c6a62',1],
[4,'Ergonomic Mechanical Keyboard','Electronics',129.99,159.99,4.9,210,'1587829741301-dc798b83add3',1],
[5,'Modern Ceramic Table Lamp','Home & Living',65.00,85.00,4.5,45,'1507473885765-e6ed057f782c',0],
[6,'Organic Hydrating Face Serum','Beauty',34.00,45.00,4.8,89,'1620916566398-39f1143ab7be',1],
[7,'Polarized Clubmaster Sunglasses','Accessories',55.00,75.00,4.4,52,'1511499767150-a48a237f0083',0],
[8,'4K Portable Gaming Monitor','Electronics',289.00,349.00,4.7,77,'1527443224154-c4a3942d3acf',1],
[9,'Casual Cotton Linen Shirt','Fashion',42.50,55.00,4.3,38,'1596755094514-f87e34085b2c',0],
[10,'Aromatic Essential Oil Diffuser','Home & Living',39.99,49.99,4.6,112,'1608571423902-eed4a5ad8108',0],
[11,'Matte Lipstick Quad Set','Beauty',28.00,38.00,4.5,67,'1586495777744-4413f21062fa',0],
[12,'Classic Quartz Leather Watch','Accessories',115.00,150.00,4.8,130,'1524805444758-089113d48a6d',1],
[13,'High-Fidelity Bluetooth Speaker','Electronics',79.99,99.99,4.6,94,'1545454675-3531b543be5d',0],
[14,'Urban Streetwear Hoodie','Fashion',68.00,85.00,4.7,81,'1556905055-8f358a7a47b2',1],
[15,'Handcrafted Ceramic Coffee Mugs','Home & Living',32.00,40.00,4.9,156,'1514432324607-a09d9b4aefdd',0],
[16,'Nourishing Hair Treatment Oil','Beauty',24.50,32.00,4.4,41,'1608248597266-c89050d2c56b',0],
[17,'Minimalist Silver Cuff Bangle','Accessories',48.00,60.00,4.5,33,'1611591475143-be232563e77f',0],
[18,'Noise-Cancelling Earbuds','Electronics',119.00,149.00,4.7,175,'1590658268037-6bf12165a8df',0],
[19,'Slim Fit Denim Jacket','Fashion',95.00,125.00,4.6,70,'1576995853123-5a10305d93c0',0],
[20,'Luxury Velvet Throw Pillow Set','Home & Living',45.00,60.00,4.3,29,'1584100936595-c0654b55a2e2',0],
[21,'Radiance Sunscreen Gel SPF 50','Beauty',22.00,28.00,4.9,215,'1598440947619-2c35fc9aa908',1],
[22,'Genuine Leather Wallet','Accessories',38.00,50.00,4.7,104,'1627123424574-724758594e93',0],
[23,'Ultra-Fast Wireless Charging Pad','Electronics',35.00,45.00,4.5,88,'1622445268465-843d63309a47',0],
[24,'Tailored Chino Trousers','Fashion',58.00,75.00,4.4,49,'1473966968600-fa801b869a1a',0],
[25,'Natural Bamboo Bed Sheets','Home & Living',110.00,140.00,4.8,118,'1631679706909-1844bbd07221',1],
[26,'Botanical Body Wash Concentrate','Beauty',19.50,25.00,4.6,63,'1556228720-195a672e8a03',0],
[27,'Canvas Weekend Travel Duffle','Accessories',78.00,98.00,4.7,92,'1547949003-9792a18a2601',0],
[28,'Smart LED Desk Lamp with Qi','Electronics',52.00,70.00,4.6,73,'1534353473418-4cfa6c56fd38',0],
[29,'Suede Ankle Boots','Fashion',120.00,160.00,4.8,84,'1543163521-1bf539c55dd2',0],
[30,'Modern Geometric Wall Clock','Home & Living',42.00,55.00,4.4,36,'1563861826100-9cb868fdbe1c',0]
].map(([id, name, category, price, original, rating, reviews, photo, featured]) =>
  ({ id, name, category, price, original, rating, reviews, featured: !!featured, img: `https://images.unsplash.com/photo-${photo}?w=500&auto=format&fit=crop&q=80` }));
const byId = id => PRODUCTS.find(p => p.id === +id);
const COUPONS = { ONLINE20: 0.20, SAVE10: 0.10 };

/* ---------- State ---------- */
const state = {
  cart: store.get('cart', []),
  wishlist: store.get('wishlist', []),
  user: store.get('user', null),
  orders: store.get('orders', [{ id: 'SPH-77123', date: '2026-03-15', total: 249.99, status: 'Delivered', items: 2 }]),
  coupon: store.get('coupon', null),
  theme: store.get('theme', matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
};
const filters = { cats: [], min: 0, max: 1000, rating: 0, sort: 'popularity', q: '' };
let lastOrder = '';

function save() {
  ['cart', 'wishlist', 'user', 'orders', 'coupon', 'theme'].forEach(k => store.set(k, state[k]));
  const n = state.cart.reduce((a, i) => a + i.qty, 0);
  $('#cCount').textContent = n || ''; $('#wCount').textContent = state.wishlist.length || '';
  $('#acctLabel').textContent = state.user ? state.user.name.split(' ')[0] : 'Account';
  document.documentElement.dataset.theme = state.theme;
  $('#themeIcon').className = 'fa-solid ' + (state.theme === 'dark' ? 'fa-sun' : 'fa-moon');
}
function totals() {
  const sub = state.cart.reduce((a, i) => a + (byId(i.id)?.price || 0) * i.qty, 0);
  const discount = state.coupon ? sub * COUPONS[state.coupon] : 0;
  const shipping = sub === 0 || sub >= 100 ? 0 : 15;
  return { sub, discount, shipping, total: sub - discount + shipping };
}

/* ---------- Templates ---------- */
const img = (src, alt, cls = '') => `<img src="${src}" alt="${esc(alt)}" class="${cls}" loading="lazy" onerror="this.onerror=null;this.src=PH">`;
function productCard(p) {
  const off = Math.round((1 - p.price / p.original) * 100), liked = state.wishlist.includes(p.id);
  return `<article class="card">
    <div class="badges">${off > 0 ? `<span class="badge b-danger">-${off}%</span>` : ''}${p.featured ? '<span class="badge b-accent">Hot</span>' : ''}</div>
    <button class="wish ${liked ? 'on' : ''}" data-act="wish" data-id="${p.id}" aria-pressed="${liked}" aria-label="${liked ? 'Remove from' : 'Add to'} wishlist: ${esc(p.name)}"><i class="fa-${liked ? 'solid' : 'regular'} fa-heart"></i></button>
    <button class="thumb" data-act="quick" data-id="${p.id}" aria-label="Quick view ${esc(p.name)}">${img(p.img, p.name)}</button>
    <div class="info"><div class="pcat">${p.category}</div>
      <button class="ptitle" data-act="quick" data-id="${p.id}">${esc(p.name)}</button>
      <div class="rate"><i class="fa-solid fa-star"></i>${p.rating}<span>(${p.reviews})</span></div>
      <div class="price"><b>${money(p.price)}</b><s>${money(p.original)}</s></div>
      <button class="btn btn-primary btn-sm btn-block" data-act="add" data-id="${p.id}"><i class="fa-solid fa-cart-plus"></i> Add to cart</button>
    </div></article>`;
}
const emptyState = (icon, title, text, btn) => `<div class="empty"><i class="${icon}"></i><h3>${title}</h3><p>${text}</p>${btn}</div>`;
const goBtn = (view, label) => `<a class="btn btn-primary" href="#${view}">${label}</a>`;

/* ---------- Views ---------- */
const views = {
  home() {
    const trending = PRODUCTS.filter(p => p.featured || p.rating >= 4.7).slice(0, 8);
    return `<section class="view">
      <div class="hero"><div class="hero-c"><span class="tag">New collection 2026</span>
        <h1>Smart tech and fashion, picked for everyday life</h1>
        <p>${PRODUCTS.length} curated products with free delivery over $100 and 30-day returns.</p>
        <div style="display:flex;gap:1rem;flex-wrap:wrap"><a class="btn btn-primary btn-lg" href="#shop">Shop all products</a><button class="btn btn-secondary btn-lg" data-act="cat" data-arg="Electronics">Explore tech</button></div></div>
        ${img(PRODUCTS[0].img, 'Aura Pro Wireless Headphones')}</div>
      <div class="sec-head"><div><h2 class="sec-title">Featured categories</h2><p class="sub">Browse the most popular departments</p></div></div>
      <div class="cats">${Object.entries(CATS).map(([c, ic]) => `<button class="cat" data-act="cat" data-arg="${c}"><i class="fa-solid ${ic}"></i><b>${c}</b><span>${PRODUCTS.filter(p => p.category === c).length} items</span></button>`).join('')}</div>
      <div class="sec-head"><div><h2 class="sec-title">Trending products</h2><p class="sub">Top-rated picks from our customers</p></div><a class="btn btn-outline btn-sm" href="#shop">View all</a></div>
      <div class="grid">${trending.map(productCard).join('')}</div></section>`;
  },
  shop() {
    const f = filters;
    return `<section class="view">
      <div class="panel toolbar"><div class="sub" id="count" aria-live="polite"></div>
        <div><label class="sub" for="sort">Sort by </label><select id="sort"><option value="popularity">Popularity</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="newest">Newest arrivals</option></select></div></div>
      <div class="shop"><aside class="panel filters" id="filters" aria-label="Filters">
        <div class="fg"><h3>Categories <button class="btn btn-outline btn-sm" data-act="reset">Reset</button></h3><div class="fopts">
          ${Object.keys(CATS).map(c => `<label><input type="checkbox" name="cat" value="${c}" ${f.cats.includes(c) ? 'checked' : ''}> ${c}</label>`).join('')}</div></div>
        <div class="fg"><h3>Price range ($)</h3><div class="range"><input class="input" type="number" min="0" id="min" value="${f.min}" aria-label="Minimum price"><span>–</span><input class="input" type="number" min="0" id="max" value="${f.max}" aria-label="Maximum price"></div></div>
        <div class="fg"><h3>Minimum rating</h3><div class="fopts">${[[4, '4★ & above'], [3, '3★ & above'], [0, 'All ratings']].map(([v, l]) => `<label><input type="radio" name="rating" value="${v}" ${f.rating === v ? 'checked' : ''}> ${l}</label>`).join('')}</div></div>
      </aside><div class="grid" id="results"></div></div></section>`;
  },
  cart() {
    const lines = state.cart.map(i => ({ i, p: byId(i.id) })).filter(x => x.p);
    if (!lines.length) return `<section class="view"><h2 class="sec-title" style="margin-bottom:1.5rem">Your cart</h2><div class="grid">${emptyState('fa-solid fa-cart-arrow-down', 'Your cart is empty', 'Add something you like and it will show up here.', goBtn('shop', 'Start shopping'))}</div></section>`;
    const t = totals();
    return `<section class="view"><h2 class="sec-title" style="margin-bottom:1.5rem">Your cart</h2><div class="two">
      <div class="panel">${lines.map(({ i, p }) => `<div class="item">${img(p.img, p.name)}
        <div><b>${esc(p.name)}</b><div class="sub">Unit price ${money(p.price)}</div></div>
        <div class="qty"><button data-act="qty" data-id="${p.id}" data-d="-1" aria-label="Decrease quantity">−</button><span>${i.qty}</span><button data-act="qty" data-id="${p.id}" data-d="1" aria-label="Increase quantity">+</button></div>
        <div style="text-align:right"><b>${money(p.price * i.qty)}</b><br><button style="color:var(--danger);font-size:.8rem" data-act="rm" data-id="${p.id}">Remove</button></div></div>`).join('')}</div>
      <div class="panel sum"><h3 style="margin-bottom:1.2rem">Order summary</h3>${summary(t)}
        <form class="coupon" id="couponForm"><label class="sr" for="coupon">Promo code</label><input class="input" id="coupon" placeholder="Promo code (ONLINE20)" value="${state.coupon || ''}"><button class="btn btn-secondary btn-sm">Apply</button></form>
        <a class="btn btn-primary btn-lg btn-block" href="#checkout">Proceed to checkout</a></div></div></section>`;
  },
  wishlist() {
    const items = PRODUCTS.filter(p => state.wishlist.includes(p.id));
    return `<section class="view"><h2 class="sec-title" style="margin-bottom:1.5rem">My wishlist</h2><div class="grid">${items.length ? items.map(productCard).join('') : emptyState('fa-regular fa-heart', 'Your wishlist is empty', 'Save items you love to find them later.', goBtn('shop', 'Explore products'))}</div></section>`;
  },
  checkout() {
    if (!state.cart.length) return `<section class="view"><div class="grid">${emptyState('fa-solid fa-cart-arrow-down', 'Nothing to check out', 'Your cart is empty.', goBtn('shop', 'Continue shopping'))}</div></section>`;
    const u = state.user || {}, [first = '', ...rest] = (u.name || '').split(' ');
    return `<section class="view"><h2 class="sec-title" style="margin-bottom:1.5rem"><i class="fa-solid fa-shield-halved" style="color:var(--success)"></i> Checkout (demo)</h2><div class="two">
      <form class="panel" id="checkoutForm"><div class="ftitle">1. Shipping address</div><div class="fgrid">
        <div class="field"><label for="fn">First name</label><input class="input" id="fn" required autocomplete="given-name" value="${esc(first)}"></div>
        <div class="field"><label for="ln">Last name</label><input class="input" id="ln" required autocomplete="family-name" value="${esc(rest.join(' '))}"></div>
        <div class="field full"><label for="em">Email</label><input class="input" id="em" type="email" required autocomplete="email" value="${esc(u.email || '')}"></div>
        <div class="field full"><label for="ad">Street address</label><input class="input" id="ad" required autocomplete="street-address"></div>
        <div class="field"><label for="ct">City</label><input class="input" id="ct" required autocomplete="address-level2"></div>
        <div class="field"><label for="zp">Postal code</label><input class="input" id="zp" required autocomplete="postal-code" inputmode="numeric" pattern="[A-Za-z0-9 \\-]{3,10}" title="3–10 letters or digits"></div></div>
        <div class="ftitle">2. Payment method</div>
        <div class="pay"><label><input type="radio" name="pay" value="cod" checked><span><b>Cash on delivery</b><small>Pay when it arrives</small></span></label>
          <label><input type="radio" name="pay" value="card"><span><b>Demo card</b><small>Test payment, nothing is charged</small></span></label></div>
        <div class="fgrid" id="cardFields" hidden><div class="field full"><label for="cn">Card number</label><input class="input" id="cn" inputmode="numeric" maxlength="19" placeholder="4242 4242 4242 4242" pattern="[0-9 ]{13,19}"></div>
          <div class="field"><label for="ce">Expiry</label><input class="input" id="ce" placeholder="MM/YY" maxlength="5" pattern="(0[1-9]|1[0-2])\\/[0-9]{2}"></div>
          <div class="field"><label for="cv">CVC</label><input class="input" id="cv" inputmode="numeric" maxlength="4" pattern="[0-9]{3,4}"></div></div>
        <button class="btn btn-primary btn-lg btn-block"><i class="fa-solid fa-lock"></i> Place order</button></form>
      <div class="panel sum"><h3 style="margin-bottom:1.2rem">Order summary</h3>${summary(totals())}</div></div></section>`;
  },
  success() {
    return `<section class="view"><div class="grid">${emptyState('fa-solid fa-circle-check', 'Order placed!', `Thank you. Your demo order ID is <strong>#${esc(lastOrder || state.orders[0]?.id || '')}</strong>.`, `<a class="btn btn-primary" href="#profile">View my orders</a> <a class="btn btn-secondary" href="#shop">Continue shopping</a>`)}</div></section>`;
  },
  profile() {
    const u = state.user, name = u ? u.name : 'Guest';
    const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
    return `<section class="view"><h2 class="sec-title" style="margin-bottom:1.5rem">My account</h2><div class="shop">
      <div class="panel" style="text-align:center"><div style="width:80px;height:80px;background:var(--primary-l);color:var(--primary);border-radius:50%;font-size:2rem;font-weight:800;display:grid;place-items:center;margin:0 auto .75rem">${esc(initials)}</div>
        <h3>${esc(name)}</h3><p class="sub" style="margin-bottom:1.2rem">${u ? esc(u.email) : 'Sign in to save your details'}</p>
        ${u ? '<button class="btn btn-outline btn-block" data-act="logout">Log out</button>' : '<button class="btn btn-primary btn-block" data-act="account">Sign in</button>'}</div>
      <div class="panel"><h3 style="margin-bottom:1rem">Order history</h3>${state.orders.length ? state.orders.map(o => `<div style="display:flex;justify-content:space-between;gap:1rem;padding:1rem 0;border-bottom:1px solid var(--border)"><div><b>Order #${esc(o.id)}</b><div class="sub">${esc(o.date)} · ${o.items} item${o.items === 1 ? '' : 's'}</div></div><div style="text-align:right"><b>${money(o.total)}</b><br><span class="badge ${o.status === 'Delivered' ? 'b-success' : 'b-primary'}">${o.status}</span></div></div>`).join('') : '<p class="sub">No orders yet.</p>'}</div></div></section>`;
  }
};
function summary(t) {
  return `<div class="row"><span>Subtotal</span><span>${money(t.sub)}</span></div>
    <div class="row"><span>Discount ${state.coupon ? '(' + state.coupon + ')' : ''}</span><span style="color:var(--success)">-${money(t.discount)}</span></div>
    <div class="row"><span>Shipping</span><span>${t.shipping ? money(t.shipping) : 'Free'}</span></div>
    <div class="row total"><span>Total</span><span>${money(t.total)}</span></div>`;
}

/* ---------- Router ---------- */
function route() {
  closeModal();
  const name = location.hash.slice(1) || 'home', view = views[name] ? name : 'home';
  $('#app').innerHTML = views[view]();
  if (view === 'shop') { $('#sort').value = filters.sort; applyFilters(); }
  $$('.nav-item').forEach(n => n.classList.toggle('active',
    view === 'shop' && (n.dataset.arg || 'All') === (filters.cats.length === 1 ? filters.cats[0] : 'All')));
  document.title = (view === 'home' ? 'ShopOnline' : view[0].toUpperCase() + view.slice(1) + ' | ShopOnline');
  scrollTo({ top: 0 }); 
}
const go = v => { if (location.hash === '#' + v) route(); else location.hash = v; };
function refresh() { // re-render current view without scrolling
  const y = scrollY, v = location.hash.slice(1) || 'home';
  if (v === 'shop') applyFilters(); else { $('#app').innerHTML = (views[v] || views.home)(); }
  scrollTo({ top: y });
}

/* ---------- Shop filtering ---------- */
function applyFilters() {
  const f = filters, q = f.q.toLowerCase();
  const list = PRODUCTS.filter(p => (!f.cats.length || f.cats.includes(p.category)) && p.price >= f.min && p.price <= f.max && p.rating >= f.rating &&
    (!q || p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)));
  const sorts = { 'price-low': (a, b) => a.price - b.price, 'price-high': (a, b) => b.price - a.price, newest: (a, b) => b.id - a.id, popularity: (a, b) => b.reviews - a.reviews };
  list.sort(sorts[f.sort]);
  $('#count').textContent = `Showing ${list.length} product${list.length === 1 ? '' : 's'}${f.q ? ` for “${f.q}”` : ''}`;
  $('#results').innerHTML = list.length ? list.map(productCard).join('') : emptyState('fa-solid fa-magnifying-glass', 'No matching products', 'Try changing your filters or search.', '<button class="btn btn-primary btn-sm" data-act="reset">Reset filters</button>');
}
function readFilters() {
  const f = filters;
  f.cats = $$('input[name=cat]:checked').map(c => c.value);
  f.min = Math.max(0, parseFloat($('#min').value) || 0);
  f.max = parseFloat($('#max').value) || 1000;
  f.rating = +($('input[name=rating]:checked')?.value || 0);
  f.sort = $('#sort').value;
  applyFilters();
}

/* ---------- Actions ---------- */
function toast(msg, type = 'info') {
  const t = document.createElement('div'); t.className = 'toast ' + type;
  t.innerHTML = `<i class="fa-solid fa-${type === 'success' ? 'circle-check' : type === 'error' ? 'circle-exclamation' : 'circle-info'}"></i><span>${esc(msg)}</span>`;
  $('#toasts').append(t); setTimeout(() => t.remove(), 3000);
}
function openModal(html, small) {
  $('#dialog').className = 'dialog' + (small ? ' sm' : '');
  $('#dialog').innerHTML = `<button class="close" data-act="close" aria-label="Close"><i class="fa-solid fa-xmark"></i></button>` + html;
  $('#modal').classList.add('on'); $('.close').focus();
}
function closeModal() { $('#modal').classList.remove('on'); }
function quickView(id) {
  const p = byId(id), liked = state.wishlist.includes(p.id);
  openModal(`<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:1.5rem;margin-top:1rem">
    ${img(p.img, p.name, '" style="border-radius:var(--r-md);width:100%')}
    <div><span class="badge b-primary">${p.category}</span><h2 style="font-size:1.35rem;margin:.5rem 0">${esc(p.name)}</h2>
      <div class="rate"><i class="fa-solid fa-star"></i>${p.rating}<span>(${p.reviews} reviews)</span></div>
      <div class="price"><b style="font-size:1.5rem">${money(p.price)}</b><s>${money(p.original)}</s></div>
      <p class="sub" style="margin-bottom:1.5rem">Quality you can rely on every day, with a 30-day money-back guarantee.</p>
      <div style="display:flex;gap:.75rem"><button class="btn btn-primary" style="flex:1" data-act="add" data-id="${p.id}" data-close="1"><i class="fa-solid fa-cart-plus"></i> Add to cart</button>
      <button class="btn btn-secondary" data-act="wish" data-id="${p.id}" data-reopen="1" aria-label="Toggle wishlist"><i class="fa-${liked ? 'solid' : 'regular'} fa-heart" ${liked ? 'style="color:var(--danger)"' : ''}></i></button></div></div></div>`);
}
function authModal(tab = 'login') {
  const reg = tab === 'register';
  openModal(`<h2 style="margin-top:.3rem">${reg ? 'Create account' : 'Welcome back'}</h2>
    <p class="sub">Demo only: details stay in your browser and no password is checked.</p>
    <div class="tabs" role="tablist"><button class="${reg ? '' : 'on'}" data-act="tab" data-arg="login">Log in</button><button class="${reg ? 'on' : ''}" data-act="tab" data-arg="register">Register</button></div>
    <form id="authForm" data-mode="${tab}" style="display:grid;gap:1rem">
      ${reg ? '<div class="field"><label for="an">Full name</label><input class="input" id="an" required autocomplete="name"></div>' : ''}
      <div class="field"><label for="ae">Email</label><input class="input" id="ae" type="email" required autocomplete="email"></div>
      <div class="field"><label for="ap">Password</label><input class="input" id="ap" type="password" required minlength="6" autocomplete="${reg ? 'new' : 'current'}-password"></div>
      <button class="btn btn-primary btn-block">${reg ? 'Create account' : 'Log in'}</button></form>`, true);
}
function toggleWish(id) {
  const i = state.wishlist.indexOf(id);
  i > -1 ? state.wishlist.splice(i, 1) : state.wishlist.push(id);
  toast(i > -1 ? 'Removed from wishlist' : 'Added to wishlist', i > -1 ? 'info' : 'success');
}

const actions = {
  go: (_, a) => go(a),
  cat: (_, a) => { filters.cats = a === 'All' ? [] : [a]; filters.q = ''; $('#q').value = ''; go('shop'); },
  add: id => { const l = state.cart.find(i => i.id === id); l ? l.qty++ : state.cart.push({ id, qty: 1 }); save(); toast('Added to cart', 'success'); },
  wish: id => { toggleWish(id); save(); },
  quick: id => quickView(id),
  qty: (id, _, d) => { const l = state.cart.find(i => i.id === id); if (!l) return; l.qty += d; if (l.qty < 1) state.cart = state.cart.filter(i => i !== l); save(); },
  rm: id => { state.cart = state.cart.filter(i => i.id !== id); save(); toast('Removed from cart'); },
  reset: () => { Object.assign(filters, { cats: [], min: 0, max: 1000, rating: 0, sort: 'popularity', q: '' }); $('#q').value = ''; route(); },
  account: () => state.user ? go('profile') : authModal(),
  tab: (_, a) => authModal(a),
  logout: () => { state.user = null; save(); go('home'); toast('Logged out'); },
  theme: () => { state.theme = state.theme === 'dark' ? 'light' : 'dark'; save(); },
  info: (_, a) => toast(a),
  close: closeModal,
  top: () => scrollTo({ top: 0, behavior: 'smooth' })
};
const needsRefresh = new Set(['wish', 'qty', 'rm']);

document.addEventListener('click', e => {
  const el = e.target.closest('[data-act]');
  if (el) {
    const act = el.dataset.act, id = el.dataset.id ? +el.dataset.id : null;
    actions[act]?.(id, el.dataset.arg, +el.dataset.d);
    if (needsRefresh.has(act)) refresh();
    if (el.dataset.close) closeModal();
    if (el.dataset.reopen) quickView(id);
  }
  if (e.target === $('#modal')) closeModal();
  if (!e.target.closest('#searchForm')) $('#suggest').classList.remove('on');
});
document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeModal(); $('#suggest').classList.remove('on'); } });

document.addEventListener('change', e => {
  if (e.target.closest('#filters') || e.target.id === 'sort') readFilters();
  if (e.target.name === 'pay') {
    const card = e.target.value === 'card';
    $('#cardFields').hidden = !card;
    $$('#cardFields input').forEach(i => i.required = card);
  }
});

document.addEventListener('submit', e => {
  e.preventDefault();
  const id = e.target.id;
  if (id === 'searchForm') {
    filters.q = $('#q').value.trim(); filters.cats = [];
    $('#suggest').classList.remove('on'); go('shop');
  } else if (id === 'couponForm') {
    const code = $('#coupon').value.trim().toUpperCase();
    if (COUPONS[code]) { state.coupon = code; toast(`Coupon applied: ${COUPONS[code] * 100}% off`, 'success'); }
    else { state.coupon = null; toast('Invalid promo code. Try ONLINE20', 'error'); }
    save(); refresh();
  } else if (id === 'authForm') {
    const email = $('#ae').value.trim(), reg = e.target.dataset.mode === 'register';
    const name = reg ? $('#an').value.trim() : email.split('@')[0].replace(/[._-]+/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    state.user = { name, email }; save(); closeModal(); toast(reg ? `Account created for ${name}` : `Welcome back, ${name}!`, 'success');
    if (location.hash === '#profile' || location.hash === '#checkout') refresh();
  } else if (id === 'checkoutForm') {
    if (!state.cart.length) return toast('Your cart is empty', 'error');
    const t = totals();
    lastOrder = 'SPH-' + Math.floor(10000 + Math.random() * 90000);
    state.orders.unshift({ id: lastOrder, date: new Date().toISOString().slice(0, 10), total: t.total, status: 'Processing', items: state.cart.reduce((a, i) => a + i.qty, 0) });
    state.cart = []; state.coupon = null; save(); go('success');
  } else if (id === 'newsForm') { toast('Thanks for subscribing!', 'success'); e.target.reset(); }
});

let timer;
$('#q').addEventListener('input', e => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    const q = e.target.value.trim().toLowerCase(), box = $('#suggest');
    if (!q) return box.classList.remove('on');
    const m = PRODUCTS.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)).slice(0, 5);
    box.innerHTML = m.length ? m.map(p => `<button type="button" data-act="quick" data-id="${p.id}">${img(p.img, '')}<span style="flex:1"><b>${esc(p.name)}</b><span>${money(p.price)}</span></span></button>`).join('') : '<p class="sub" style="padding:.75rem 1rem">No products found</p>';
    box.classList.add('on');
  }, 150);
});

/* Nav + scroll */
$('#catNav').innerHTML = `<button class="nav-item" data-act="cat" data-arg="All"><i class="fa-solid fa-border-all"></i> All products</button>` +
  Object.entries(CATS).map(([c, ic]) => `<button class="nav-item" data-act="cat" data-arg="${c}"><i class="fa-solid ${ic}"></i> ${c}</button>`).join('');
addEventListener('scroll', () => $('#top').classList.toggle('on', scrollY > 300), { passive: true });
addEventListener('hashchange', route);
addEventListener('storage', e => { if (e.key?.startsWith('shoponline_')) { Object.assign(state, { cart: store.get('cart', []), wishlist: store.get('wishlist', []) }); save(); } });

save();
route();
