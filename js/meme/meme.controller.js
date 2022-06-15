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
  const [imgSrc] = imgsSrc.filter(img => img.id === meme.selectedImgId)

  const image = new Image(500, 500)
  image.onload = updateMeme

  image.src = imgSrc.url
}

function selectEl(e) {
  console.log(e.offsetX, e.offsetY)

  const elIdx = getElIdx(e.offsetX, e.offsetY)
  updateInputPlaceholder(elIdx)
  setSelectLine(elIdx)
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
    const posY = 70 * (idx + 1)
    ctx.textAlign = 'center'
    ctx.font = `${line.size}px impact`
    ctx.strokeStyle = line.color

    ctx.lineWidth = 8
    ctx.strokeText(line.txt, middleX, posY)
    ctx.fillStyle = 'white'
    ctx.fillText(line.txt, middleX, posY)

    const textWidth = ctx.measureText(line.txt).width + ctx.lineWidth
    const startX = middleX - textWidth / 2
    setTextCoords(idx, startX, textWidth, posY)
  })
}

function onUpdateMemeText(text) {
  updateMemeText(text)
  renderMeme()
}

function onAddLine() {
  addTextLine()
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
