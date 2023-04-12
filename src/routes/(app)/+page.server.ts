import { dev } from '$app/environment'
import { LASTAPI_URL, LASTAPI_TAG, CACHE_VERSION, DEFAULT_TTL, HOME_TTL } from '$env/static/private'
import { redis } from '$lib/server/redis'
import { Album } from '$root/classes'

export const _getRandAlbumIndex: (arr: Array<number>, pageNumbers: number) => number = (
  arr,
  pageNumbers
) => {
  const randNum = Math.ceil(Math.random() * (pageNumbers * 50))
  const found = arr.find(e => e == randNum)
  return found ? _getRandAlbumIndex(arr, pageNumbers) : randNum
}

export const load = ({ fetch, setHeaders }) => {
  const pageNumbers = 20 // 1000 releases
  const randAlbumIndexes = [0, 0, 0, 0, 0, 0]
  randAlbumIndexes.forEach(
    (_, i: number) => (randAlbumIndexes[i] = _getRandAlbumIndex(randAlbumIndexes, pageNumbers))
  )
  const albumData: object[] = []
  const randAlbumData: any[] = []
  const cachePath = `${LASTAPI_URL}method=tag.gettopalbums&tag=${LASTAPI_TAG}`

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
      redis.set(cachePath + CACHE_VERSION, JSON.stringify(destData), 'EX', HOME_TTL || DEFAULT_TTL)
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
      if (cached) {
        if (dev) console.log(`cachehit:  /@${CACHE_VERSION} - ${cached.slice(0, 100)}`)
        return JSON.parse(cached)
      }
    } catch (error) {
      if (dev) console.log('error: ' + error)
      return { error: error }
    }
    if (dev) console.log(`cachemiss: /@${CACHE_VERSION}`)
    const promises = new Array<Promise<any>>()
    for (let i = 0; i < 20; i++) {
      promises.push(fetchUrlWithCache(`${cachePath}&page=${i + 1}`))
    }
    await Promise.all(promises).then(res => {
      res.forEach(albumPageRes => {
        albumData.push(...albumPageRes)
      })
    })

    return getRandAlbums(albumData)
  }
  const randAlbumList = fetchData()
  return {
    randAlbumList: randAlbumList,
    streamed: { randAlbumList: randAlbumList }
  }
}
