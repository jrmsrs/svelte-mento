import { dev } from '$app/environment'
import { LASTAPI_URL, LASTAPI_TAG, CACHE_VERSION, DEFAULT_TTL } from '$env/static/private'
import { redis } from '$lib/server/redis'
import { Album } from '$root/classes'

export const _fetchData = async (
  page: string,
  setHeaders?: (headers: Record<string, string>) => void,
  svelteFetch?: (input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>
) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getLibAlbums = (data: any) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const albums: Record<string, any>[] = []
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data.albums.album.forEach((res: any) => {
      albums.push(new Album(undefined, res).toPOJO())
    })
    return albums
  }
  const fetchUrlWithCache = async (url: string) => {
    const cached = await redis.get(url + CACHE_VERSION)
    try {
      if (cached) {
        if (dev) console.log(`cachehit:  library/${page}@${CACHE_VERSION} - ${cached.slice(0, 93)}`)
        return JSON.parse(cached)
      }
    } catch (error) {
      return { error: 'error ' + error }
    }
    try {
      if (dev) console.log(`cachemiss: library/${page}@${CACHE_VERSION}`)
      const res = svelteFetch ? await svelteFetch(url) : await fetch(url)
      const cacheControl = res.headers.get('cache-control')
      if (cacheControl) setHeaders?.({ 'cache-control': cacheControl })
      // if (!res.ok) throw error(res.status, 'could not fetch albums')
      const data = await res.json()
      const destData = getLibAlbums(data)
      redis.set(url + CACHE_VERSION, JSON.stringify(destData), 'EX', DEFAULT_TTL)
      return destData
    } catch (error) {
      return { error: 'error ' + error }
    }
  }
  return fetchUrlWithCache(`${LASTAPI_URL}method=tag.gettopalbums&tag=${LASTAPI_TAG}&page=${page}`)
}

export const load = ({ params, fetch, setHeaders }) => {
  const albumList = _fetchData(params.page, setHeaders, fetch)
  return {
    page: params.page,
    albumList: albumList,
    lazy: { albumList: albumList }
  }
}
