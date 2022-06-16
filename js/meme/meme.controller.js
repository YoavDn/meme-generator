'use strict'

var gCanvas
var gCtx
var lastX
var lastY

function init() {
  gCanvas = document.getElementById('canvas')
  gCtx = gCanvas.getContext('2d')
  renderMeme()
  handleTouchEvent(gCanvas)
}

function handleTouchEvent(canvas) {
  canvas.ontouchstart = function (e) {
    e.preventDefault()
    let rect = this.getBoundingClientRect()

    lastX = e.touches[0].clientX - rect.left
    lastY = e.touches[0].clientY - rect.top

    const idx = getElIdx(lastX, lastY)

    updateInputPlaceholder(idx)
    setSelectLine(idx)
    updateDomSelectedLine(idx)
  }
}

function renderMeme() {
  const meme = getMeme()
  const imgsSrc = getImgs()
  const [img] = imgsSrc.filter(img => img.id === +meme.selectedImgId)

  const image = new Image()
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
  gCanvas.width = this.naturalWidth
  gCanvas.height = this.naturalHeight

  gCtx.drawImage(this, 0, 0)
  gCtx.drawImage(this, 0, 0, this.width, this.height)
  drawText()
}

function drawText() {
  const meme = getMeme()
  const middleX = gCanvas.width / 2

  meme.lines.forEach((line, idx) => {
    gCtx.textAlign = 'center'
    gCtx.font = `${line.size}px impact`
    gCtx.strokeStyle = line.color

    gCtx.lineWidth = 4
    gCtx.strokeText(line.txt, middleX, line.startY)
    gCtx.fillStyle = 'white'
    gCtx.fillText(line.txt, middleX, line.startY)

    const textWidth = gCtx.measureText(line.txt).width + gCtx.lineWidth
    const startX = middleX - textWidth / 2
    //update text postion on canvas
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
  if (idx === null) return
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
function updateDomSelectedLine(idx = 0) {
  const txt = idx + 1
  document.querySelector('.curr-line').innerText = txt
}

function onMoveText(el) {
  const diff = el.dataset.moveLine

  moveText(diff)
  renderMeme()
}

function getImgSize() {
  if (window.matchMedia('screen and (max-width:540px)').matches) {
    return {
      width: 400,
    }
    // it matches
  } else {
    // does not match
    width: 500
  }
}
