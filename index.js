document.addEventListener("DOMContentLoaded", () => {
  const $navbarBurgers = Array.prototype.slice.call(
    document.querySelectorAll(".navbar-burger"),
    0
  );

  $navbarBurgers.forEach((el) => {
    el.addEventListener("click", () => {
      const target = el.dataset.target;
      const $target = document.getElementById(target);

      el.classList.toggle("is-active");
      $target.classList.toggle("is-active");
    });
  });
});

const reviews = [
  {
    name: "Anna och Oscar",
    info: "Tack vare hjälpen har min hund blivit lugnare och vi har en mycket bättre relation!",
  },
  {
    name: "Maria och Luna",
    info: "Fantastisk träning! Rekommenderas varmt till alla hundägare.",
  },
  {
    name: "Emma och Charlie",
    info: "Min hund hade stora problem med att vara ensam hemma och blev väldigt orolig. Tack vare hundpsykologens vägledning och stöd har vi nu en mycket lugnare vardag. Rekommenderas varmt!",
  },
  {
    name: "Eric och Simba",
    info: "Vår äldre hund började plötsligt visa stressbeteenden, men tack vare Ewa hittade vi orsaken och lösningen. Nu mår både vi och vår hund mycket bättre.",
  },
];

const reviewsContainer = document.getElementById("reviewsContainer");

reviews.forEach((review) => {
  const reviewsElement = document.createElement("div");
  reviewsElement.classList.add("reviews");

  reviewsElement.innerHTML = `
     <div class="box mb-4">

        <p>${review.info}</p>
        <cite>- ${review.name}</cite>
     </div>
    `;

  reviewsContainer.appendChild(reviewsElement);
});
