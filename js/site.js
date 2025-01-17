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

const servicesContainer = document.getElementById("servicesContainer");

const title = document.createElement("h2");
title.textContent = "Kurser";
title.classList.add("title", "is-4", "has-text-centered");
servicesContainer.appendChild(title);

const columns = document.createElement("div");
columns.classList.add("columns", "is-multiline");

services.Kurser.forEach((service) => {
  const serviceElement = document.createElement("div");
  serviceElement.classList.add("column", "is-one-third");

  serviceElement.innerHTML = `
    <div class="box service-box">
      <h3 class="service-title">${service.name}</h3>
      <p class="service-info">${service.info}</p>
        <p><strong>Pris:</strong> ${service.price} kr</p>
        <button id="cartBtn" class="button is-link is-fullwidth mx-2 my-4" onclick="addToCart('${service.name}', ${service.price})">Lägg till i kundvagn</button>
    </div>
  `;

  columns.appendChild(serviceElement);
});

servicesContainer.appendChild(columns);

const products = {
  dogcandy: [
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
  dogtoys: [
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

const productsContainer = document.getElementById("productsContainer");

Object.keys(products).forEach((category) => {
  const categoryTitle = document.createElement("h2");
  categoryTitle.textContent =
    category === "dogcandy" ? "Hundgodis" : "Hundleksaker";
  categoryTitle.classList.add("title", "is-4", "m-4", "has-text-centered");
  productsContainer.appendChild(categoryTitle);

  const columns = document.createElement("div");
  columns.classList.add("columns", "is-multiline");

  products[category].forEach((product) => {
    const productElement = document.createElement("div");
    productElement.classList.add("column", "is-one-third");

    productElement.innerHTML = `
      <div class="box product-box">
        <img src="${product.image}" alt="${product.productname}" class="product-image" />
        <h3 class="product-title">${product.productname}</h3>
        <p class="product-info">${product.productinfo}</p>
        <p><strong>Pris:</strong> ${product.price} kr</p>
          <button    id="cartBtn"class="button is-link is-fullwidth mx-2 my-4" onclick="addToCart('${product.productname}', ${product.price})">Lägg till i kundvagn</button>

      </div>
    `;

    columns.appendChild(productElement);
  });

  productsContainer.appendChild(columns);
});

const cart = [];
const cartList = document.getElementById("cartList");
const totalPriceElement = document.getElementById("totalPrice");
const cartBtn = document.getElementById("cartBtn");
const cartModal = document.getElementById("cartModal");
const closeCartBtn = document.getElementById("closeCartBtn");

function updateCart() {
  cartList.innerHTML = "";
  let totalPrice = 0;
  cart.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${item.name} - ${item.price} kr`;
    cartList.appendChild(listItem);
    totalPrice += item.price;
  });
  totalPriceElement.textContent = totalPrice;
}

function addToCart(name, price) {
  cart.push({ name, price });
  updateCart();
}

cartBtn.addEventListener("click", () => {
  cartModal.classList.add("is-active");
});

closeCartBtn.addEventListener("click", () => {
  cartModal.classList.remove("is-active");
});

cartModal.addEventListener("click", (e) => {
  if (e.target === cartModal) {
    cartModal.classList.remove("is-active");
  }
});
