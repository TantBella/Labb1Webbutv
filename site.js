const services = [
  {
    name: "Individuell hundträning",
    info: "Personligt anpassad träning för att möta din hunds unika behov.",
  },
  {
    name: "Beteenderådgivning",
    info: "Hjälp med problem som aggression, rädsla eller överdriven skällning.",
  },
  {
    name: "Valpträning",
    info: "Grundläggande träning och socialisering för din valp.",
  },
  {
    name: "Mental aktivering",
    info: "Vi går igenom varför, hur, var och när du bör aktivera din hund med de speciella övningar som mental aktivering innebär.",
  },
];

const servicesContainer = document.getElementById("servicesContainer");

services.forEach((service) => {
  const serviceElement = document.createElement("div");
  serviceElement.classList.add("service");

  serviceElement.innerHTML = `
    <h2>${service.name}</h2>
    <p>${service.info}</p>
  `;

  servicesContainer.appendChild(serviceElement);
});

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

// Hämta behållare
const productsContainer = document.getElementById("productsContainer");

// Loopar genom varje kategori och dess produkter
Object.keys(products).forEach((category) => {
  const categoryTitle = document.createElement("h2");
  categoryTitle.textContent = category === "dogcandy" ? "Hundgodis" : "Hundleksaker";
  productsContainer.appendChild(categoryTitle);

  products[category].forEach((product) => {
    const productElement = document.createElement("div");
    productElement.classList.add("product");

    productElement.innerHTML = `
      <img src="${product.image}" alt="${product.productname}" />
      <h3>${product.productname}</h3>
      <p>${product.productinfo}</p>
      <p>Pris: ${product.price} kr</p>
    `;

    productsContainer.appendChild(productElement);
  });
});
