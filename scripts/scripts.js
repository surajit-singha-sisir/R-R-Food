import { showToast } from "https://surajit-singha-sisir.github.io/mastorsCDN/mastors.js";

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

  const closeModals = document.querySelectorAll("#closeModalBox");
  closeModals.forEach((closeModal) => {
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
  });
}

function cartBox() {
  let cartContainer = document.querySelectorAll(".cart-trs"); // Store the initial collection

  cartContainer.forEach((cart) => {
    // QUANTITY
    function qty() {
      const cartPlus = cart.querySelector("#cart-plus");
      const cartMinus = cart.querySelector("#cart-minus");
      const cartCount = cart.querySelector("#cart-count");

      cartPlus.addEventListener("click", () => {
        const count = parseInt(cartCount.textContent);
        cartCount.textContent = count + 1;
        if (count + 1 >= 1) {
          cartMinus.disabled = false;
        }
        cartAmUpdate();
      });

      cartMinus.addEventListener("click", () => {
        let count = parseInt(cartCount.textContent);
        if (count > 1) {
          cartCount.textContent = count - 1;
        }
        if (count - 1 < 1) {
          showToast("At least 1 item", "warning");
          cartMinus.disabled = true;
        }
        cartAmUpdate();
      });

      function cartAmUpdate() {
        const x = cart.querySelector("#cart-count");
        const y = cart.querySelector("#qty");
        const p = cart.querySelector("#price");
        y.textContent = x.textContent;
        console.log(x);
        

        let total = cart.querySelector("#product-total");
        const counter = parseInt(p.textContent, 10);
        const amount = parseInt(y.textContent, 10);
        total.textContent = counter * amount;
      }
    }
    qty();

    // SERIAL
    function serial() {
      const cartSerials = document.querySelectorAll(".serials");

      cartSerials.forEach((serial, index) => {
        serial.textContent = index + 1;
      });
    }
    serial();

    // SHOW EMPTY HTML
    function showEmptyHTML() {
      const tbody = document.querySelector(".cart-table tbody");
      const emptyBox = document.getElementById("no-cart-data");

      // if (tbody.children.length < 1) {
      //   emptyBox.classList.toggle("hide");
      //   showToast("No Cart Data Available", "error");
      // }

      cartContainer = document.querySelectorAll(".cart-trs");
      if (cartContainer.length < 1) {
        emptyBox.classList.toggle("hide");
      } else {
        emptyBox.classList.add("hide");
      }
    }
    showEmptyHTML();

    // DELETE
    function deleteCart() {
      const cartDelete = cart.querySelector("#deleteCartBtn");
      cartDelete.addEventListener("click", (event) => {
        cart.remove();

        // SERIAL UPDATE
        serial();
        showEmptyHTML();
      });
    }
    deleteCart();
  });
}
