import products from './gallery-items.js';
// console.table(products)

/* <li class="gallery__item">
  <a
    class="gallery__link"
    href="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
  >
    <img
      class="gallery__image"
      src="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546__340.jpg"
      data-source="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
      alt="Tulips"
    />
  </a>
</li> */

//Сылки на елементы
const galeryUlRef = document.querySelector('.js-gallery')
const divModalRef = document.querySelector('.js-lightbox');
const imgModalRef = document.querySelector('.lightbox__image')
const bttnCloseModalRef = document.querySelector('button[data-action="close-lightbox"]')
const modalOverlayRef = document.querySelector('.lightbox__overlay')
// const modatContent = document.querySelector('.lightbox__content')

//Функция для создание розметки
const createElementGallery = (product, index) =>{

    const galleryLiRef = document.createElement('li')
    const galleryARef = document.createElement('a')
    const galleryImgRef = document.createElement('img')
        
    galleryLiRef.classList.add('gallery__item')
   
    galleryARef.classList.add('gallery__link')
    galleryARef.setAttribute('href', `${product.original}`)
    galleryARef.setAttribute('data-item', `${index}`)

    galleryImgRef.classList.add('gallery__image')
    galleryImgRef.setAttribute('src', `${product.preview}`)
    galleryImgRef.setAttribute('data-source', `${product.original}`)
    galleryImgRef.setAttribute('alt', `${product.description}`)

    galleryLiRef.appendChild(galleryARef);
    galleryARef.appendChild(galleryImgRef);

    return galleryLiRef
}

//Перебор функции создания розметки
products.forEach((product, index) =>{
    // console.log(createElementGallery(product, index))
    galeryUlRef.appendChild(createElementGallery(product, index))
})

//Добавление слушателей
galeryUlRef.addEventListener('click', onOpenModal)
bttnCloseModalRef.addEventListener('click', closeModal)
modalOverlayRef.addEventListener('click', onBackDropClick);



//Функции
function onOpenModal(event){
    event.preventDefault()
    const targetEl = event.target;

    if(targetEl.nodeName !== 'IMG'){
        return  
    };

    window.addEventListener('keydown', onPressEsc)
    // window.addEventListener('keydown', onPressArrow)
    divModalRef.classList.add('is-open')
    imgModalRef.setAttribute('src', `${targetEl.dataset.source}`)
    imgModalRef.setAttribute('alt', `${targetEl.getAttribute('alt')}`)
}
function closeModal(){
    window.removeEventListener('keydown', onPressEsc)
    // window.removeEventListener('keydown', onPressArrow)
    divModalRef.classList.remove('is-open')
    imgModalRef.removeAttribute('src')
    imgModalRef.removeAttribute('alt')
};
function onBackDropClick(event){
    if(event.target === event.currentTarget){
        closeModal()
    }
}
function onPressEsc(event){
    if(event.code === 'Escape'){
        closeModal()
    }
}



// function onPressArrow(event){
//     const currentItem = event.target.dataset.item;
//     let nextItem = 0;
//     if(event.code === 'ArrowLeft'){
//         console.log('ArrowLeft')
//         nextItem = Number(currentItem) - 1;
//     }
//     if(event.code === 'ArrowRight'){
//         console.log('ArrowRight')
//         nextItem = Number(currentItem) + 1;
//     }
// }