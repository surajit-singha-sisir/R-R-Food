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
  modalBox();
  cartBox();
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

function cart(item) {
  if (item.dataset.disabled === "true") return;

  item.dataset.disabled = "true";

  function anim() {
    const icon = item.querySelector(".m-plus-circle");
    const p = item.querySelector("p");
    if (icon && p) {
      icon.classList.add("hide");
      p.classList.add("hide");
      const animImg = document.createElement("img");
      animImg.src = "../assets/cart-added.gif";
      const div = item.querySelector("div");
      div.appendChild(animImg);
      if (!div.classList.contains("cart-animation")) {
        div.classList.toggle("cart-animation");
      }

      setTimeout(() => {
        icon.classList.remove("hide");
        p.classList.remove("hide");
        item.dataset.disabled = "false";

        const anim = item.querySelector(".cart-animation img");
        if (anim) {
          anim.closest("div").classList.toggle("cart-animation");
          anim.remove();
        }
      }, 3000);
    }
  }
  anim();
}
function modalBox() {
  const modalOverlay = document.getElementById("modalOverlay");
  const modal = modalOverlay.querySelector(".modal");

  const openModal = document.getElementById("modalBox-1");

  // TARGET COLLECTION
  modalOverlay.style.backgroundColor = modalOverlay.getAttribute("target-bg");
  modal.style.backgroundColor = modal.getAttribute("modal-bg");
  modal.style.color = modal.getAttribute("modal-color");
  modal.style.width = modal.getAttribute("modal-width");
  modal.style.height = modal.getAttribute("modal-height");
  const scroller = modal.getAttribute("scroller");
  console.log(scroller);

  openModal.addEventListener("click", () => {
    modalOverlay.style.display = "flex";
    modal.classList.remove("modal-out");
    modal.classList.add("modal-in");

    setTimeout(() => {
      if (scroller == "true") {
        document.body.style = "overflow: hidden !important;";
      }
    }, 2000);
  });

  const closeModal = document.getElementById("closeModalBox");
  closeModal.addEventListener("click", () => {
    modal.classList.remove("modal-in");
    modal.classList.add("modal-out");
    // After the animation ends, hide the modal
    modal.addEventListener(
      "animationend",
      () => {
        modalOverlay.style.display = "none";
        modal.classList.remove("modal-out");

        if (scroller == "true") {
          document.body.style = "overflow: auto !important;";
        }
      },
      { once: true }
    );
  });
}


function cartBox() {
  const cartOverlay = document.getElementById("cartOverlay");
  const cart = cartOverlay.querySelector(".cart");
}