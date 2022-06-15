var gImgs = [
  { id: 1, url: 'images/1.jpg' },
  { id: 2, url: 'images/2.jpg' },
  { id: 3, url: 'images/3.jpg' },
  { id: 4, url: 'images/4.jpg' },
  { id: 5, url: 'images/5.jpg' },
  { id: 6, url: 'images/6.jpg' },
  { id: 7, url: 'images/7.jpg' },
]

var gMeme = {
  selectedImgId: 2,
  selectedLineIdx: 0,

  lines: [{ txt: 'Hellow world', size: 40, align: 'center', color: 'black' }],
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
  gMeme.lines.push({ txt: 'Text', size: 40, align: 'center', color: 'black' })
}

function setSelectLine(idx) {
  if (idx === null) return
  gMeme.selectedLineIdx = idx
}

function setMeme(imgId) {
  gMeme.selectedImgId = imgId
  init()
}

function updateTextSize(diff) {
  const newSize = diff === 'big' ? 2 : -2

  const selectedLine = gMeme.lines[gMeme.selectedLineIdx]
  selectedLine.size += newSize
}
