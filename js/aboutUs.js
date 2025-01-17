function onSubmit(e) {
  e.preventDefault();

  const messageSpan = document.getElementById("form-message");
  const form = event.target;
  messageSpan.textContent =
    "Ditt meddelande har skickats. Vi återkommer så snart vi kan.";
  messageSpan.classList.add("has-text-success");
  form.reset();
}
