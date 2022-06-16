'use strict'

const STORAGE_KEY = 'savedMemesDB'
var gSavedMemes = []

function getSaveMemes() {
  let savedMemes = loadFromStorage(STORAGE_KEY)
  if (savedMemes === null) {
    gSavedMemes = []
  } else {
    gSavedMemes = savedMemes
  }

  return gSavedMemes
}

function saveMeme(meme) {
  const memeDataUrl = downloadImg()
  const newMeme = Object.assign({}, meme, { id: Date.now(), url: memeDataUrl })

  gSavedMemes.push(newMeme)
  _saveMemesToStorage()
}

function _saveMemesToStorage() {
  saveToStorage(STORAGE_KEY, gSavedMemes)
}

function downloadImg() {
  return gCanvas.toDataURL('image/png')
}
