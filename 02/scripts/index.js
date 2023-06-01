let menuContainer = document.getElementById("menu-container");
let emptyCartMsg = document.getElementById("cart-empty-msg");
let cartItemsSection = document.getElementById("cart-items");
let cartTotalSection = document.getElementById("cart-total");
let menuItems = [];
let cartItems = [];

function getSubtotal() {
  let total = 0;
  cartItems.forEach((item) => {
    total += item.itemDetails.price * item.quantity;
  });
  return total;
}

function getTax(subtotal) {
  return subtotal * 0.0975;
}

function getItemWithNameFromMenu(name) {
  return menuItems.find((item) => item.name === name);
}

function getItemWithNameFromCart(itemName) {
  return cartItems.find((item) => item.itemDetails.name === itemName);
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

function removeCartObject(item) {
  cartItems.forEach((cartItem, index) => {
    if (item.itemDetails.name === cartItem.itemDetails.name) {
      cartItems.splice(index, 1);
    }
  });
}

function increaseQuantityBtnHandler(e) {
  e.preventDefault();
  let item;
  if (e.target.type === "submit") {
    item = getItemWithNameFromCart(
      e.target.parentNode.parentNode.children[0].innerText
    );
  } else {
    item = getItemWithNameFromCart(
      e.target.parentNode.parentNode.parentNode.children[0].innerText
    );
  }
  if (item === undefined) {
    console.log("Item not found");
    return;
  }
  item.quantity += 1;
  updateCart();
}

function decreaseQuantityBtnHandler(e) {
  e.preventDefault();
  let item;
  if (e.target.type === "submit") {
    item = getItemWithNameFromCart(
      e.target.parentNode.parentNode.children[0].innerText
    );
  } else {
    item = getItemWithNameFromCart(
      e.target.parentNode.parentNode.parentNode.children[0].innerText
    );
  }
  if (item === undefined) {
    console.log("Item not found");
    return;
  }
  item.quantity -= 1;
  if (item.quantity === 0) {
    removeCartObject(item);
  }
  updateCart();
}

function addToCartBtnHandler(e) {
  e.preventDefault();

  let itemName = e.target.parentNode.children[0].innerText;
  let item = getItemWithNameFromMenu(itemName);
  if (getItemWithNameFromCart(item.name) === undefined) {
    addToCart(item);
  } else {
    removeCartItem(item);
  }
  updateCart();
}

function renderCartItem(cartItem) {
  let img = document.createElement("img");
  img.src = "images/" + cartItem.itemDetails.imgName;
  img.alt = cartItem.itemDetails.name;
  img.classList.add("cart-item-img");

  let quantityImageCount = document.createElement("h3");
  quantityImageCount.classList.add("quantity-image-count");
  quantityImageCount.innerText = cartItem.quantity;

  let imageBlock = document.createElement("div");
  imageBlock.classList.add("cart-item-image-block");
  imageBlock.appendChild(img);
  imageBlock.appendChild(quantityImageCount);

  let leftChevron = document.createElement("img");
  leftChevron.src = "images/chevron.svg";
  leftChevron.alt = "Less";
  let rightChevron = document.createElement("img");
  rightChevron.src = "images/chevron.svg";
  rightChevron.alt = "More";
  rightChevron.classList.add("flipped");

  let lessBtn = document.createElement("button");
  lessBtn.classList.add("btn", "btn-less");
  lessBtn.appendChild(leftChevron);
  lessBtn.addEventListener("click", decreaseQuantityBtnHandler);
  let moreBtn = document.createElement("button");
  moreBtn.classList.add("btn", "btn-less");
  moreBtn.appendChild(rightChevron);
  moreBtn.addEventListener("click", increaseQuantityBtnHandler);

  let innerQuantity = document.createElement("h3");
  innerQuantity.classList.add("selector-inner-quantity");
  innerQuantity.innerText = cartItem.quantity;

  let priceTotal = document.createElement("h3");
  priceTotal.innerText =
    "$" + (cartItem.itemDetails.price * cartItem.quantity).toFixed(2);

  let quantityAndTotalRow = document.createElement("div");
  quantityAndTotalRow.classList.add("quantity-and-total-row");
  quantityAndTotalRow.appendChild(lessBtn);
  quantityAndTotalRow.appendChild(innerQuantity);
  quantityAndTotalRow.appendChild(moreBtn);
  quantityAndTotalRow.appendChild(priceTotal);

  let itemPrice = document.createElement("h3");
  itemPrice.classList.add("subtitle");
  itemPrice.innerText = "$" + cartItem.itemDetails.price;

  let itemName = document.createElement("h4");
  itemName.innerText = cartItem.itemDetails.name;

  let itemInfo = document.createElement("div");
  itemInfo.classList.add("cart-item-info");
  itemInfo.appendChild(itemName);
  itemInfo.appendChild(itemPrice);
  itemInfo.appendChild(quantityAndTotalRow);

  let itemWrapper = document.createElement("div");
  itemWrapper.classList.add("item");
  itemWrapper.appendChild(imageBlock);
  itemWrapper.appendChild(itemInfo);

  cartItemsSection.appendChild(itemWrapper);
}

function renderCartTotal() {
  let subtotalValue = getSubtotal();
  let taxValue = getTax(subtotalValue);
  let totalValue = subtotalValue + taxValue;

  let subtotalLabel = document.createElement("h3");
  subtotalLabel.classList.add("label");
  subtotalLabel.innerText = "Subtotal:";
  let taxLabel = document.createElement("h3");
  taxLabel.classList.add("label");
  taxLabel.innerText = "Tax:";
  let totalLabel = document.createElement("h3");
  totalLabel.classList.add("label");
  totalLabel.innerText = "Total:";
  let labelColumn = document.createElement("div");
  labelColumn.classList.add("total-column");
  labelColumn.appendChild(subtotalLabel);
  labelColumn.appendChild(taxLabel);
  labelColumn.appendChild(totalLabel);

  let subtotal = document.createElement("h3");
  subtotal.innerText = "$" + subtotalValue.toFixed(2);
  let tax = document.createElement("h3");
  tax.innerText = "$" + taxValue.toFixed(2);
  let total = document.createElement("h3");
  total.classList.add("purple-total");
  total.innerText = "$" + totalValue.toFixed(2);
  let totalsColumn = document.createElement("div");
  totalsColumn.classList.add("total-column");
  totalsColumn.appendChild(subtotal);
  totalsColumn.appendChild(tax);
  totalsColumn.appendChild(total);

  cartTotalSection.appendChild(labelColumn);
  cartTotalSection.appendChild(totalsColumn);
}

function updateCart() {
  if (cartItems.length > 0) {
    emptyCartMsg.style.visibility = "hidden";
    cartItemsSection.innerHTML = "";
    cartTotalSection.innerHTML = "";
    cartItems.map((cartItem, index) => {
      renderCartItem(cartItem);
      if (index !== cartItems.length - 1) {
        let border = document.createElement("div");
        border.classList.add("border", "thin");
        cartItemsSection.appendChild(border);
      }
    });
    let border = document.createElement("div");
    border.classList.add("border", "thick");
    cartItemsSection.appendChild(border);
    renderCartTotal();
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
