'use strict'

function onShowAbout(link) {
  const elGallerySection = document.querySelector('.gallery-section')
  const elEditorSection = document.querySelector('.editor-section')
  const elAboutSection = document.querySelector('.about')
  elAboutSection.classList.remove('hidden')

  elEditorSection.classList.add('hidden')
  elGallerySection.classList.add('hidden')

  const elNavLinks = document.querySelectorAll('.nav-link')

  elNavLinks.forEach(link => {
    link.classList.remove('nav-link-active')
  })
  link.classList.add('nav-link-active')
}
