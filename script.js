import items from "./gallery-items.js";
const gridEl = document.querySelector(".js-gallery");
const modalEL = document.querySelector("div.lightbox");
const buttonEl = document.querySelector("[data-action]");
const modalImageEl = document.querySelector("img.lightbox__image");

function gridCreator(array) {
  const grid = [];
  array.map((card) => {
    grid.push(`<li class="gallery__item">

    <img
      class="gallery__image"
      src="${card.preview}"
      data-source="${card.original}"
      alt="${card.description}"
    />
  </a>
</li>`);
  });
  return grid.join("");
}

gridEl.innerHTML = `${gridCreator(items)}`;

//function to get the origin image URL

function onClickUrl(event) {
  return event.target.dataset.source;
}

//function to open the modal

function onClickModalOpener() {
  if (modalEL.classList.contains("is-open")) {
    return;
  }
  modalEL.classList.add("is-open");
}

//function to place current image URL into src atribute

function imagePlacer(url) {
  modalImageEl.src = `${url}`;
}

//function to close the modal, clear the src and remove keyboard listeners

function onCloseClick() {
  modalEL.classList.remove("is-open");
  imagePlacer("");
  window.removeEventListener("keydown", onEsc);
  window.removeEventListener("keydown", horizontalSlider);
}

//Close on Escape button

function onEsc(e) {
  if (e.code === "Escape") {
    onCloseClick();
  }
}

//horizontal slider function to change images with arrows

const urlArray = [];
const altArray = [];
items.map((item) => urlArray.push(item.original));
items.map((item) => altArray.push(item.description));

function attributeUpdater(direction) {
  modalImageEl.src = `${urlArray[direction]}`;
  modalImageEl.alt = `${altArray[direction]}`;
}

function horizontalSlider(event) {
  function counter(direction) {
    let currentUrlIndex = urlArray.indexOf(modalImageEl.src);
    const maxLimit = urlArray.length;
    if (direction === "right") {
      if (currentUrlIndex === maxLimit - 1) {
        currentUrlIndex = -1;
      }

      attributeUpdater(currentUrlIndex + 1);
      //modalImageEl.src = `${urlArray[currentUrlIndex + 1]}`;
    }

    if (direction === "left") {
      if (currentUrlIndex === 0) {
        currentUrlIndex = maxLimit;
      }

      attributeUpdater(currentUrlIndex - 1);
      // modalImageEl.src = `${urlArray[currentUrlIndex - 1]}`;
    }
  }

  if (event.code === "ArrowRight") {
    counter("right");
  }
  if (event.code === "ArrowLeft") {
    counter("left");
  }
}

//Main function orchestrating the open modal

function onClick(e) {
  if (e.target.dataset.source === undefined) {
    return;
  }
  onClickModalOpener();
  imagePlacer(onClickUrl(e));
  if (modalEL.classList.contains("is-open")) {
    window.addEventListener("keydown", onEsc);
    document
      .querySelector("div.lightbox__overlay")
      .addEventListener("click", onCloseClick);
  }
  window.addEventListener("keydown", horizontalSlider);
}

//event listeners

gridEl.addEventListener("click", onClick);
buttonEl.addEventListener("click", onCloseClick);
