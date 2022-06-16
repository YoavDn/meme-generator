'use strict'

renderCards()

function onImgSelect(e) {
  const elGallerySection = document.querySelector('.gallery-section')
  const elEditorSection = document.querySelector('.editor-section')

  if (e.target.parentElement.classList[0] !== 'card') return
  const imgId = e.target.parentElement.dataset.imgId

  elGallerySection.classList.add('hidden')
  elEditorSection.classList.remove('hidden')

  emptyElsFromMeme()
  setImg(imgId)
}

function renderCards() {
  const elCardsContainer = document.querySelector('.gallery-container')
  const imgs = getImgs()

  elCardsContainer.innerHTML = imgs
    .map((img, idx) => {
      return `<div class="card shadow" data-img-id="${idx + 1}"><img src="${img.url}" alt="" /></div>`
    })
    .join('')
}

function onShowGallery() {
  const elGallerySection = document.querySelector('.gallery-section')
  const elEditorSection = document.querySelector('.editor-section')

  elGallerySection.classList.remove('hidden')
  elEditorSection.classList.add('hidden')
  emptyElsFromMeme()
}
