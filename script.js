/* INUKA PRODUCTS: search, category filter and image enlargement */
document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("productSearch");
  const categorySelect = document.getElementById("productCategory");
  const cards = document.querySelectorAll("[data-product-card]");
  const noResults = document.getElementById("noProducts");

  function filterProducts() {
    const term = searchInput ? searchInput.value.trim().toLowerCase() : "";
    const category = categorySelect ? categorySelect.value : "all";
    let visible = 0;
    cards.forEach(function (card) {
      const text = ((card.dataset.search || "") + " " + card.textContent).toLowerCase();
      const matchesText = text.includes(term);
      const matchesCategory = category === "all" || card.dataset.category === category;
      const show = matchesText && matchesCategory;
      card.hidden = !show;
      if (show) visible++;
    });
    if (noResults) noResults.hidden = visible !== 0;
  }
  if (searchInput) searchInput.addEventListener("input", filterProducts);
  if (categorySelect) categorySelect.addEventListener("change", filterProducts);

  const lightbox = document.getElementById("imageLightbox");
  const enlargedImage = document.getElementById("lightboxImage");
  const closeButton = document.getElementById("closeLightbox");
  function openLightbox(image) {
    if (!lightbox || !enlargedImage) return;
    enlargedImage.src = image.src;
    enlargedImage.alt = image.alt || "Enlarged product image";
    lightbox.hidden = false;
    if (closeButton) closeButton.focus();
  }
  function closeLightbox() {
    if (!lightbox || !enlargedImage) return;
    lightbox.hidden = true;
    enlargedImage.src = "";
  }
  document.querySelectorAll("[data-lightbox]").forEach(function (image) {
    image.addEventListener("click", function () { openLightbox(image); });
    image.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openLightbox(image);
      }
    });
  });
  if (closeButton) closeButton.addEventListener("click", closeLightbox);
  if (lightbox) lightbox.addEventListener("click", function (event) {
    if (event.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeLightbox();
  });
});
