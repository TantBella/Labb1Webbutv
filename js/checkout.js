document.addEventListener("DOMContentLoaded", () => {
  const checkoutCartList = document.getElementById("checkoutCartList");
  const checkoutTotalPriceValue = document.getElementById(
    "checkoutTotalPriceValue"
  );
  const checkoutTotalPrice = document.getElementById("checkoutTotalPrice");
  const proceedToPaymentBtn = document.getElementById("proceedToPayment");

  const cart = JSON.parse(localStorage.getItem("cart")) || {};

  function updateCheckoutCart() {
    checkoutCartList.innerHTML = "";
    let totalPrice = 0;

    if (Object.keys(cart).length === 0) {
      checkoutCartList.innerHTML = "<p>Din kundvagn är tom.</p>";
      checkoutTotalPrice.style.display = "none";
      proceedToPaymentBtn.style.display = "none";
      return;
    }

    Object.values(cart).forEach((item) => {
      const listItem = document.createElement("div");
      listItem.classList.add("box");

      listItem.innerHTML = `
        <div>
          <h3>${item.name}</h3>
          <p>Pris: ${item.price} kr</p>
          <div class="quantity-controls">
            <button onclick="changeQuantity(${item.id}, -1)">-</button>
            <span>${item.quantity}</span>
            <button onclick="changeQuantity(${item.id}, 1)">+</button>
            <button onclick="removeItem(${
              item.id
            })" class="button is-danger remove-btn">Ta bort</button>
          </div>
          <p>Total: ${(item.price * item.quantity).toFixed(2)} kr</p>
        </div>
      `;

      checkoutCartList.appendChild(listItem);
      totalPrice += item.price * item.quantity;
    });

    checkoutTotalPriceValue.textContent = totalPrice.toFixed(2);
    checkoutTotalPrice.style.display = "block";
    proceedToPaymentBtn.style.display = "block";
  }

  window.changeQuantity = (id, change) => {
    if (cart[id]) {
      cart[id].quantity += change;
      if (cart[id].quantity <= 0) {
        delete cart[id];
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCheckoutCart();
    }
  };

  window.removeItem = (id) => {
    delete cart[id];
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCheckoutCart();
  };

  updateCheckoutCart();

  proceedToPaymentBtn.addEventListener("click", () => {
    localStorage.removeItem("cart");

    checkoutCartList.innerHTML = `
      <div class="box">
        <h2>Betalning godkänd!</h2>
        <p>Tack för ditt köp! Din beställning är nu behandlad.</p>
        <p>Välkommen åter!</p>
      </div>
    `;
    checkoutTotalPriceValue.textContent = "0";
    checkoutTotalPrice.style.display = "none";
    proceedToPaymentBtn.style.display = "none";
  });
});
