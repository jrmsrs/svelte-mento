import { LASTFM_API_URL } from '$env/static/private'
import { redis } from '$lib/server/redis'
import { Album } from '$root/classes'
import { error } from '@sveltejs/kit'

export const load = ({ params, fetch, setHeaders }) => {
  const artist = params.id.split(';')[0]
  const album = params.id.split(';')[1]
  const fetchData = async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const getAlbum = (data: any) => {
      return new Album(data.album).toPOJO()
    }

    const fetchUrlWithCache = async (url: string) => {
      const cached = await redis.get(url)
      if (cached) {
        console.log('cachehit:  ' + cached.slice(0, 80))
        return JSON.parse(cached)
      }
      console.log('cachemiss: ' + params.id)
      const res = await fetch(url)
      const cacheControl = res.headers.get('cache-control')
      if (cacheControl) setHeaders({ 'cache-control': cacheControl })
      // if (!res.ok) throw error(res.status, 'could not fetch album')
      const data = await res.json()
      const destData = getAlbum(data)
      redis.set(url, JSON.stringify(destData), 'EX', 120)
      return destData
    }
    return fetchUrlWithCache(
      `${LASTFM_API_URL}method=album.getinfo&artist=${artist}&album=${album}`
    ).catch(error => error)
  }
  return {
    albumData: fetchData(),
    streamed: { albumData: fetchData() }
  }
}
