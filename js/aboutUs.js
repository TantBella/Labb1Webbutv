function onSubmit(e) {
  e.preventDefault();

  const messageSpan = document.getElementById("form-message");
  const form = event.target;
  messageSpan.textContent =
    "Ditt meddelande har skickats. Vi återkommer så snart vi kan.";
  messageSpan.classList.add("has-text-success");
  form.reset();
}

// document.addEventListener("DOMContentLoaded", () => {
//   const iframeContainer = document.getElementById("iframeContainer");

//   const isMobile = window.matchMedia("(max-width: 768px)").matches;

//   const iframe = document.createElement("iframe");
//   iframe.style.border = "0";
//   iframe.allowFullscreen = true;
//   iframe.loading = "lazy";
//   iframe.referrerPolicy = "no-referrer-when-downgrade";

//   if (isMobile) {
//     iframe.src =
//       "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1157.5632866847143!2d12.018538383164097!3d57.852579491925006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46455e340e7fa70d%3A0xb37dd06a0a3b7df6!2sTransformatorv%C3%A4gen%2C%20445%2034%20Ale!5e0!3m2!1ssv!2sse!4v1737639834102!5m2!1ssv!2sse";
//     iframe.width = "300";
//     iframe.height = "200";
//   } else {
//     iframe.src =
//       "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1157.5632866847143!2d12.018538383164097!3d57.852579491925006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46455e340e7fa70d%3A0xb37dd06a0a3b7df6!2sTransformatorv%C3%A4gen%2C%20445%2034%20Ale!5e0!3m2!1ssv!2sse!4v1737639834102!5m2!1ssv!2sse";
//     iframe.width = "500";
//     iframe.height = "400";
//   }

//   iframeContainer.appendChild(iframe);
// });

const mediaQuery = window.matchMedia("(max-width: 768px)");

const updateIframe = (e) => {
  iframeContainer.innerHTML = "";
  const iframe = document.createElement("iframe");
  iframe.style.border = "0";
  iframe.allowFullscreen = true;
  iframe.loading = "lazy";
  iframe.referrerPolicy = "no-referrer-when-downgrade";

  if (e.matches) {
    iframe.src =
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1157.5632866847143!2d12.018538383164097!3d57.852579491925006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46455e340e7fa70d%3A0xb37dd06a0a3b7df6!2sTransformatorv%C3%A4gen%2C%20445%2034%20Ale!5e0!3m2!1ssv!2sse!4v1737639834102!5m2!1ssv!2sse";
    iframe.width = "300";
    iframe.height = "200";
  } else {
    iframe.src =
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1157.5632866847143!2d12.018538383164097!3d57.852579491925006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46455e340e7fa70d%3A0xb37dd06a0a3b7df6!2sTransformatorv%C3%A4gen%2C%20445%2034%20Ale!5e0!3m2!1ssv!2sse!4v1737639834102!5m2!1ssv!2sse";
    iframe.width = "500";
    iframe.height = "400";
  }

  iframeContainer.appendChild(iframe);
};

mediaQuery.addEventListener("change", updateIframe);

updateIframe(mediaQuery);
