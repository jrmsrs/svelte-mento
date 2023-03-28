import { LASTFM_API_URL, LASTFM_API_TAG } from '$env/static/private'
import { redis } from '$lib/server/redis'
import { Album } from '$root/classes'
import { error } from '@sveltejs/kit'

export const load = ({ params, fetch, setHeaders }) => {
  const fetchData = async () => {
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
      const cached = await redis.get(url)
      if (cached) {
        console.log(`cachehit:  /library/${params.page} - ${cached.slice(0, 65)}`)
        return JSON.parse(cached)
      }
      console.log('cachemiss: /library/' + params.page)
      const res = await fetch(url)
      const cacheControl = res.headers.get('cache-control')
      if (cacheControl) setHeaders({ 'cache-control': cacheControl })
      // if (!res.ok) throw error(res.status, 'could not fetch albums')
      const data = await res.json()
      const destData = getLibAlbums(data)
      redis.set(url, JSON.stringify(destData), 'EX', 600)
      return destData
    }
    return fetchUrlWithCache(
      `${LASTFM_API_URL}method=tag.gettopalbums&tag=${LASTFM_API_TAG}&page=${params.page}`
    )
  }
  return {
    page: params.page,
    albumList: fetchData(),
    streamed: { albumList: fetchData() }
  }
}
