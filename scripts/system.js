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
