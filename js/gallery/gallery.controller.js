'use strict'

function onImgSelect(e) {
  const elGallerySection = document.querySelector('.gallery-section')
  const elEditorSection = document.querySelector('.editor-section')
  const imgId = e.target.parentElement.dataset.imgId

  elGallerySection.classList.add('hidden')
  elEditorSection.classList.remove('hidden')

  emptyElsFromMeme()
  setImg(imgId)
}

function onShowGallery() {
  const elGallerySection = document.querySelector('.gallery-section')
  const elEditorSection = document.querySelector('.editor-section')

  elGallerySection.classList.remove('hidden')
  elEditorSection.classList.add('hidden')
  emptyElsFromMeme()
}
