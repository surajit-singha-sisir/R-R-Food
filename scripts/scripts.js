// // NAV-1 JS
function toggleNavbar(hamb) {
  const items = hamb.parentElement.querySelector(".nav-items");
  const bgDark = document.getElementById("bg-dark");

  if (items.classList.contains("navAnimation")) {
    // Close navbar
    items.classList.remove("navAnimation");
    items.classList.add("navExitAnimation");
    bgDark.classList.remove("bgDarkAnimation");
    bgDark.classList.add("bgDarkExitAnimation");
  } else {
    items.classList.remove("navExitAnimation");
    items.classList.add("navAnimation");
    bgDark.classList.remove("bgDarkExitAnimation");
    bgDark.classList.add("bgDarkAnimation");

    const handleOutsideClick = (event) => {
      if (!items.contains(event.target) && !hamb.contains(event.target)) {
        // Close the navbar if the click is outside
        items.classList.remove("navAnimation");
        items.classList.add("navExitAnimation");
        bgDark.classList.remove("bgDarkAnimation");
        bgDark.classList.add("bgDarkExitAnimation");

        document.removeEventListener("click", handleOutsideClick);
      }
    };
    document.addEventListener("click", handleOutsideClick);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const products = document.querySelectorAll(".slide-product .product");

  let currentIndex = 0;
  const totalProducts = products.length;

  products[currentIndex].classList.add("inAnimation");
  products[currentIndex].style =
    "height: 70%; bottom: 0; right: 50%; z-index: 3;";

  // LOOPING
  setInterval(() => {
    products[currentIndex].classList.add("inAnimation");
    products[currentIndex].style =
      "height: 35%; bottom: 5rem; right: 50%; z-index: 3;";

    const currentProduct = products[currentIndex];
    const nextIndex = (currentIndex + 1) % totalProducts;
    const nextProduct = products[nextIndex];

    // inAnimation <-> betweenAnimation
    currentProduct.classList.remove("inAnimation");
    currentProduct.classList.add("betweenAnimation");

    // betweenAnimation <-> outAnimation
    setTimeout(() => {
      currentProduct.classList.remove("betweenAnimation");
      currentProduct.classList.add("outAnimation");
      currentProduct.style = "height: 70%; right: -100%; z-index: 1;"; // Lower z-index for outgoing product
    }, 3000);

    // NEXT PRODUCT
    nextProduct.classList.remove("outAnimation");
    nextProduct.classList.add("inAnimation");
    nextProduct.style = "height: 70%; bottom: 0; right: 50%; z-index: 5;";

    currentIndex = nextIndex;
  }, 3000);
});

// LOGO MOUSE OVER ANIMATION
document.addEventListener("DOMContentLoaded", function () {
  const image = document.querySelector(".dynamic-image");
  const aboutUsRight = document.querySelector(".about-us-right");

  aboutUsRight.addEventListener("mousemove", (e) => {
    const rect = aboutUsRight.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const moveX = (x / rect.width - 0.5) * 30;
    const moveY = (y / rect.height - 0.5) * 30;

    image.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.1)`;
  });

  aboutUsRight.addEventListener("mouseleave", () => {
    image.style.transform = "translate(0, 0) scale(1)";
  });

  updatePrice();
});

// UPPDATING PRICE
function updatePrice() {
  const updatingPrice = document.querySelectorAll(".updatingPrice");
  updatingPrice.forEach((price) => {
    const productPrice = price.querySelector(".product-price");
    const updatePrice = price.querySelector(".updated-price");

    if (updatePrice) {
      productPrice.classList.toggle("updatingPrice-active");
    }
  });
}

