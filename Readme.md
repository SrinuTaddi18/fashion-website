# Bundle Builder UI

This project implements a responsive and interactive "Bundle Builder" web UI that allows users to select products to create a custom bundle, view bundle progress, see discount calculations, and proceed with their selection. The design follows a Shopify-style bundle section with a clean, user-friendly interface.

---

## Features

- **Responsive Product Grid:** Displays 6 product cards, each showing an image, title, price, and a toggle-style "Add to Bundle" button.
- **Bundle Sidebar:** Positioned on the right side on desktop, stacks below on mobile.
  - Progress bar indicating how many items are selected out of the required bundle size (3).
  - Dynamic list of selected products with thumbnail, name, price, and quantity stepper.
  - Remove (deselect) products directly from the sidebar.
  - Automatic 30% discount applied when 3 or more products are selected.
  - Real-time subtotal calculation after discount.
  - "Add Bundle to Cart" CTA button that enables only when 3 or more items are selected.
- **Animated Toggle Buttons:** Smooth transition of toggle buttons with "Added ✓" states.
- **Simulated Cart View:** Clicking the CTA button opens a modal simulating the cart with items, quantities, subtotal, discount, and total.
- **Mobile-Friendly Layout:** The product grid stacks vertically on smaller screens and the sidebar moves below the grid for easy access.

---

## Technologies Used

- **HTML5** for semantic markup.
- **CSS3** for styling and responsive design.
- **Vanilla JavaScript (ES6+)** for dynamic functionality and DOM manipulation.
- No frameworks or external libraries; everything is custom-coded.

---

## Folder Structure

bundle-builder
├── index.html
├── style.css
├── script.js
├── assets
│   └── Photos
│       ├── product-1.jpg
│       ├── product-2.jpg
│       ├── product-3.jpg
│       ├── product-4.jpg
│       ├── product-5.jpg
│       └── product-6.jpg



---

## How to Run

1. Clone or download the repository.
2. Open the project folder in your code editor (e.g., VSCode).
3. Open `index.html` in a modern browser.
4. (Optional) Use VSCode Live Server extension for live preview and auto-refresh.
5. Interact with the UI by selecting products, adjusting quantities, and clicking the "Add Bundle to Cart" button to view the cart modal.

---

## Currency

Prices are displayed in Indian Rupees (₹) with appropriate formatting.

---

## Deployment

The project is hosted live at:  
https://fashionwebsitees.netlify.app/

The project can also be deployed on platforms like Netlify or GitHub Pages for free hosting.


## Author

SRINU TADDI


## Acknowledgments

Design inspired by Shopify custom bundle sections and best UI/UX practices for e-commerce bundles.
