// var gImgs = [
//   { id: 1, url: 'images/1.jpg' },
//   { id: 2, url: 'images/2.jpg' },
//   { id: 3, url: 'images/3.jpg' },
//   { id: 4, url: 'images/4.jpg' },
//   { id: 5, url: 'images/5.jpg' },
//   { id: 6, url: 'images/6.jpg' },
//   { id: 7, url: 'images/7.jpg' },
// ]

var gMeme = {
  selectedImgId: 2,
  selectedLineIdx: 0,

  lines: [{ txt: 'Hellow world', size: 40, align: 'center', font: 'impact', color: 'white', startY: 70 }],
}

function getMeme() {
  return gMeme
}

function setMeme(imgId) {
  const savedMemes = getSaveMemes()
  //chack if the id is already Exists
  const savedMeme = savedMemes.find(meme => {
    return meme.id === +imgId
  })

  if (!savedMeme) {
    //
    gMeme.selectedImgId = imgId
  } else {
    gMeme = savedMeme
  }

  init()
}

function updateMemeText(text) {
  gMeme.lines[gMeme.selectedLineIdx].txt = text
}

function setTextCoords(idx, startX, textWidth, startY) {
  gMeme.lines[idx].textWidth = textWidth
  gMeme.lines[idx].startX = startX
  gMeme.lines[idx].startY = startY
}

function addTextLine() {
  gMeme.lines.push({
    txt: 'Text',
    size: 40,
    align: 'center',
    font: 'impact',
    color: 'white',
    startY: 70 * (gMeme.lines.length + 1),
  })
}

function deleteLine() {
  gMeme.lines.splice(gMeme.selectedLineIdx, 1)
  gMeme.selectedLineIdx = 0
}

function setSelectLine(idx) {
  if (idx === null) return
  gMeme.selectedLineIdx = idx
}

function updateTextSize(diff) {
  const newSize = diff === 'big' ? 2 : -2

  const selectedLine = gMeme.lines[gMeme.selectedLineIdx]
  selectedLine.size += newSize
}

function moveText(diff) {
  const newPos = diff === 'up' ? -10 : 10

  const selectedLine = gMeme.lines[gMeme.selectedLineIdx]

  selectedLine.startY += newPos
}

function emptyElsFromMeme() {
  gMeme.lines.length = 0
  updateDomLineCount(gMeme.lines.length)
  updateDomSelectedLine()
}

function changeTextFont(value) {
  gMeme.lines[gMeme.selectedLineIdx].font = value
}

function changeTextColor(clrValue) {
  gMeme.lines[gMeme.selectedLineIdx].color = clrValue
}
