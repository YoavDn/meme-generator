'use strict'

function onImgSelect(e) {
  if (gIsDeleteMode) return
  if (e.target.parentElement.classList[0] !== 'card') return // when click is not on the card
  const imgId = e.target.parentElement.dataset.imgId
  pageNavigation(false)

  emptyElsFromMeme()
  setImg(imgId)
}

function renderCards(imgs = getImgs()) {
  const elCardsContainer = document.querySelector('.gallery-container')

  elCardsContainer.innerHTML = imgs
    .map((img, idx) => {
      return `<div class="card " data-img-id="${idx + 1}"><img  class="shadow"src="${img.url}" alt="" /></div>`
    })
    .join('')
}

function onShowGallery(link) {
  const elNavLinks = document.querySelectorAll('.nav-link')

  elNavLinks.forEach(link => {
    link.classList.remove('nav-link-active')
  })
  link.classList.add('nav-link-active')

  gIsDeleteMode = false
  disableDeleteMode()

  pageNavigation(true)
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
    renderCards(filteredCards)
  }
}

function pageNavigation(isToGallery) {
  const elGallerySection = document.querySelector('.gallery-section')
  const elEditorSection = document.querySelector('.editor-section')

  const elSearch = document.querySelector('.search-container')
  const elDeleteAllBtn = document.querySelector('.delete-saved-memes')
  const elAboutSection = document.querySelector('.about')

  if (isToGallery) {
    elGallerySection.classList.remove('hidden')
    elEditorSection.classList.add('hidden')

    elSearch.classList.remove('hidden')
    elDeleteAllBtn.classList.add('hidden')
    elAboutSection.classList.add('hidden')
  } else {
    elGallerySection.classList.add('hidden')
    elEditorSection.classList.remove('hidden')
    elAboutSection.classList.remove('hidden')
  }
}
