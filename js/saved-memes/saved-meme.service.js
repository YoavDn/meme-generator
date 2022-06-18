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
  const memeDataUrl = downloadDataUrl()

  const newMeme = Object.assign({}, meme, { id: Date.now(), url: memeDataUrl })
  console.log(newMeme)

  gSavedMemes.push(newMeme)
  _saveMemesToStorage()
}

function _saveMemesToStorage() {
  saveToStorage(STORAGE_KEY, gSavedMemes)
}

function downloadDataUrl() {
  return gCanvas.toDataURL()
}

function deleteAllSavedMemes() {
  localStorage.removeItem(STORAGE_KEY)
}

function deleteById(id) {
  const idx = gSavedMemes.findIndex(savedMeme => savedMeme.id === id)
  gSavedMemes.splice(idx, 1)
}
