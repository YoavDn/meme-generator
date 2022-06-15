var gImgs = [
  { id: 1, url: 'images/1.jpg' },
  { id: 2, url: 'images/2.jpg' },
  { id: 3, url: 'images/3.jpg' },
]

var gMeme = {
  selectedImgId: 2,
  selectedLineIdx: 0,

  lines: [{ txt: 'BITCH', size: 40, align: 'center' }],
}

function getMeme() {
  return gMeme
}

function getImgs() {
  return gImgs
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
  gMeme.lines.push({ txt: 'Text', size: 40, align: 'center' })
}
