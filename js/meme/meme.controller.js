'use strict'

var gCanvas
var gCtx
var lastX
var lastY
var gIsOnMobile = window.matchMedia('(max-width: 800px)').matches

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
  let meme = getMeme()
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
  let width = this.naturalWidth
  let height = this.naturalHeight

  let heightRatio = (height * gCanvas.width) / width // calculate height ratio

  if (gIsOnMobile) {
    width = 300
  }

  gCanvas.width = 500
  gCanvas.height = heightRatio

  gCtx.drawImage(this, 0, 0, gCanvas.width, heightRatio)
  drawText()
}

function drawText() {
  const meme = getMeme()
  const middleX = gCanvas.width / 2

  meme.lines.forEach((line, idx) => {
    //updateing all text lines setting

    gCtx.textAlign = 'center'
    gCtx.font = `${line.size}px ${line.font}`
    gCtx.strokeStyle = 'black'

    gCtx.lineWidth = 4
    gCtx.strokeText(line.txt, middleX, line.startY)
    gCtx.fillStyle = line.color
    gCtx.fillText(line.txt, middleX, line.startY)

    const textWidth = gCtx.measureText(line.txt).width + gCtx.lineWidth
    const startX = middleX - textWidth / 2
    //update text postion on canvas
    setTextCoords(idx, startX, textWidth, line.startY)
  })
}

function onUpdateMemeText(text) {
  const { lines } = getMeme()
  if (lines.length === 0) {
    alert('Line is Not selected')
    return
  }
  updateMemeText(text)
  renderMeme()
}

function onAddLine() {
  addTextLine()
  const lineCount = getMeme().lines.length

  updateDomLineCount(lineCount)
  emptyInputTxt()

  renderMeme()
}

function onDeleteLine() {
  deleteLine()
  const lineCount = getMeme().lines.length
  updateDomLineCount(lineCount)
  updateDomSelectedLine()
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
  emptyInputTxt()
  elTextInput.placeholder = meme.lines[idx].txt
}

function onUpdateFontSize(el) {
  const diff = el.dataset.font
  updateTextSize(diff)
  renderMeme()
}

function updateDomLineCount(linesCount) {
  document.querySelector('.lines-count').innerText = linesCount
}

function updateDomSelectedLine(idx = 0) {
  const meme = getMeme()
  let txt = idx + 1
  if (meme.lines.length === 0) txt = 0
  document.querySelector('.curr-line').innerText = txt
}

function onMoveText(el) {
  const diff = el.dataset.moveLine

  moveText(diff)
  renderMeme()
}

function onUpdateFont(value) {
  changeTextFont(value)
  renderMeme()
}

function onChangeTextColor(value) {
  changeTextColor(value)
  renderMeme()
}

function onAddEmoji(btn) {
  let textValue = document.querySelector('.text-input').value
  const picker = new EmojiButton()
  picker.togglePicker(btn)
  picker.on('emoji', emoji => {
    textValue += emoji
    updateMemeText(textValue)
    renderMeme()
  })
}

function emptyInputTxt() {
  const elTextInput = document.querySelector('.text-input')
  elTextInput.value = ''
}

function isOnMobile() {
  console.log('hi')
}

function downloadImg() {
  var download = document.getElementById('download')
  var img = gCanvas.toDataURL('image/png')
  download.setAttribute('href', img)
}
