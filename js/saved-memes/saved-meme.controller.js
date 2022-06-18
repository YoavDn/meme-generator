'use strict'

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
  gIsDeleteMode = !gIsDeleteMode
  btn.classList.toggle('active-delete')
  console.log(gIsDeleteMode)

  if (gIsDeleteMode) {
    const elGallery = document.querySelector('.gallery-container')
    elGallery.addEventListener('click', onDeleteSavedMeme)
  } else {
    const elGallery = document.querySelector('.gallery-container')
    elGallery.removeEventListener('click', onDeleteSavedMeme)
  }
}

function disableDeleteMode() {
  const elDeleteBtn = document.querySelector('.delete-meme')
  elDeleteBtn.classList.remove('active-delete')
}

function onDeleteSavedMeme(e) {
  console.log(e.target.parentElement)
  if (e.target.parentElement.classList[0] !== 'card') return
  deleteById(e)
}

function onShowMemes(link) {
  const elGallerySection = document.querySelector('.gallery-section')
  const elEditorSection = document.querySelector('.editor-section')
  const elSearch = document.querySelector('.search-container')
  const elDeleteAllBtn = document.querySelector('.delete-saved-memes')
  const elAboutSection = document.querySelector('.about')
  const elNavLinks = document.querySelectorAll('.nav-link')

  elNavLinks.forEach(link => {
    link.classList.remove('nav-link-active')
  })

  elAboutSection.classList.remove('hidden')
  elGallerySection.classList.remove('hidden')
  elEditorSection.classList.add('hidden')

  elSearch.classList.add('hidden')
  elDeleteAllBtn.classList.remove('hidden')
  elAboutSection.classList.add('hidden')
  link.classList.add('nav-link-active')

  renderSavedMemes()
}
