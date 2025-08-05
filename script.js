const products = [
  { id: 1, title: "Tie-Dye Set", price: 2495.42, imgSrc: "assets/Photos/product-1.jpg" },
  { id: 2, title: "Sunburst Suit", price: 3328.42, imgSrc: "assets/Photos/product-2.jpg" },
  { id: 3, title: "Retro Red", price: 2081.25, imgSrc: "assets/Photos/product-3.jpg" },
  { id: 4, title: "Urban Combo", price: 1623.38, imgSrc: "assets/Photos/product-4.jpg" },
  { id: 5, title: "Knit Coat", price: 4157.42, imgSrc: "assets/Photos/product-5.jpg" },
  { id: 6, title: "Mono Blazer", price: 2830.50, imgSrc: "assets/Photos/product-6.jpg" }
];


const maxBundleItems = 3;
const discountPercent = 30;


const productsGrid = document.getElementById("productsGrid");
const progressText = document.getElementById("progressText");
const progressFill = document.getElementById("progressFill");
const selectedProductsList = document.getElementById("selectedProductsList");
const discountInfo = document.getElementById("discountInfo");
const subtotalInfo = document.getElementById("subtotalInfo");
const addBundleBtn = document.getElementById("addBundleBtn");
const cartModal = document.getElementById("cartModal");
const cartItemsList = document.getElementById("cartItemsList");
const cartSubtotal = document.getElementById("cartSubtotal");
const cartDiscount = document.getElementById("cartDiscount");
const cartTotal = document.getElementById("cartTotal");
const closeCartBtn = document.getElementById("closeCartBtn");

// Formatter for Indian Rupees
const rupeeFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
});

let selectedProducts = [];


function createProductCards() {
  products.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";

    const img = document.createElement("img");
    img.src = product.imgSrc;
    img.alt = product.title;

    const title = document.createElement("div");
    title.className = "product-title";
    title.textContent = product.title;

    const price = document.createElement("div");
    price.className = "product-price";
    price.textContent = rupeeFormatter.format(product.price);

    const toggleBtn = document.createElement("button");
    toggleBtn.className = "toggle-btn";
    toggleBtn.textContent = "Add to Bundle";
    toggleBtn.setAttribute("aria-pressed", "false");

    function updateToggleBtn() {
      const found = selectedProducts.find((p) => p.id === product.id);
      if (found) {
        toggleBtn.classList.add("active");
        toggleBtn.textContent = "Added ✓";
        toggleBtn.setAttribute("aria-pressed", "true");
      } else {
        toggleBtn.classList.remove("active");
        toggleBtn.textContent = "Add to Bundle";
        toggleBtn.setAttribute("aria-pressed", "false");
      }
    }
    updateToggleBtn();

    toggleBtn.addEventListener("click", () => {
      const index = selectedProducts.findIndex((p) => p.id === product.id);
      if (index === -1 && selectedProducts.length < maxBundleItems) {
        selectedProducts.push({ ...product, quantity: 1 });
      } else if (index !== -1) {
        selectedProducts.splice(index, 1);
      }
      updateToggleBtn();
      updateSidebar();
    });

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(price);
    card.appendChild(toggleBtn);

    productsGrid.appendChild(card);
  });
}

function updateSidebar() {
  progressText.textContent = `${selectedProducts.length}/${maxBundleItems} added`;
  progressFill.style.width = `${(selectedProducts.length / maxBundleItems) * 100}%`;
  progressFill.setAttribute("aria-valuenow", selectedProducts.length);

  selectedProductsList.innerHTML = "";

  selectedProducts.forEach((product) => {
    const li = document.createElement("li");
    li.className = "selected-product-item";

    const img = document.createElement("img");
    img.className = "selected-product-thumb";
    img.src = product.imgSrc;
    img.alt = product.title;

    const infoDiv = document.createElement("div");
    infoDiv.className = "selected-product-info";

    const nameDiv = document.createElement("div");
    nameDiv.className = "selected-product-name";
    nameDiv.textContent = product.title;

    const priceDiv = document.createElement("div");
    priceDiv.className = "selected-product-price";
    priceDiv.textContent = rupeeFormatter.format(product.price);

    infoDiv.appendChild(nameDiv);
    infoDiv.appendChild(priceDiv);

    const quantityStepper = document.createElement("div");
    quantityStepper.className = "quantity-stepper";

    const btnMinus = document.createElement("button");
    btnMinus.className = "stepper-btn";
    btnMinus.textContent = "-";
    btnMinus.ariaLabel = `Decrease quantity of ${product.title}`;
    btnMinus.addEventListener("click", () => {
      if (product.quantity > 1) {
        product.quantity--;
      } else {
        selectedProducts = selectedProducts.filter((p) => p.id !== product.id);
        updateProductGridToggles();
      }
      updateSidebar();
    });

    const qtyInput = document.createElement("input");
    qtyInput.type = "number";
    qtyInput.min = "1";
    qtyInput.className = "stepper-input";
    qtyInput.value = product.quantity;
    qtyInput.setAttribute("aria-label", `Quantity of ${product.title}`);
    qtyInput.addEventListener("input", () => {
      let val = parseInt(qtyInput.value);
      if (isNaN(val) || val < 1) val = 1;
      product.quantity = val;
      updateSidebar();
    });

    const btnPlus = document.createElement("button");
    btnPlus.className = "stepper-btn";
    btnPlus.textContent = "+";
    btnPlus.ariaLabel = `Increase quantity of ${product.title}`;
    btnPlus.addEventListener("click", () => {
      product.quantity++;
      updateSidebar();
    });

    quantityStepper.appendChild(btnMinus);
    quantityStepper.appendChild(qtyInput);
    quantityStepper.appendChild(btnPlus);

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "×";
    removeBtn.setAttribute("aria-label", `Remove ${product.title} from bundle`);
    removeBtn.style.cursor = "pointer";
    removeBtn.style.background = "transparent";
    removeBtn.style.border = "none";
    removeBtn.style.color = "#b53014";
    removeBtn.style.fontSize = "1.4rem";
    removeBtn.style.fontWeight = "700";
    removeBtn.addEventListener("click", () => {
      selectedProducts = selectedProducts.filter((p) => p.id !== product.id);
      updateProductGridToggles();
      updateSidebar();
    });

    li.appendChild(img);
    li.appendChild(infoDiv);
    li.appendChild(quantityStepper);
    li.appendChild(removeBtn);

    selectedProductsList.appendChild(li);
  });

  let subtotal = 0;
  selectedProducts.forEach((p) => (subtotal += p.price * p.quantity));
  const discount = selectedProducts.length >= maxBundleItems ? (discountPercent / 100) * subtotal : 0;
  const total = subtotal - discount;

  discountInfo.textContent = `Discount: ${discount > 0 ? discountPercent : 0}%`;
  subtotalInfo.textContent = `Subtotal: ${rupeeFormatter.format(total)}`;

  addBundleBtn.disabled = selectedProducts.length < maxBundleItems;
  if (!addBundleBtn.disabled) {
    addBundleBtn.classList.add("enabled");
  } else {
    addBundleBtn.classList.remove("enabled");
  }
}


function updateProductGridToggles() {
  const buttons = document.querySelectorAll(".product-card .toggle-btn");
  buttons.forEach((button) => {
    const productTitle = button.previousElementSibling.previousElementSibling.textContent;
    const selected = selectedProducts.some((p) => p.title === productTitle);
    if (selected) {
      button.classList.add("active");
      button.textContent = "Added ✓";
      button.setAttribute("aria-pressed", "true");
    } else {
      button.classList.remove("active");
      button.textContent = "Add to Bundle";
      button.setAttribute("aria-pressed", "false");
    }
  });
}


function openCartModal() {
  cartItemsList.innerHTML = "";
  selectedProducts.forEach((p) => {
    const li = document.createElement("li");
    li.textContent = `${p.title} x ${p.quantity} - ${rupeeFormatter.format(p.price * p.quantity)}`;
    cartItemsList.appendChild(li);
  });

  let subtotal = selectedProducts.reduce((sum, p) => sum + p.price * p.quantity, 0);
  let discount = selectedProducts.length >= maxBundleItems ? (discountPercent / 100) * subtotal : 0;
  let total = subtotal - discount;

  cartSubtotal.textContent = `Subtotal: ${rupeeFormatter.format(subtotal)}`;
  cartDiscount.textContent = `Discount: ${discount > 0 ? discountPercent : 0}% (-${rupeeFormatter.format(discount)})`;
  cartTotal.textContent = `Total: ${rupeeFormatter.format(total)}`;

  cartModal.classList.remove("hidden");
}


function closeCartModal() {
  cartModal.classList.add("hidden");
}


function setupEventListeners() {
  closeCartBtn.addEventListener("click", closeCartModal);
  addBundleBtn.addEventListener("click", openCartModal);
}


function init() {
  createProductCards();
  setupEventListeners();
  updateSidebar();
}

init();
