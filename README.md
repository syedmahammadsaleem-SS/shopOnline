<div align="center">

# 🛍️ ShopOnline

**A responsive, single-page e-commerce storefront built with pure HTML, CSS and JavaScript.**

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![No Dependencies](https://img.shields.io/badge/dependencies-none-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)

[**🔗 Live Demo**](https://YOUR-SITE.netlify.app) · [**Report a Bug**](https://github.com/YOUR-USERNAME/shoponline/issues) · [**Request a Feature**](https://github.com/YOUR-USERNAME/shoponline/issues)

</div>

---

## 📸 Preview

> Add screenshots to a `screenshots/` folder and update the paths below.

| Home                          | Shop & Filters                |
| ----------------------------- | ----------------------------- |
| ![Home](screenshots/home.png) | ![Shop](screenshots/shop.png) |

| Cart                          | Dark Mode                          |
| ----------------------------- | ---------------------------------- |
| ![Cart](screenshots/cart.png) | ![Dark mode](screenshots/dark.png) |

## ✨ Features

**Shopping experience**

- 30 products across 5 categories with a quick-view modal
- Live search with instant suggestions
- Filter by category, price range and minimum rating
- Sort by popularity, price (low/high) or newest

**Cart and checkout**

- Add, remove and change quantities
- Promo codes: `ONLINE20` (20% off) and `SAVE10` (10% off)
- Free shipping on orders of $100 or more
- Checkout form with validation and two payment options (cash on delivery or demo card)
- Order confirmation and order history

**Account and personalisation**

- Wishlist
- Demo login and registration
- Dark mode that remembers your choice and follows your system setting by default
- Cart, wishlist, orders and theme saved in `localStorage`

**Quality**

- Fully responsive, from phones to large desktops
- Accessible: labelled form fields, keyboard navigation, visible focus, ARIA live toasts, reduced-motion support
- Hash-based routing (`#shop`, `#cart`, …) so the back button and page refresh work
- User input is escaped to prevent HTML injection
- Safe storage handling and image fallbacks if something fails to load

> ⚠️ **Demo project:** login and checkout are simulated in the browser. No real authentication or payments are processed, and no data leaves your device.

## 🧰 Tech Stack

| Area            | Tools                                                  |
| --------------- | ------------------------------------------------------ |
| Markup          | HTML5 (semantic elements)                              |
| Styling         | CSS3: custom properties, Grid, Flexbox, media queries  |
| Logic           | Vanilla JavaScript (ES6+), no frameworks or build step |
| Icons and fonts | Font Awesome, Google Fonts (Plus Jakarta Sans)         |
| Images          | Unsplash                                               |
| Storage         | Browser `localStorage`                                 |

## 📁 Project Structure

```
shoponline/
├── index.html        # Page shell: header, footer, modal and toast containers
├── css/
│   └── styles.css    # Design tokens, layout, components, responsive and dark theme
├── js/
│   └── app.js        # Data, state, views, router, cart and checkout logic
└── README.md
```

## 🚀 Getting Started

No installation needed.

**Option 1: open directly**

1. Download or clone the repository
2. Double-click `index.html`

**Option 2: run a local server**

```bash
git clone https://github.com/YOUR-USERNAME/shoponline.git
cd shoponline
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

> An internet connection is required for fonts, icons and product images.

## 🧠 How It Works

- **State:** one `state` object holds the cart, wishlist, user, orders, coupon and theme, and `save()` syncs it to `localStorage` and updates the header.
- **Views:** each page (`home`, `shop`, `cart`, …) is a function that returns HTML, and a small router renders the right one when the URL hash changes.
- **Events:** a single delegated click handler reads `data-act` attributes, which keeps the code short and avoids inline `onclick` handlers.
- **Totals:** one `totals()` function calculates subtotal, discount, shipping and total, and is shared by the cart and checkout.

## 🛠️ Customisation

| What                           | Where                                        |
| ------------------------------ | -------------------------------------------- |
| Add or edit products           | `PRODUCTS` array in `js/app.js`              |
| Add promo codes                | `COUPONS` object in `js/app.js`              |
| Change colours and theme       | CSS variables at the top of `css/styles.css` |
| Change free-shipping threshold | `totals()` function in `js/app.js`           |

## 🌐 Deployment

This is a static site, so it deploys anywhere:

- **Netlify:** drag and drop the folder at app.netlify.com/drop, or import the GitHub repo
- **Vercel:** import the GitHub repo and click Deploy
- **GitHub Pages:** Settings → Pages → deploy from the `main` branch

## 🗺️ Roadmap

- [ ] Product detail pages with image gallery
- [ ] Size and colour variants
- [ ] Product reviews and ratings form
- [ ] Real backend (Node.js and a database) with authentication
- [ ] Payment gateway integration
- [ ] Unit tests for cart and totals logic

## 📚 What I Learned

- Structuring a vanilla JavaScript app without a framework
- Client-side routing and state management
- Responsive layout and theming with CSS variables
- Accessibility basics and defensive coding

## 👤 Author

**Syed**

- GitHub: [@YOUR-USERNAME](https://github.com/YOUR-USERNAME)
- LinkedIn: [your-profile](https://www.linkedin.com/in/YOUR-PROFILE)

## 📄 License

Distributed under the MIT License. See `LICENSE` for details.

---

<div align="center">If you like this project, please give it a ⭐</div>
