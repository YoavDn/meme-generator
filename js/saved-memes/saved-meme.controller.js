'use strict'

function onSaveMeme() {
  const meme = getMeme()

  console.log('Meme saved successfully')
  saveMeme(meme)
}

function onShowMemes() {
  renderSavedMemes()
}

function renderSavedMemes(imgs = getSaveMemes()) {
  const elCardsContainer = document.querySelector('.gallery-container')

  elCardsContainer.innerHTML = imgs
    .map((img, idx) => {
      return `<div class="card shadow" data-img-id="${img.id}"><img src="${img.url}" alt="" /></div>`
    })
    .join('')
}
