'use strict'

const STORAGE_KEY = 'savedMemesDB'
var gSavedMemes = []
var gIsDeleteMode = false

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
  //make cupy of gMeme and add uniqe id
  const newMeme = copyMeme(meme)
  //save to storage

  gSavedMemes = _loadSavedMemes(STORAGE_KEY)
  console.log(gSavedMemes)
  if (gSavedMemes === undefined) {
    gSavedMemes = []
  }
  gSavedMemes.push(newMeme)
  _saveMemesToStorage()
}

function _saveMemesToStorage() {
  saveToStorage(STORAGE_KEY, gSavedMemes)
}

function downloadDataUrl() {
  return gCanvas.toDataURL()
}

function deleteById(e) {
  const id = e.target.parentElement.dataset.imgId
  const idx = gSavedMemes.findIndex(savedMeme => savedMeme.id === +id)

  gSavedMemes.splice(idx, 1)
  _saveMemesToStorage()
  renderSavedMemes()
}
function _loadSavedMemes() {
  return loadFromStorage(STORAGE_KEY)
}

function copyMeme(meme) {
  const memeDataUrl = downloadDataUrl()
  const shallowCopy = Object.assign({}, meme, { id: Date.now(), previewUrl: memeDataUrl })
  return JSON.parse(JSON.stringify(shallowCopy))
}
