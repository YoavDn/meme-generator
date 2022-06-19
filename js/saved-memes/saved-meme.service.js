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
  //make cupy of gMeme and add it uniqe id
  const newMeme = getNewMeme(meme)
  //save to storage
  gSavedMemes.push(newMeme)
  console.log(gSavedMemes)
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

// function saveMemeImg(meme) {
//   const newMeme = Object.assign({}, meme)
//   newMeme.lines = []
//   return newMeme
// }

function getNewMeme(meme) {
  const memeDataUrl = downloadDataUrl()

  const shallowCopy = Object.assign({}, meme, { id: Date.now(), previewUrl: memeDataUrl })
  return JSON.parse(JSON.stringify(shallowCopy))
}
