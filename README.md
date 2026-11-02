# ShopOnline

A responsive single-page e-commerce storefront built with vanilla HTML, CSS and JavaScript (no frameworks, no build step).

> Front-end demo only: login and checkout are simulated, no real authentication or payments.

## Features
- 30 products across 5 categories, with quick-view modal
- Live search with suggestions, category/price/rating filters, and sorting
- Cart with quantity controls, promo codes (`ONLINE20` = 20%, `SAVE10` = 10%) and free shipping over $100
- Wishlist, demo login/register, order history
- Checkout form with validation (cash on delivery or demo card)
- Dark mode (remembers your choice), hash-based routing, toast notifications
- Data saved in the browser via `localStorage`
- Accessible: labelled inputs, keyboard support, visible focus, reduced-motion support

## Project structure
```
shoponline/
├── index.html      # Page shell: header, footer, modal and toast containers
├── css/
│   └── styles.css  # Design tokens, layout, components, responsive rules
├── js/
│   └── app.js      # Data, state, views, routing, cart/checkout logic
└── README.md
```

## Run it
Open `index.html` in any modern browser, or serve the folder:
```bash
python3 -m http.server 8000   # then visit http://localhost:8000
```
An internet connection is needed for Google Fonts, Font Awesome icons and Unsplash product images.

## Customising
- **Products:** edit the `PRODUCTS` array in `js/app.js`
- **Coupons:** edit `COUPONS` in `js/app.js`
- **Colours and theme:** edit the CSS variables at the top of `css/styles.css`

## Tech
HTML5 · CSS3 (custom properties, grid, flexbox) · JavaScript (ES6+) · Font Awesome · Google Fonts
