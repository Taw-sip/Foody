// ===== Cart ===== //
document.addEventListener("DOMContentLoaded", ready);

function ready() {
  const cart = document.querySelector("#cart-item");
  const fav = document.querySelector("#fav-item");
  document
    .querySelector(".cart-icon-container i")
    .addEventListener("click", () => {
      if (fav.classList.contains("show")) {
        fav.classList.remove("show");
      }
      cart.classList.toggle("show");
    });

  document
    .querySelector(".fav-icon-container i")
    .addEventListener("click", () => {
      if (cart.classList.contains("show")) {
        cart.classList.remove("show");
      }
      fav.classList.toggle("show");
    });

  document.querySelector("#open-cart").addEventListener("click", () => {
    if (fav.classList.contains("show")) {
      fav.classList.remove("show");
    }
    cart.classList.toggle("show");
  });

  document.querySelector("#open-fav").addEventListener("click", () => {
    if (cart.classList.contains("show")) {
      cart.classList.remove("show");
    }
    fav.classList.toggle("show");
  });

  document.querySelector(".cart-close").addEventListener("click", () => {
    cart.classList.remove("show");
  });

  document.querySelector(".fav-close").addEventListener("click", () => {
    fav.classList.remove("show");
  });

  const removeCartItemButtons = document.querySelectorAll(".danger");
  removeCartItemButtons.forEach((button) => {
    button.addEventListener("click", removeCartItem);
  });

  const quantityInputs = document.querySelectorAll(".cart-content-input");
  quantityInputs.forEach((input) => {
    input.addEventListener("change", quantityChanged);
  });

  const addToCartButtons = document.querySelectorAll("#cart-icon");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", addToCartClicked);
  });

  document
    .querySelector(".btn-purchase")
    .addEventListener("click", purchaseClicked);

  const addToFavButtons = document.querySelectorAll("#fav-icon");
  addToFavButtons.forEach((button) => {
    button.addEventListener("click", addToFavClicked);
  });

  const removeFavItemButtons = document.querySelectorAll(".fav-danger");
  removeFavItemButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.target.closest(".fav-content").remove();
      updateFavCount();
    });
  });
}

function purchaseClicked() {
  const cartItem = document.querySelector(".cart-item");
  if (cartItem.children.length === 0) {
    document.querySelector("#add-now").classList.add("show");
    setTimeout(() => {
      document.querySelector("#add-now").classList.remove("show");
    }, 2000);
    return;
  }

  document.querySelector("#purchase").classList.add("show");
  setTimeout(() => {
    document.querySelector("#purchase").classList.remove("show");
  }, 3000);
  while (cartItem.firstChild) {
    cartItem.removeChild(cartItem.firstChild);
  }

  updateCartTotal();
  updateCartCount();
}

function removeCartItem(event) {
  const buttonClicked = event.target;
  buttonClicked.closest(".cart-content").remove();
  updateCartTotal();
  updateCartCount();
}

function quantityChanged(event) {
  const input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
}

function addToCartClicked(event) {
  const button = event.target;
  const shopItem = button.closest("#cart-container");
  const title = shopItem.querySelector("#menu-name").innerText;
  const price = shopItem.querySelector("#menu-price").innerText;
  const imgsrc = shopItem.querySelector("#menu-img").src;

  addItemToCart(title, price, imgsrc);
}

function addItemToCart(title, price, imgsrc) {
  const cartItem = document.querySelector(".cart-item");
  const cartItemNames = cartItem.querySelectorAll(".cart-content-title");

  if ([...cartItemNames].some((item) => item.innerText === title)) {
    addedToCartAllReady();
    return;
  }

  const cartContent = document.createElement("div");
  cartContent.classList.add("cart-content");
  cartContent.innerHTML = `
    <div class="cart-content-1">
      <img class="cart-content-img" src="${imgsrc}" />
      <h3 class="cart-content-title">${title}</h3>
    </div>
    <div class="cart-content-2">
      <h3 class="cart-content-price">${price}</h3>
      <input type="number" value="1" min="1" class="cart-content-input" />
    </div>
    <button class="danger" type="button"><i class="fa-solid fa-xmark"></i></button>
  `;
  cartItem.appendChild(cartContent);
  addedToCart(title);

  updateCartTotal();
  updateCartCount();

  cartContent
    .querySelector(".danger")
    .addEventListener("click", removeCartItem);
  cartContent
    .querySelector(".cart-content-input")
    .addEventListener("change", quantityChanged);
}

function updateCartTotal() {
  const cartItemContainer = document.querySelector(".cart-item");
  const cartContents = cartItemContainer.querySelectorAll(".cart-content");
  let total = 0;

  cartContents.forEach((cart) => {
    const priceElement = cart.querySelector(".cart-content-price");
    const quantityElement = cart.querySelector(".cart-content-input");
    const price = parseFloat(priceElement.innerText.replace("$", ""));
    const quantity = quantityElement.value;
    total += price * quantity;
  });

  total = Math.round(total * 100) / 100;
  document.querySelector(".cart-total-price").innerText = `$${total}`;
}

function updateCartCount() {
  const cartItemContainer = document.querySelector(".cart-item");
  const cartContents = cartItemContainer.querySelectorAll(".cart-content");
  const cartCount = cartContents.length;

  const cartCountElement = document.querySelector(".cart-count");
  cartCountElement.innerText = cartCount;
}

function addedToCart(title) {
  const cart = document.querySelector("#cart");
  const cartTitle = cart.querySelector("#cart-head");
  cartTitle.innerText = title;

  cart.classList.add("show");

  setTimeout(() => {
    cart.classList.remove("show");
  }, 2800);
}

function addedToCartAllReady() {
  const cartAdded = document.querySelector("#cart-added");

  cartAdded.classList.add("show");

  setTimeout(() => {
    cartAdded.classList.remove("show");
  }, 2500);
}

function addToFavClicked(event) {
  const button = event.target;
  const shopItem = button.closest("#cart-container");
  const favIcon = shopItem.querySelector("#fav-icon");
  const title = shopItem.querySelector("#menu-name").innerText;
  const price = shopItem.querySelector("#menu-price").innerText;
  const imgsrc = shopItem.querySelector("#menu-img").src;

  addItemToFav(favIcon, title, price, imgsrc, shopItem);
}

function addItemToFav(favIcon, title, price, imgsrc) {
  const favItem = document.querySelector(".fav-item");
  const favItemNames = document.querySelectorAll(".fav-content-title");

  let isAlreadyInFav = false;
  favItemNames.forEach((item) => {
    if (item.innerText === title) {
      removeFavItem(item.closest(".fav-content"), favIcon);
      isAlreadyInFav = true;
    }
  });

  if (isAlreadyInFav) {
    updateFavCount();
    removeFromFav();
    return;
  }

  const favContent = document.createElement("div");
  favContent.classList.add("fav-content");
  favContent.innerHTML = `
    <div class="fav-container id="cart-container">
      <div class="fav-content-1">
        <img id="menu-img" class="fav-content-img" src="${imgsrc}" />
        <h3 id="menu-name" class="fav-content-title">${title}</h3>
      </div>
      <h3 id="menu-price" class="fav-content-price">${price}</h3>
      <div id="cart-icon">
      Add
      <i class="fa-solid fa-cart-shopping"></i>
      </div>
      <button class="fav-danger" type="button"><i class="fa-solid fa-xmark"></i></button>
    </div>
  `;

  favItem.appendChild(favContent);
  favIcon.classList.replace("fa-regular", "fa-solid");
  addedToFav(title);

  updateFavCount();

  favContent.querySelector("button").addEventListener("click", () => {
    removeFavItem(favContent, favIcon);
    removeFromFav();
  });

  const cartIcon = favContent.querySelector("#cart-icon");
  cartIcon.addEventListener("click", () => {
    addItemToCart(title, price, imgsrc);
    removeFavItem(favContent, favIcon);
    updateFavCount();
  });
}

function removeFavItem(favContent, favIcon) {
  favContent.remove();
  favIcon.classList.replace("fa-solid", "fa-regular");
  updateFavCount();
}

function updateFavCount() {
  const favItem = document.querySelector(".fav-item");
  const total = favItem.querySelectorAll(".fav-content");
  const cartCount = document.querySelector(".fav-count");

  cartCount.innerText = total.length;
}

function addedToFav(title) {
  const fav = document.querySelector("#fav");
  const favTitle = fav.querySelector("#fav-head");
  favTitle.innerText = title;

  fav.classList.add("show");

  setTimeout(() => {
    fav.classList.remove("show");
  }, 2800);
}

function removeFromFav() {
  const favRemoved = document.querySelector("#fav-added");

  favRemoved.classList.add("show");

  setTimeout(() => {
    favRemoved.classList.remove("show");
  }, 2500);
}

// ===== About =====//
const aboutImg = document.querySelector("#about-image");
function aboutImg1() {
  aboutImg.src = "images/chef-1.png";
}
function aboutImg2() {
  aboutImg.src = "images/chef-2.png";
}
function aboutImg3() {
  aboutImg.src = "images/chef-3.png";
}
function aboutImg4() {
  aboutImg.src = "images/chef-4.png";
}

// Show and hide menu content
document.addEventListener("DOMContentLoaded", () => {
  const menuButtonAll = document.querySelectorAll(
    "#menu-button-container button"
  );
  const menuItemAll = document.querySelectorAll(
    "#menu-item-container .menu-card-container"
  );

  menuButtonAll[0].classList.add("menu-btn");
  menuItemAll.forEach((menuItem) =>
    menuItem.classList.add("menu-item-display")
  );
  menuSlide();

  menuButtonAll.forEach((menuButton, index) => {
    menuButton.addEventListener("click", () => {
      menuButtonAll.forEach((btn) => btn.classList.remove("menu-btn"));
      menuButton.classList.add("menu-btn");

      if (index === 0) {
        menuItemAll.forEach((menuItem) =>
          menuItem.classList.add("menu-item-display")
        );
        menuSlide();
      } else {
        menuItemAll.forEach((menuItem) =>
          menuItem.classList.remove("menu-item-display")
        );
        menuItemAll[index - 1].classList.add("menu-item-display");
        menuSlide();
      }
    });
  });
});

// ===== for Menu ===== //
function menuSlide() {
  var swiper = new Swiper(".slide-content", {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
    centerSlide: "true",
    fade: "true",
    grabCursor: "true",
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    // autoplay slide
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },

    // for responsive
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      650: {
        slidesPerView: 2,
      },
      1150: {
        slidesPerView: 3,
      },
    },
  });
}

menuSlide();

// ===== Feedback ===== //
var swiper = new Swiper(".feedback-content", {
  slidesPerView: 1,
  spaceBetween: 50,
  loop: true,
  centerSlide: "true",
  fade: "true",
  grabCursor: "true",

  // autoplay slide
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
});

// ===== Video Play ===== //
const play = document.querySelector(".play");
const video = document.querySelector("video");

play.addEventListener("click", () => {
  video.play();
  play.style.display = "none";
});

video.addEventListener("ended", () => {
  play.style.display = "block";
});

// Show Favorite
/*
const fav = document.querySelector("#fav");
const favAdded = document.querySelector("#fav-added");
const favIcon = document.querySelectorAll("#fav-icon");

favIcon.forEach((icon) => {
  icon.addEventListener("click", () => {
    const cartContainer = icon.closest("#cart-container");
    const menuName = cartContainer.querySelector("#menu-name").textContent;
    document.querySelector("#fav-head").innerHTML = menuName;

    if (cartContainer.classList.contains("fav-added")) {
      cartContainer.classList.remove("fav-added");
      icon.classList = "fa-regular fa-heart";
      favAdded.classList.add("show");

      setTimeout(() => {
        favAdded.classList.remove("show");
      }, 3000);
    } else {
      cartContainer.classList.add("fav-added");
      icon.classList = "fa-solid fa-heart";
      fav.classList.add("show");

      setTimeout(() => {
        fav.classList.remove("show");
      }, 3000);
    }
  });
});
*/

// Show and Hide Setting

const setting = document.querySelector("#setting");
const settingIcon = document.querySelector("#setting-icon");

settingIcon.addEventListener("click", () => {
  setting.classList.toggle("setting-show");
  settingIcon.classList.toggle("fa-bars");
  settingIcon.classList.toggle("fa-xmark");
});

function hideSetting() {
  if (setting.classList.contains("setting-show")) {
    setting.classList.remove("setting-show");
    settingIcon.classList.toggle("fa-bars");
    settingIcon.classList.toggle("fa-xmark");
  }
}

document.addEventListener("click", function (event) {
  if (!setting.contains(event.target) && !settingIcon.contains(event.target)) {
    setting.classList.remove("setting-show");
    settingIcon.classList = "fa-solid fa-bars";
  }
});
