'use strict'

var canvas
var ctx

function init() {
  renderMeme()
}

function renderMeme() {
  canvas = document.getElementById('canvas')
  ctx = canvas.getContext('2d')

  const meme = getMeme()

  const imgsSrc = getImgs()

  const [img] = imgsSrc.filter(img => img.id === +meme.selectedImgId)

  const image = new Image(500, 500)
  image.onload = updateMeme

  image.src = img.url
}

function onSelectEl(e) {
  const idx = getElIdx(e.offsetX, e.offsetY)
  updateInputPlaceholder(idx)
  setSelectLine(idx)
  updateDomSelectedLine(idx)
}

function updateMeme() {
  canvas.width = this.naturalWidth
  canvas.height = this.naturalHeight

  ctx.drawImage(this, 0, 0)
  ctx.drawImage(this, 0, 0, this.width, this.height)
  drawText()
}

function drawText() {
  const meme = getMeme()
  const middleX = canvas.width / 2

  meme.lines.forEach((line, idx) => {
    // const posY = line.startY * (idx + 1)

    ctx.textAlign = 'center'
    ctx.font = `${line.size}px impact`
    ctx.strokeStyle = line.color

    ctx.lineWidth = 8
    ctx.strokeText(line.txt, middleX, line.startY)
    ctx.fillStyle = 'white'
    ctx.fillText(line.txt, middleX, line.startY)

    const textWidth = ctx.measureText(line.txt).width + ctx.lineWidth
    const startX = middleX - textWidth / 2
    setTextCoords(idx, startX, textWidth, line.startY)
  })
}

function onUpdateMemeText(text) {
  updateMemeText(text)
  renderMeme()
}

function onAddLine() {
  addTextLine()
  const lineCount = getMeme().lines.length
  updateEditorElements(lineCount)

  renderMeme()
}

function getElIdx(x, y) {
  const meme = getMeme()

  const elIdx = meme.lines.findIndex(line => {
    const { startX, textWidth, startY, size } = line
    return x > startX && x < startX + textWidth && y < startY && y > startY - size
  })

  return elIdx === -1 ? null : elIdx
}

function updateInputPlaceholder(idx) {
  const elTextInput = document.querySelector('.text-input')

  const meme = getMeme()
  elTextInput.value = ''
  elTextInput.placeholder = meme.lines[idx].txt
}

function onUpdateFontSize(el) {
  const diff = el.dataset.font
  updateTextSize(diff)
  renderMeme()
}

function updateEditorElements(linesCount) {
  document.querySelector('.lines-count').innerText = linesCount
}
function updateDomSelectedLine(idx) {
  const txt = idx + 1
  document.querySelector('.curr-line').innerText = txt
}

function onMoveText(el) {
  const diff = el.dataset.moveLine

  moveText(diff)
  renderMeme()
}
