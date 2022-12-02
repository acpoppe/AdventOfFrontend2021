let menuContainer = document.getElementById("menu-container");
let emptyCartMsg = document.getElementById("cart-empty-msg");
let cartItemsSection = document.getElementById("cart-items");
let cartTotalSection = document.getElementById("cart-total");
let menuItems = [];
let cartItems = [];

function getItemWithNameFromMenu(name) {
  return menuItems.find((item) => item.name === name);
}

function getItemFromCart(item) {
  return cartItems.find((cartItem) => cartItem.itemDetails.name === item.name);
}

function addToCart(item) {
  cartItems.push({ itemDetails: item, quantity: 1 });
}

function removeCartItem(item) {
  cartItems.forEach((cartItem, index) => {
    if (item.name === cartItem.itemDetails.name) {
      cartItems.splice(index, 1);
    }
  });
}

function addToCartBtnHandler(e) {
  e.preventDefault();

  let itemName = e.target.parentNode.children[0].innerText;
  let item = getItemWithNameFromMenu(itemName);
  if (getItemFromCart(item) === undefined) {
    addToCart(item);
  } else {
    removeCartItem(item);
  }
  updateCart();
}

function updateCart() {
  if (cartItems.length > 0) {
    emptyCartMsg.style.visibility = "hidden";
    // Render cart items
    // Render cart total
    return;
  }
  emptyCartMsg.style.visibility = "visible";
  cartItemsSection.innerHTML = "";
  cartTotalSection.innerHTML = "";
}

function insertMenuItem(item) {
  let button = document.createElement("button");
  button.classList.add("btn", "btn-cart");
  let buttonText = document.createTextNode("Add to Cart");
  button.appendChild(buttonText);
  button.addEventListener("click", (e) => addToCartBtnHandler(e));

  let price = document.createElement("h3");
  let priceText = document.createTextNode("$" + item.price);
  price.appendChild(priceText);

  let name = document.createElement("h4");
  let nameText = document.createTextNode(item.name);
  name.appendChild(nameText);

  let itemInfo = document.createElement("div");
  itemInfo.classList.add("menu-item-info");
  itemInfo.appendChild(name);
  itemInfo.appendChild(price);
  itemInfo.appendChild(button);

  let img = document.createElement("img");
  img.src = "images/" + item.imgName;
  img.alt = item.name;
  img.classList.add("menu-item-img");

  let itemWrapper = document.createElement("div");
  itemWrapper.classList.add("menu-item", item.bgColor);
  itemWrapper.appendChild(img);
  itemWrapper.appendChild(itemInfo);

  menuContainer.appendChild(itemWrapper);

  menuItems.push(item);
}

function loadMenuItems(json) {
  json.items.map((item) => insertMenuItem(item));
}

fetch("scripts/menu.json")
  .then((response) => response.json())
  .then((json) => {
    loadMenuItems(json);
  });

//         <div class="item">
//           <div class="cart-item-image-block">
//             <img
//               src="images/plate__french-fries.png"
//               class="cart-item-img"
//               alt="French Fries"
//             />
//             <h3 class="quantity-image-count">2</h3>
//           </div>
//           <div class="cart-item-info">
//             <h4>French Fries</h4>
//             <h3 class="subtitle">$2.23</h3>
//             <div class="quantity-and-total-row">
//               <button class="btn btn-less">
//                 <img src="images/chevron.svg" alt="Less" />
//               </button>
//               <h3 class="selector-inner-quantity">2</h3>
//               <button class="btn btn-more">
//                 <img class="flipped" src="images/chevron.svg" alt="More" />
//               </button>
//               <h3>$4.46</h3>
//             </div>
//           </div>
//         </div>
//         <div class="border thin"></div>
//         <div class="item">
//           <div class="cart-item-image-block">
//             <img
//               src="images/plate__spaghetti-meat-sauce.png"
//               class="cart-item-img"
//               alt="Spaghetti with Sauce"
//             />
//             <h3 class="quantity-image-count">2</h3>
//           </div>
//           <div class="cart-item-info">
//             <h4>Spaghetti with Sauce</h4>
//             <h3 class="subtitle">$7.82</h3>
//             <div class="quantity-and-total-row">
//               <button class="btn btn-less">
//                 <img src="images/chevron.svg" alt="Less" />
//               </button>
//               <h3 class="selector-inner-quantity">2</h3>
//               <button class="btn btn-more">
//                 <img class="flipped" src="images/chevron.svg" alt="More" />
//               </button>
//               <h3>$15.64</h3>
//             </div>
//           </div>
//         </div>
//         <div class="border thick"></div>
//         <div class="total-column">
//           <h3 class="label">Subtotal:</h4>
//           <h3 class="label">Tax:</h4>
//           <h3 class="label">Total:</h4>
//         </div>
//         <div class="total-column">
//           <h3>$20.10</h4>
//           <h3>$1.96</h4>
//           <h3 class="purple-total">$30.12</h4>
//         </div>
