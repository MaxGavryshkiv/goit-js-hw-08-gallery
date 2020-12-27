import { default as galleryItems } from "./gallery-items.js";
const galleryRef = document.querySelector(".js-gallery");
const lightboxRef = document.querySelector(".js-lightbox");
const lightOverlayRef = document.querySelector(".lightbox__overlay");
const lightContentRef = document.querySelector(".lightbox__content");
const lightImgRef = document.querySelector(".lightbox__image");
const lightCloseButnRef = document.querySelector("button[data-action='close-lightbox']");

const createCartRef = galleryItems.reduce((acc, img) => {
  img = `<li class="gallery__item">
  <a class="gallery__link" href="${img.original}">
    <img class="gallery__image" src="${img.preview}" data-source="${img.original}" alt="${img.description}" />
    </a> 
</li>`;
  return (acc += img);
}, "");

galleryRef.insertAdjacentHTML("afterbegin", createCartRef);

const openModal = (event) => {
  if (event.target === event.currentTurget) {
    return;
  }
  event.preventDefault();
  lightboxRef.classList.add("is-open");
  lightImgRef.setAttribute("src", `${event.target.getAttribute("src")}`);
};

const closeModal = (event) => {
  if (lightboxRef.classList.contains("is-open") && event.target !== lightImgRef) {
    lightboxRef.classList.remove("is-open");
  }
  return;
};

galleryRef.addEventListener("click", openModal);
lightCloseButnRef.addEventListener("click", closeModal);
lightOverlayRef.addEventListener("click", closeModal);
