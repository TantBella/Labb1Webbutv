// Tjänster och kurser:

const services = {
  Kurser: [
    {
      id: 1,
      name: "Individuell hundträning",
      info: "Personligt anpassad träning för att möta din hunds unika behov.",
      price: 1650,
    },
    {
      id: 2,
      name: "Beteenderådgivning",
      info: "Hjälp med problem som aggression, rädsla eller överdriven skällning.",
      price: 1850,
    },
    {
      id: 3,
      name: "Valpträning",
      info: "Grundläggande träning och socialisering för din valp.",
      price: 850,
    },
    {
      id: 5,
      name: "Agility 1",
      info: "Vi tränar kontakt, balans & koordination med roliga övningar. På denna kursen börjar vi också lära in hopphinder, däcket, långhoppet, tunnlar och slalom.",
      price: 1800,
    },
    {
      id: 6,
      name: "Nosework 1",
      info: "Träning som utmanar både dig och din hund, ger er mer samarbete och glädje tillsammans.",
      price: 1750,
    },
    {
      id: 7,
      name: "Mental aktivering",
      info: "Vi går igenom varför, hur, var och när du bör aktivera din hund med de speciella övningar som mental aktivering innebär.",
      price: 1650,
    },
  ],
};

// Olika produkter:

const products = {
  Hundgodis: [
    {
      id: 11,
      name: "4Dogs Belöningsgodis Hjort ca 100 g",
      info: "Torkat hundgodis utan tillsatser, ursprung EU",
      price: 49,
      image: "../images/product_images/candy1.jpg",
    },
    {
      id: 12,
      name: "Trixie Premio Leverpaté belöningsgodis på tub 110 g",
      info: "Utan tillsatt socker, glutenfri",
      price: 49,
      image: "../images/product_images/candy2.jpg",
    },
    {
      id: 13,
      name: "2pets belöningsgodis Kyckling Mini - 400 g",
      info: "Av färska råvaror, låg fetthalt",
      price: 159,
      image: "../images/product_images/candy3.jpg",
    },
    {
      id: 14,
      name: "Trixie belöningsgodis Vegan cubes 100 g",
      info: "Veganskt hundgodis med frukt och vegetabilier",
      price: 45,
      image: "../images/product_images/candy4.jpg",
    },
  ],
  Hundleksaker: [
    {
      id: 21,
      name: "Bistos Inca med fårskinn och gallerboll - orange",
      info: "Svensktillverkad, ca 34 cm lång med expanderhandtag",
      price: 349,
      image: "../images/product_images/toys1.jpg",
    },
    {
      id: 22,
      name: "Chuckit! Flying Squirrel Medium 23 cm - flytande hundleksak",
      info: "Diameter inkl. fötter 34 cm",
      price: 199,
      image: "../images/product_images/toys2.jpg",
    },
    {
      id: 23,
      name: "Nina Ottosson Dog Treat Maze - Small",
      info: "Svårighetsgrad 2",
      price: 189,
      image: "../images/product_images/toys3.jpg",
    },
    {
      id: 24,
      name: "Elsa Elefant plysch - hundleksak",
      info: "22x8x14 cm, utan ljud",
      price: 59,
      image: "../images/product_images/toys4.jpg",
    },
  ],
};

// Funktioner för att rendera kurser och produkter:

const createElement = (tag, classes = [], content = "", attributes = {}) => {
  const element = document.createElement(tag);
  if (classes.length) element.classList.add(...classes);
  if (content) element.textContent = content;
  Object.entries(attributes).forEach(([key, value]) =>
    element.setAttribute(key, value)
  );
  return element;
};

const createCard = (item, type = "item") => {
  const { id, name, info, price, image } = item;
  const card = createElement("div", ["box", `${type}-box`]);

  card.innerHTML = `
  <div class="p-2">
    ${image ? `<img src="${image}" alt="${name}" class="${type}-image" />` : ""}

    <h3 class="${type}-title">${name}</h3>
    <p class="${type}-info">${info}</p>
    <p><strong>Pris:</strong> ${price} kr</p> </div>

<button id="${type}-cartBtn-${id}" class="button is-fullwidth cartBtn" onclick="addToCart(${id}, ${price}, '${type}')">Lägg till i kundvagn</button>
  `;
  return card;
};

const renderSection = (containerId, titleText, items, type = "item") => {
  const container = document.getElementById(containerId);

  const title = createElement(
    "h2",
    ["title", "is-4", "has-text-centered"],
    titleText
  );
  container.appendChild(title);

  const columns = createElement("div", ["columns", "is-multiline"]);

  items.forEach((item) => {
    const column = createElement("div", ["column", "is-one-third"]);
    column.appendChild(createCard(item, type));
    columns.appendChild(column);
  });

  container.appendChild(columns);
};

const servicesData = services.Kurser.map((service) => ({
  id: service.id,
  name: service.name,
  info: service.info,
  price: service.price,
  image: null,
}));

const productsData = Object.entries(products).map(([category, items]) => ({
  category,
  items: items.map((product) => ({
    id: product.id,
    name: product.name,
    info: product.info,
    price: product.price,
    image: product.image,
  })),
}));

renderSection("servicesContainer", "Kurser", servicesData, "service");

productsData.forEach(({ category, items }) => {
  renderSection("productsContainer", category, items, "product");
});

// Kundvagnen:
const cartList = document.getElementById("cartList");
const totalPriceElement = document.getElementById("totalPrice");
const shoppingCartBtn = document.getElementById("shoppingCartBtn");
const cartPopup = document.getElementById("cartPopup");
const closeCartBtn = document.getElementById("closeCartBtn");
const cartCount = document.getElementById("cartCount");
const goToCheckoutBtn = document.getElementById("goToCheckoutBtn");
const emptyCartMessage = document.getElementById("emptyCartMessage");
const totalPriceContainer = document.getElementById("totalPriceContainer");

const savedCart = JSON.parse(localStorage.getItem("cart")) || {};
const cart = { ...savedCart };

updateCart();

function updateCart() {
  cartList.innerHTML = "";
  let totalPrice = 0;
  let totalItems = 0;

  Object.values(cart).forEach((item) => {
    const listItem = document.createElement("li");

    listItem.innerHTML = `
  <span>${item.name}</span>
  <span>${item.price} kr/st</span>
  <div>
    <button onclick="changeQuantity(${item.id}, -1, event)">-</button>
    <span>${item.quantity}</span>
    <button onclick="changeQuantity(${item.id}, 1, event)">+</button>
  </div>
  <span>${item.price * item.quantity} kr</span>
`;

    cartList.appendChild(listItem);
    totalPrice += item.price * item.quantity;
    totalItems += item.quantity;
  });

  if (cartCount) {
    cartCount.textContent = totalItems;
  }

  if (Object.keys(cart).length === 0) {
    emptyCartMessage.style.display = "block";
    goToCheckoutBtn.style.display = "none";
    totalPriceContainer.style.display = "none";
  } else {
    emptyCartMessage.style.display = "none";
    goToCheckoutBtn.style.display = "inline-block";
    totalPriceContainer.style.display = "block";
    totalPriceElement.textContent = totalPrice;
  }
}

function addToCart(id, price, type) {
  const product = [...services.Kurser, ...Object.values(products).flat()].find(
    (item) => item.id === id
  );

  if (product) {
    if (cart[id]) {
      cart[id].quantity += 1;
    } else {
      cart[id] = {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
      };
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartButton(id);
    updateCart();
  }
}

function changeQuantity(id, change) {
  event.stopPropagation();

  if (cart[id]) {
    cart[id].quantity += change;
    if (cart[id].quantity <= 0) {
      delete cart[id];
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartButton(id);
    updateCart();
  }
}

function updateCartButton(id) {
  const button = document.querySelector(
    `#service-cartBtn-${id}, #product-cartBtn-${id}`
  );
  if (button) {
    const itemCount = cart[id] ? cart[id].quantity : 0;
    button.textContent =
      itemCount > 0
        ? `${itemCount} stycken i kundvagnen`
        : "Lägg till i kundvagn";
  } else {
    console.error(`Button with ID cartBtn-${id} not found.`);
  }
}

shoppingCartBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  cartPopup.classList.toggle("is-active");
});

closeCartBtn.addEventListener("click", () => {
  cartPopup.classList.remove("is-active");
});

document.addEventListener("click", (e) => {
  if (!cartPopup.contains(e.target) && e.target !== shoppingCartBtn) {
    cartPopup.classList.remove("is-active");
  }
});
