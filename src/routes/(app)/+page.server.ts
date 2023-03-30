import { dev } from '$app/environment'
import {
  LASTFM_API_URL,
  LASTFM_API_TAG,
  CACHE_VERSION,
  HOME_CACHE_DURATION,
  DEFAULT_CACHE_DURATION
} from '$env/static/private'
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
      randAlbumIndexes.forEach(randValue => {
        randAlbumData.push(albumData[randValue - 1])
      })
      const destData = randAlbumData
      redis.set(
        cachePath + CACHE_VERSION,
        JSON.stringify(destData),
        'EX',
        HOME_CACHE_DURATION || DEFAULT_CACHE_DURATION
      )
      return destData
    }
    const fetchUrlWithCache = async (url: string) => {
      try {
        const res = await fetch(url)
        const cacheControl = res.headers.get('cache-control')
        if (cacheControl) setHeaders({ 'cache-control': cacheControl })
        // if (!res.ok) throw error(res.status, 'could not fetch albums')
        const data = await res.json()
        return data.albums.album
      } catch (error) {
        return { error: 'error ' + error }
      }
    }

    try {
      const cached = await redis.get(cachePath + CACHE_VERSION)
      if (cached && dev) {
        console.log(`cachehit:  /@${CACHE_VERSION} - ${cached.slice(0, 100)}`)
        return JSON.parse(cached)
      }
    } catch (error) {
      if (dev) console.log('error: ' + error)
      return { error: error }
    }
    if (dev) console.log(`cachemiss: /@${CACHE_VERSION}`)
    for (let i = 0; i < 20; i++) {
      albumData.push(...(await fetchUrlWithCache(`${cachePath}&page=${i + 1}`)))
    }

    return getRandAlbums(albumData)
  }
  const randAlbumList = fetchData()
  return {
    randAlbumList: randAlbumList,
    streamed: { randAlbumList: randAlbumList }
  }
}
