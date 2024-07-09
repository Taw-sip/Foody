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

// ===== Menu ===== //
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

// Show Cart
const cart = document.querySelector("#cart");
const cartAdded = document.querySelector("#cart-added");
const cartIcon = document.querySelectorAll("#cart-icon");

cartIcon.forEach((icon) => {
  icon.addEventListener("click", () => {
    const cartContainer = icon.closest("#cart-container");
    const menuName = cartContainer.querySelector("#menu-name").textContent;
    const cartHead = (document.querySelector("#cart-head").innerHTML =
      menuName);

    if (cartContainer.classList.contains("added")) {
      cartAdded.classList.add("show");

      setTimeout(() => {
        cartAdded.classList.remove("show");
      }, 2500);
    } else {
      cartContainer.classList.add("added");
      cart.classList.add("show");

      setTimeout(() => {
        cart.classList.remove("show");
      }, 2800);
    }
  });
});

// Show Favorite
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
