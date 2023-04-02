import { dev } from '$app/environment'
import { CACHE_VERSION, DEFAULT_TTL, LASTAPI_URL } from '$env/static/private'
import { redis } from '$lib/server/redis'
import { Album } from '$root/classes'

export const load = ({ params, fetch, setHeaders }) => {
  const artist = params.id.split(';')[0]
  const album = params.id.split(';')[1]
  const fetchData = async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const getAlbum = (data: any) => {
      return new Album(data.album).toPOJO()
    }

    const fetchUrlWithCache = async (url: string) => {
      try {
        const cached = await redis.get(url + CACHE_VERSION)
        if (cached && dev) {
          console.log(
            `cachehit:  ${params.id.slice(0, 20)}...@${CACHE_VERSION} - ${cached.slice(0, 76)}`
          )
          return JSON.parse(cached)
        }
      } catch (error) {
        if (dev) console.log('error: ' + error)
        return { error: error }
      }
      try {
        if (dev) console.log(`cachemiss: ${params.id.slice(0, 20)}...@${CACHE_VERSION}`)
        const res = await fetch(url)
        const cacheControl = res.headers.get('cache-control')
        if (cacheControl) setHeaders({ 'cache-control': cacheControl })
        // if (!res.ok) throw error(res.status, 'could not fetch album')
        const data = await res.json()
        const destData = getAlbum(data)
        redis.set(url + CACHE_VERSION, JSON.stringify(destData), 'EX', DEFAULT_TTL)
        return destData
      } catch (error) {
        return { error: 'error ' + error }
      }
    }
    return fetchUrlWithCache(`${LASTAPI_URL}method=album.getinfo&artist=${artist}&album=${album}`)
  }
  const albumData = fetchData()
  return {
    albumName: album.toLowerCase(),
    artistName: artist.toLowerCase(),
    albumData: albumData,
    streamed: { albumData: albumData }
  }
}
