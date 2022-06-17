'use strict'

var gCanvas
var gCtx
var lastX
var lastY
var gIsOnMobile = window.matchMedia('(max-width: 800px)').matches
var gIsDrag = false

function init() {
  gCanvas = document.getElementById('canvas')
  gCtx = gCanvas.getContext('2d')

  renderMeme()

  handleTouchEvent(gCanvas)
  gCanvas.ontouchend = isUp

  //hengle drag and drop
  tryDrag(gCanvas)
  gCanvas.onmouseup = isUp

  //focus input text
  gCanvas.addEventListener('dblclick', e => {
    onSelectEl(e)
    document.querySelector('.text-input').focus()
  })
}

function handleTouchEvent(canvas) {
  canvas.ontouchstart = function (e) {
    let rect = this.getBoundingClientRect()

    lastX = e.touches[0].clientX - rect.left
    lastY = e.touches[0].clientY - rect.top

    const idx = getElIdx(lastX, lastY)

    if (idx === null) return // when click is not on text

    gIsDrag = true

    setSelectLine(idx)
    updateInputValue(idx)
    updateDomSelectedLine(idx)

    canvas.ontouchmove = myMove
  }
}

function renderMeme() {
  let meme = getMeme()
  const imgsSrc = getImgs()
  let [imgObj] = imgsSrc.filter(img => img.id === +meme.selectedImgId)

  if (!imgObj) imgObj = meme // when the meme is uploaded from file system

  const image = new Image()
  image.onload = updateMeme

  image.src = imgObj.url
}

function onSelectEl(e) {
  const idx = getElIdx(e.offsetX, e.offsetY)
  updateInputValue(idx)
  setSelectLine(idx)
  updateDomSelectedLine(idx)
  renderMeme()
}

function updateMeme() {
  let width = this.naturalWidth
  let height = this.naturalHeight

  if (gIsOnMobile) {
    gCanvas.width = 300
  } else {
    gCanvas.width = 500
  }

  let heightRatio = (height * gCanvas.width) / width // calculate height ratio
  gCanvas.height = heightRatio

  gCtx.drawImage(this, 0, 0, gCanvas.width, gCanvas.height)

  drawBountries(gCtx)
  drawText()
}

function drawText() {
  const meme = getMeme()

  meme.lines.forEach((line, idx) => {
    //updateing all text lines setting

    gCtx.textAlign = line.align

    gCtx.font = `${line.size}px ${line.font}`
    gCtx.strokeStyle = 'black'

    gCtx.lineWidth = 4
    gCtx.strokeText(line.txt, line.startX, line.startY)
    gCtx.fillStyle = line.color
    gCtx.fillText(line.txt, line.startX, line.startY)

    const textWidth = gCtx.measureText(line.txt).width + gCtx.lineWidth

    //update text postion on canvas
    setTextCoords(idx, line.startX, textWidth, line.startY)
  })
}

function drawBountries(ctx) {
  const { selectedLineIdx, isEdit } = getMeme()
  if (!isEdit) return

  const { startX, startY, size, textWidth } = getMeme().lines[selectedLineIdx]

  const spacing = {
    x: startX - 5,
    y: startY - size,
    height: size + 5,
    width: textWidth + 5,
  }
  ctx.lineWidth = 1
  ctx.strokeStyle = '#EBEBEB'
  ctx.strokeRect(spacing.x, spacing.y, spacing.width, spacing.height)
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

  //check if click is on the text box canvas
  const elIdx = meme.lines.findIndex(line => {
    const { startX, textWidth, startY, size } = line
    return x > startX && x < startX + textWidth && y < startY && y > startY - size
  })

  return elIdx === -1 ? null : elIdx
}

function updateInputValue(idx) {
  if (idx === null) return
  const elTextInput = document.querySelector('.text-input')

  const meme = getMeme()
  emptyInputTxt()

  elTextInput.value = meme.lines[idx].txt
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

function downloadImg() {
  var download = document.getElementById('download')
  var img = gCanvas.toDataURL('image/png')
  download.setAttribute('href', img)
}

function handleUpload(e) {
  e.preventDefault()

  // If there's no file, do nothing
  if (!file.value.length) return

  // Create a new FileReader() object
  let reader = new FileReader()

  // Setup the callback event to run when the file is read
  reader.onload = logFile

  // Read the file
  reader.readAsDataURL(file.files[0])
}

function logFile(e) {
  let str = e.target.result
  let img = document.createElement('img')
  img.src = str

  createCostumMeme(str)
}

function tryDrag(canvas) {
  canvas.onmousedown = function (e) {
    const elIdx = getElIdx(e.offsetX, e.offsetY)

    if (elIdx === null) return // when click not on text

    gIsDrag = true
    setSelectLine(elIdx)

    canvas.onmousemove = myMove
  }
}

function isUp(canvas) {
  gIsDrag = false
  canvas.onmousemove = null
  canvas.ontouchend = null
}

function myMove(e) {
  e.preventDefault()

  if (!gIsDrag) return

  const rect = this.getBoundingClientRect()
  let x
  let y

  if (gIsOnMobile) {
    x = e.touches[0].clientX - rect.left
    y = e.touches[0].clientY - rect.top
  } else {
    x = e.offsetX
    y = e.offsetY
  }

  updateTextPos(x, y)
  renderMeme()
}
