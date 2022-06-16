'use strict'

function onImgSelect(e) {
  const elGallerySection = document.querySelector('.gallery-section')
  const elEditorSection = document.querySelector('.editor-section')

  if (e.target.parentElement.classList[0] !== 'card') return
  const imgId = e.target.parentElement.dataset.imgId

  elGallerySection.classList.add('hidden')
  elEditorSection.classList.remove('hidden')
  console.log(imgId)

  emptyElsFromMeme()
  setImg(imgId)
}

function renderCards(imgs = getImgs()) {
  const elCardsContainer = document.querySelector('.gallery-container')

  // const imgs = getImgs()

  elCardsContainer.innerHTML = imgs
    .map((img, idx) => {
      return `<div class="card " data-img-id="${idx + 1}"><img  class="shadow"src="${img.url}" alt="" /></div>`
    })
    .join('')
}

function onShowGallery() {
  const elGallerySection = document.querySelector('.gallery-section')
  const elEditorSection = document.querySelector('.editor-section')

  elGallerySection.classList.remove('hidden')
  elEditorSection.classList.add('hidden')
  emptyElsFromMeme()
  renderCards()
}

function onSearch(e) {
  e.preventDefault()

  const searchValue = document.querySelector('.input-search').value

  document.querySelector('.input-search').value = ''
  const filteredCards = filterCardsBySearch(searchValue)

  if (filteredCards === null) {
    alert("couldn't find meme")
  } else {
    console.log(filteredCards)
    renderCards(filteredCards)
  }
}
