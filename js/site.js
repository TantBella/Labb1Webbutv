// Tjänster och kurser:

const services = {
  Kurser: [
    {
      name: "Individuell hundträning",
      info: "Personligt anpassad träning för att möta din hunds unika behov.",
      price: 1650,
    },
    {
      name: "Beteenderådgivning",
      info: "Hjälp med problem som aggression, rädsla eller överdriven skällning.",
      price: 1850,
    },
    {
      name: "Valpträning",
      info: "Grundläggande träning och socialisering för din valp.",
      price: 850,
    },
    {
      name: "Agility 1",
      info: "Vi tränar kontakt, balans & koordination med roliga övningar. På denna kursen börjar vi också lära in hopphinder, däcket, långhoppet, tunnlar och slalom.",
      price: 1800,
    },
    {
      name: "Nosework 1",
      info: "Träning som utmanar både dig och din hund, ger er mer samarbete och glädje tillsammans.",
      price: 1750,
    },
    {
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
      productname: "4Dogs Belöningsgodis Hjort ca 100 g",
      productinfo: "Torkat hundgodis utan tillsatser, ursprung EU",
      price: 49,
      image:
        "https://www.4dogs.se/pub_images/large/Hundgodis-beloningsgodis-torkade-kuber-av-hjort-100-gram.jpg?timestamp=1708441176",
    },
    {
      productname: "Trixie Premio Leverpaté belöningsgodis på tub 110 g",
      productinfo: "Utan tillsatt socker, glutenfri",
      price: 49,
      image:
        "https://www.4dogs.se/pub_images/large/Trixie-leverpate-pa-tub-beloningsgodis-for-hund-110-gram.jpg?timestamp=1668428248",
    },
    {
      productname: "2pets belöningsgodis Kyckling Mini - 400 g",
      productinfo: "Av färska råvaror, låg fetthalt",
      price: 159,
      image:
        "https://www.4dogs.se/pub_images/large/2pets-hundgodis-kuber-mini-av-kyckling-400-gram-beloningsgodis.jpg?timestamp=1702300422",
    },
    {
      productname: "Trixie belöningsgodis Vegan cubes 100 g",
      productinfo: "Veganskt hundgodis med frukt och vegetabilier",
      price: 45,
      image:
        "https://www.4dogs.se/pub_images/large/Trixie-vegan-cubes-veganskt-hundgodis-med-frukt-och-gronsaker-100-g.jpg?timestamp=1736437727",
    },
  ],
  Hundleksaker: [
    {
      productname: "Bistos Inca med fårskinn och gallerboll - orange",
      productinfo: "Svensktillverkad, ca 34 cm lång med expanderhandtag",
      price: 349,
      image:
        "https://www.4dogs.se/pub_images/large/Bistos-Inca-hundleksak-med-farskinn-och-gallerboll-orange.JPG?timestamp=1723734048",
    },
    {
      productname:
        "Chuckit! Flying Squirrel Medium 23 cm - flytande hundleksak",
      productinfo: "Diameter inkl. fötter 34 cm",
      price: 199,
      image:
        "https://www.4dogs.se/pub_images/large/CHUC0511300__2.jpg?timestamp=1702482877",
    },
    {
      productname: "Nina Ottosson Dog Treat Maze - Small",
      productinfo: "Svårighetsgrad 2",
      price: 189,
      image: "https://www.4dogs.se/pub_images/large/Dog---maze.jpg",
    },
    {
      productname: "Elsa Elefant plysch - hundleksak",
      productinfo: "22x8x14 cm, utan ljud",
      price: 59,
      image:
        "https://www.4dogs.se/pub_images/large/Hundleksak-elefant-gra-plysch-tpr-inget-pipljud-22-cm.jpg?timestamp=1722121330",
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

const createCard = ({ name, info, price, image }, type = "item") => {
  const card = createElement("div", ["box", `${type}-box`]);
  card.innerHTML = `
    ${image ? `<img src="${image}" alt="${name}" class="${type}-image" />` : ""}
    <h3 class="${type}-title">${name}</h3>
    <p class="${type}-info">${info}</p>
    <p><strong>Pris:</strong> ${price} kr</p>
    <button id="cartBtn" class="button is-link is-fullwidth mx-2 my-4"
      onclick="addToCart('${name}', ${price})">Lägg till i kundvagn</button>
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
  name: service.name,
  info: service.info,
  price: service.price,
}));

const productsData = Object.entries(products).map(([category, items]) => ({
  category,
  items: items.map((product) => ({
    name: product.productname,
    info: product.productinfo,
    price: product.price,
    image: product.image,
  })),
}));

renderSection("servicesContainer", "Kurser", servicesData, "service");

productsData.forEach(({ category, items }) => {
  renderSection("productsContainer", category, items, "product");
});

// Kundvagnen:
const cart = [];
const cartList = document.getElementById("cartList");
const totalPriceElement = document.getElementById("totalPrice");
const shoppingCartBtn = document.getElementById("shoppingCartBtn");
const cartPopup = document.getElementById("cartPopup");
const closeCartBtn = document.getElementById("closeCartBtn");
const cartCount = document.getElementById("cartCount");
const goToCheckoutBtn = document.getElementById("goToCheckoutBtn");
const emptyCartMessage = document.getElementById("emptyCartMessage");
const totalPriceContainer = document.getElementById("totalPriceContainer");

function updateCart() {
  cartList.innerHTML = "";
  let totalPrice = 0;

  cart.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${item.name} - ${item.price} kr`;
    cartList.appendChild(listItem);
    totalPrice += item.price;
  });

  cartCount.textContent = cart.length;

  if (cart.length === 0) {
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

document.addEventListener("DOMContentLoaded", updateCart);

function addToCart(name, price) {
  cart.push({ name, price });
  updateCart();
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
