/**
 * handles with PokéAPI /pokemon-species endpoint
 */
interface specie {
  id: number
  name: string
  flavor_text_entries?: {
    flavor_text: string
  }[] // means flavor_text_entries is a array of flavor_text
}

/**
 * handles with PokéAPI /pokemon endpoint
 */
interface pikomon {
  url?: string
  name: string
  types?: {
    type: {
      name: string
    }
  }[] // means types is a array of type, which has property name: string, etc
  stats: {
    base_stat: number
  }[]
}

/**
 * usable object class definition, convert Api response to interface
 * that get only useful attributes then format to be more legible and
 * accessible
 */
export class PikomonData {
  public id?: number
  public name: string
  public desc?: string
  public types: Array<string | undefined>
  public stats: {
    hp: number
    atk: number
    def: number
    spAtk: number
    spDef: number
    spd: number
  }

  constructor(pkm?: pikomon, specie?: specie) {
    this.id = specie?.id
    this.name = String(specie?.name || pkm?.name)
    this.desc = specie?.flavor_text_entries?.[1]?.flavor_text?.replaceAll('\f', ' ') || ''
    this.types = [pkm?.types?.[0].type.name, pkm?.types?.[1]?.type.name]
    this.stats = {
      hp: pkm?.stats?.[0].base_stat || 0,
      atk: pkm?.stats?.[1].base_stat || 0,
      def: pkm?.stats?.[2].base_stat || 0,
      spAtk: pkm?.stats?.[3].base_stat || 0,
      spDef: pkm?.stats?.[4].base_stat || 0,
      spd: pkm?.stats?.[5].base_stat || 0
    }

    // workaround to get id by url string, since /pokemon?limit=X endpoint provides only name and url
    const urlPokemonPattern = 'https://pokeapi.co/api/v2/pokemon/'
    if (!specie && pkm) {
      this.id = Number(pkm.url?.slice(urlPokemonPattern.length, -1))
    }
  }

  public debug() {
    console.log(this)
  }
}
