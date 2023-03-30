import { dev } from '$app/environment'

/**
 * handles with Last.FM API /?method=user.topartists endpoint
 */
export interface ArtistData {
  mbid: string
  name: string
  image: {
    size: string
    '#text': string
  }[]
}

/**
 * handles with Last.FM API /?method=album.getinfo endpoint
 */
interface AlbumData {
  mbid: string
  image: {
    size: string
    '#text': string
  }[]
  name: string
  artist: string
  tracks: {
    track: {
      name: string
      duration: number
      '@attr': { rank: number }
    }[]
  }
  tags: {
    tag: { name: string }[]
  }
}

/**
 * handles with Last.FM API /?method=user.topalbums endpoint
 */
interface AlbumDataFromList {
  mbid: string
  image: {
    size: string
    '#text': string
  }[]
  name: string
  artist: { name: string }
}

/**
 * usable object class definition for Last.FM API artist endpoints, convert response
 * to interface that get only useful attributes then format to be more legible
 * and accessible
 */
export class Artist {
  public id: string
  public name: string

  constructor(artist: ArtistData) {
    this.id = artist?.mbid
    this.name = artist?.name
  }

  /**
   * console.log(obj)
   */
  public debug = () => {
    console.log(this)
  }

  /**
   * get an array of ArtistData (HTTP response from /?method=library.getartists),
   * starting from artists.artist attribute, then returns an array of Artist
   */
  public static array = (array: ArtistData[]) => {
    const artists = new Array<Artist>()
    array.forEach(element => {
      artists.push(new Artist(element))
    })
    return artists
  }
}

/**
 * usable object class definition for Last.FM API album endpoints, convert response
 * to interface that get only useful attributes then format to be more legible
 * and accessible
 */
export class Album {
  public id: string
  public name: string
  public imgUrl: string
  public artist: string
  public tags?: string[]
  public tracks?: {
    name: string
    duration: number
    number?: number
  }[]

  constructor(album?: AlbumData, albumFromList?: AlbumDataFromList) {
    //this.id = album?.mbid || albumFromList?.mbid || ''
    this.id = album
      ? this.getID(album?.artist || '', album.name || '')
      : this.getID(albumFromList?.artist.name || '', albumFromList?.name || '') || ''
    this.name = album?.name || albumFromList?.name || ''
    this.imgUrl = album
      ? this.getImageUrl(album?.image)
      : this.getImageUrl(albumFromList?.image) || ''
    this.artist = album?.artist || albumFromList?.artist.name || ''
    this.tags = this.getTags(album?.tags)
    this.tracks = this.getTracks(album?.tracks)
  }

  private getID = (artist?: string, album?: string) => {
    const encodedArtist = encodeURIComponent(artist || '')
    const encodedAlbum = encodeURIComponent(album || '')

    return `${encodedArtist};${encodedAlbum}`
  }

  private getImageUrl = (image?: { size: string; '#text': string }[]) => {
    return image?.[image.length - 1]?.['#text'] || ''
  }

  private getTags = (tags?: { tag: { name: string }[] }) => {
    return tags?.tag?.map?.(tag => tag.name) || []
  }

  private getTracks = (tracks?: {
    track: { name: string; duration: number; '@attr': { rank: number } }[]
  }) => {
    return (
      tracks?.track?.map(({ name, duration, '@attr': { rank } = {} }) => ({
        name,
        duration,
        number: rank
      })) || []
    )
  }

  /**
   * console.log(obj)
   */
  public debug = () => {
    if (dev) console.log(this)
  }
  /**
   * convert this Album instance to an Plain Old Javascript Object, which allows
   * to be serialized from server
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public toPOJO(): Record<string, any> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const plainObj: Record<string, any> = {}
    for (const [key, value] of Object.entries(this)) {
      if (typeof value !== 'function') {
        plainObj[key] = value
      }
    }
    return plainObj
  }
  /**
   * get an array of AlbumData (HTTP response from /?method=library.getartists),
   * starting from artists.artist attribute, then returns an array of Artist
   */
  public static array = (array: AlbumData[]) => {
    const albums = new Array<Album>()
    array.forEach(element => {
      albums.push(new Album(element))
    })
    return albums
  }
}
