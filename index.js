import { menuArray } from "./data.js";

const cartItems = document.getElementById("render-cart-items");
const hidden = document.getElementById("hidden");
const totalPrice = document.getElementById("total-price");
const completeBtn = document.getElementById("complete-btn");
const enterCard = document.getElementById("enter-card");
const thanksMessage = document.getElementById("thanks-message");
const checkout = document.getElementById("checkout");
const orderForm = document.getElementById("flex-form");
let addedToCartItems = [];

// add to cart and remove from cart listeners
document.addEventListener("click", function (e) {
  if (e.target.dataset.addItem) {
    addToCart(e.target.dataset.addItem);
    hidden.style.display = "block";
  } else if (e.target.dataset.remove) {
    removeItemFromCart(e.target.dataset.remove);
  }
});

// complete order button listener
completeBtn.addEventListener("click", function () {
  enterCard.classList.remove("hidden");
});

// final form pay button listener and message render with name
orderForm.addEventListener("submit", function (e) {
  const fullName = document.getElementById("full-name");
  e.preventDefault();
  thanksMessage.style.display = "flex";
  enterCard.style.display = "none";
  checkout.style.display = "none";
  thanksMessage.innerHTML = `
    <p class="order-message">Thanks ${fullName.value}, Your order is on its way!</p>`;
});

function getMenu() {
  let menu = ``;

  menuArray.forEach(function (item) {
    menu += `
    <div class="item-menu">
     <div class="item-icon">${item.emoji}</div>
      <div class="item-info">
       <div class="item-title">${item.name}</div>
       <div class="item-ingredients">${item.ingredients}</div>
       <div class="item-price">$${item.price}</div>
    </div>
    <button id="add-item" class="add-item" data-add-item="${item.id}">+</button>
  </div>
`;
  });
  return menu;
}

// render menu in html
function renderMenuHtml() {
  document.getElementById("render-menu").innerHTML = getMenu();
}

renderMenuHtml();

// add items to cart function
function addToCart(foodId) {
  const targetFoodObj = menuArray.filter(function (food) {
    return food.id == foodId;
  })[0];
  addedToCartItems.push(targetFoodObj);
  renderCart();
}

// render cart items in html
function renderCart() {
  let shoppingCart = "";
  addedToCartItems.forEach(function (item, index) {
    shoppingCart += `
       <div class="ordered-item">
           <p class="order-font-size">${item.name}</p>
           <button data-remove='${index}' class="remove-item" type="button">remove</button>
           <p class="item-price order-font-size">$${item.price}</p>
        </div> 
        `;
  });
  calcTotalPrice();
  cartItems.innerHTML = shoppingCart;
}

// sum of prices added to cart function
function calcTotalPrice() {
  let prices = 0;
  addedToCartItems.forEach(function (item) {
    prices += item.price;
  });
  totalPrice.textContent = "$ " + prices;
}

// removing items from cart function
function removeItemFromCart(ItemIndex) {
  addedToCartItems.splice(ItemIndex, 1);
  if (addedToCartItems.length === 0) {
    hidden.style.display = "none";
  }
  renderCart();
}
