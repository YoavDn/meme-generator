'use strict'

var gImgs = [
  { id: 1, url: 'images/1.jpg', keyWords: ['trump', 'politic'] },
  { id: 2, url: 'images/2.jpg', keyWords: ['cute', 'puppy', 'dog'] },
  { id: 3, url: 'images/3.jpg', keyWords: ['cute', 'baby'] },
  { id: 4, url: 'images/4.jpg', keyWords: ['cat', 'cute', 'sleep'] },
  { id: 5, url: 'images/5.jpg', keyWords: ['baby', 'win', 'winner'] },
  { id: 6, url: 'images/6.jpg', keyWords: ['dude', 'funny'] },
  { id: 7, url: 'images/7.jpg', keyWords: ['baby', 'omg', 'funny'] },
  { id: 8, url: 'images/8.jpg', keyWords: ['willi wonka'] },
  { id: 9, url: 'images/9.jpg', keyWords: ['funny', 'evil'] },
  { id: 10, url: 'images/10.jpg', keyWords: ['obama', 'funny', 'politic'] },
  { id: 11, url: 'images/11.jpg', keyWords: ['gay', 'nba', 'sports'] },
  { id: 12, url: 'images/12.jpg', keyWords: ['you'] },
  { id: 13, url: 'images/13.jpg', keyWords: ['decaprio', 'win', 'happy'] },
  { id: 14, url: 'images/14.jpg', keyWords: ['matrix'] },
  { id: 15, url: 'images/15.jpg', keyWords: ['pirate'] },
  { id: 16, url: 'images/16.jpg', keyWords: ['omg', 'funny', 'star track'] },
  { id: 17, url: 'images/17.jpg', keyWords: ['putin', 'politic'] },
  { id: 18, url: 'images/18.jpg', keyWords: ['buz', 'toy story', 'funny'] },
]

function setImg(imgId) {
  setMeme(imgId)
}

function getImgs() {
  return gImgs
}

function filterCardsBySearch(query) {
  const filteredCards = gImgs.filter(card => {
    return card.keyWords.some(word => word === query)
  })

  if (filteredCards.length === 0) return null

  return filteredCards
}
