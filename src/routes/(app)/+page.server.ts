import { LASTFM_API_URL, LASTFM_API_TAG } from '$env/static/private'
import { redis } from '$lib/server/redis'
import { Album } from '$root/classes'
import { error } from '@sveltejs/kit'

const pageNumbers = 20 // 1000 releases
const randAlbumIndexes = [0, 0, 0, 0, 0, 0]
const getRandAlbumIndex: (arr: Array<number>) => number = arr => {
  const randNum = Math.ceil(Math.random() * (pageNumbers * 50))
  const found = arr.find(e => e == randNum)
  return found ? getRandAlbumIndex(arr) : randNum
}
randAlbumIndexes.forEach(
  (_, i: number) => (randAlbumIndexes[i] = getRandAlbumIndex(randAlbumIndexes))
)
export const load = ({ fetch, setHeaders }) => {
  const albumData: any[] = []
  const randAlbumData: any[] = []
  const cachePath = `${LASTFM_API_URL}method=tag.gettopalbums&tag=${LASTFM_API_TAG}`

  const fetchData = async () => {
    const getRandAlbums = (data: any) => {
      const albumData: any[] = []
      data.forEach((res: any) => {
        albumData.push(new Album(undefined, res).toPOJO())
      })
      randAlbumIndexes.forEach(randValue => randAlbumData.push(albumData[randValue - 1]))
      const destData = randAlbumData
      redis.set(cachePath, JSON.stringify(destData), 'EX', 600)
      return destData
    }
    const fetchUrlWithCache = async (url: string) => {
      const res = await fetch(url)
      const cacheControl = res.headers.get('cache-control')
      if (cacheControl) setHeaders({ 'cache-control': cacheControl })
      // if (!res.ok) throw error(res.status, 'could not fetch albums')
      const data = await res.json()
      return data.albums.album
    }

    const cached = await redis.get(cachePath)
    if (cached) {
      console.log(`cachehit:  / - ${cached.slice(0, 75)}`)
      return JSON.parse(cached)
    }
    for (let i = 0; i < 20; i++) {
      albumData.push(...(await fetchUrlWithCache(`${cachePath}&page=${i + 1}`)))
    }
    return getRandAlbums(albumData)
  }
  return {
    randAlbumList: fetchData(),
    streamed: { randAlbumList: fetchData() }
  }
}
