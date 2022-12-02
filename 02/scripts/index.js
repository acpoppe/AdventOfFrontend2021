let menuContainer = document.getElementById("menu-container");

function insertMenuItem(item) {
  let button = document.createElement("button");
  button.classList.add("btn", "btn-cart");
  let buttonText = document.createTextNode("Add to Cart");
  button.appendChild(buttonText);

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
}

function loadMenuItems(json) {
  json.items.map((item) => insertMenuItem(item));
}

fetch("scripts/menu.json")
  .then((response) => response.json())
  .then((json) => {
    loadMenuItems(json);
  });
