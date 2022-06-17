'use strict'

function onSaveMeme() {
  const meme = getMeme()

  console.log('Meme saved successfully')
  saveMeme(meme)
}

function onShowMemes() {
  const elNavlinkMemes = document.querySelector('.memes-link')
  const elNavlinkGallery = document.querySelector('.gallery-link')
  const elGallerySection = document.querySelector('.gallery-section')
  const elEditorSection = document.querySelector('.editor-section')

  elGallerySection.classList.remove('hidden')
  elEditorSection.classList.add('hidden')
  elNavlinkGallery.classList.remove('nav-link-active')
  elNavlinkMemes.classList.add('nav-link-active')

  renderSavedMemes()
}

function renderSavedMemes(imgs = getSaveMemes()) {
  const elCardsContainer = document.querySelector('.gallery-container')

  elCardsContainer.innerHTML = imgs
    .map(img => {
      return `<div class="card" data-img-id="${img.id}"><img class="shadow" src="${img.url}" alt="" /></div>`
    })
    .join('')
}
