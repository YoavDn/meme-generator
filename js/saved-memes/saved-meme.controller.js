'use strict'

function onSaveMeme() {
  const meme = getMeme()

  console.log('Meme saved successfully')
  saveMeme(meme)
}

function onShowMemes() {
  const elGallerySection = document.querySelector('.gallery-section')
  const elEditorSection = document.querySelector('.editor-section')

  elGallerySection.classList.remove('hidden')
  elEditorSection.classList.add('hidden')

  renderSavedMemes()
}

function renderSavedMemes(imgs = getSaveMemes()) {
  const elCardsContainer = document.querySelector('.gallery-container')

  elCardsContainer.innerHTML = imgs
    .map((img, idx) => {
      return `<div class="card shadow" data-img-id="${img.id}"><img class="shadow" src="${img.url}" alt="" /></div>`
    })
    .join('')
}
