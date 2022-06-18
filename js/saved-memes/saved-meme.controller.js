'use strict'

function onDeleteSavedMeme(e) {
  // if (e.target.parentElement.classList[0] !== 'card') return // when click is not on the card
  const imgId = e.target.parentElement.dataset.imgId

  console.log(e.target)
  e.target.classList.add('to-delete')
}

function onSaveMeme() {
  const meme = getMeme()

  showMsg()
  saveMeme(meme)
}

function renderSavedMemes(imgs = getSaveMemes()) {
  const elCardsContainer = document.querySelector('.gallery-container')

  elCardsContainer.innerHTML = imgs
    .map(img => {
      return `<div class="card" data-img-id="${img.id}"><img class="shadow" src="${img.url}" alt="" /></div>`
    })
    .join('')
}

function showMsg() {
  const elMsg = document.querySelector('.saved-meme-msg')

  elMsg.classList.add('show-msg')

  setTimeout(() => {
    elMsg.classList.remove('show-msg')
  }, 3000)
}

function onDelete(btn) {
  btn.classList.toggle('active-delete')
  // deleteAllSavedMemes()

  const elGallery = document.querySelector('.gallery-container')
  elGallery.addEventListener('mousemove', onDeleteSavedMeme)
  renderSavedMemes()
}

function onShowMemes() {
  const elNavlinkMemes = document.querySelector('.memes-link')
  const elNavlinkGallery = document.querySelector('.gallery-link')
  const elGallerySection = document.querySelector('.gallery-section')
  const elEditorSection = document.querySelector('.editor-section')
  const elSearch = document.querySelector('.search-container')
  const elDeleteAllBtn = document.querySelector('.delete-saved-memes')

  elGallerySection.classList.remove('hidden')
  elEditorSection.classList.add('hidden')
  elNavlinkGallery.classList.remove('nav-link-active')
  elNavlinkMemes.classList.add('nav-link-active')
  elSearch.classList.add('hidden')
  elDeleteAllBtn.classList.remove('hidden')

  renderSavedMemes()
}
