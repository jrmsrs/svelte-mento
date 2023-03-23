/**
 * just a snapshot of (available) imgUrls from '1001 albums you must hear before you die' top 1000 albums
 * since it is a very changeable data
 * */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs')
const axios = require('axios')

const promises = []
const url =
  'https://ws.audioscrobbler.com/2.0/?api_key=9d5f3b1566bea07f91216801dbae8108&format=json&'

const imgUrlCache = []

for (let i = 0; i < 20; i++) {
  promises.push(
    axios.get(
      `${url}method=tag.gettopalbums&tag=1001+albums+you+must+hear+before+you+die&page=${i + 1}`
    )
  )
}
Promise.all(promises).then(response => {
  response.forEach(res => {
    res.data.albums.album.forEach(album => {
      if (album.image[3]['#text'] !== '' && imgUrlCache.length < 5)
        imgUrlCache.push(album.image[3]['#text'])
    })
  })
  const filepath = 'src/img-cacheurls.db.ts'
  const content = `export const imgCacheUrls = ${JSON.stringify(imgUrlCache)};`

  fs.writeFile(filepath, content, err => {
    if (err) {
      const fs = require('fs')
      fs.writeFile(filepath, 'export const imgCacheUrls = []', err => {
        if (err) return
      })
      return console.log('connection failed generated default src/img-cacheurls.db.ts')
    }
    console.log('src/img-cacheurls.db.ts successfully generated')
  })
})
