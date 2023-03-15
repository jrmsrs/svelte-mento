import { describe, it, expect } from 'vitest'
import Page from './+page.svelte'
const page = new Page({ target: document.createElement('div') })

describe('get pokeApi list of pokemons', () => {
  // properties aside id and name are null/0/empty because PokeApi ?limit=x endpoint doesn't provides these infos
  it('compares the first page to given json', async () => {
    await page.fetchData().then(res => {
      expect(JSON.stringify(res)).toBe(
        '[{"id":1,"name":"bulbasaur","desc":"","types":[null,null],"stats":{"hp":0,"atk":0,"def":0,"spAtk":0,"spDef":0,"spd":0}},{"id":2,"name":"ivysaur","desc":"","types":[null,null],"stats":{"hp":0,"atk":0,"def":0,"spAtk":0,"spDef":0,"spd":0}},{"id":3,"name":"venusaur","desc":"","types":[null,null],"stats":{"hp":0,"atk":0,"def":0,"spAtk":0,"spDef":0,"spd":0}},{"id":4,"name":"charmander","desc":"","types":[null,null],"stats":{"hp":0,"atk":0,"def":0,"spAtk":0,"spDef":0,"spd":0}},{"id":5,"name":"charmeleon","desc":"","types":[null,null],"stats":{"hp":0,"atk":0,"def":0,"spAtk":0,"spDef":0,"spd":0}},{"id":6,"name":"charizard","desc":"","types":[null,null],"stats":{"hp":0,"atk":0,"def":0,"spAtk":0,"spDef":0,"spd":0}},{"id":7,"name":"squirtle","desc":"","types":[null,null],"stats":{"hp":0,"atk":0,"def":0,"spAtk":0,"spDef":0,"spd":0}},{"id":8,"name":"wartortle","desc":"","types":[null,null],"stats":{"hp":0,"atk":0,"def":0,"spAtk":0,"spDef":0,"spd":0}},{"id":9,"name":"blastoise","desc":"","types":[null,null],"stats":{"hp":0,"atk":0,"def":0,"spAtk":0,"spDef":0,"spd":0}},{"id":10,"name":"caterpie","desc":"","types":[null,null],"stats":{"hp":0,"atk":0,"def":0,"spAtk":0,"spDef":0,"spd":0}},{"id":11,"name":"metapod","desc":"","types":[null,null],"stats":{"hp":0,"atk":0,"def":0,"spAtk":0,"spDef":0,"spd":0}},{"id":12,"name":"butterfree","desc":"","types":[null,null],"stats":{"hp":0,"atk":0,"def":0,"spAtk":0,"spDef":0,"spd":0}},{"id":13,"name":"weedle","desc":"","types":[null,null],"stats":{"hp":0,"atk":0,"def":0,"spAtk":0,"spDef":0,"spd":0}},{"id":14,"name":"kakuna","desc":"","types":[null,null],"stats":{"hp":0,"atk":0,"def":0,"spAtk":0,"spDef":0,"spd":0}},{"id":15,"name":"beedrill","desc":"","types":[null,null],"stats":{"hp":0,"atk":0,"def":0,"spAtk":0,"spDef":0,"spd":0}},{"id":16,"name":"pidgey","desc":"","types":[null,null],"stats":{"hp":0,"atk":0,"def":0,"spAtk":0,"spDef":0,"spd":0}},{"id":17,"name":"pidgeotto","desc":"","types":[null,null],"stats":{"hp":0,"atk":0,"def":0,"spAtk":0,"spDef":0,"spd":0}},{"id":18,"name":"pidgeot","desc":"","types":[null,null],"stats":{"hp":0,"atk":0,"def":0,"spAtk":0,"spDef":0,"spd":0}}]'
      )
    })
  })
  it('compares the last page to given json', async () => {
    page.data = { page: '9' }
    await page.fetchData().then(res => {
      expect(JSON.stringify(res)).toBe(
        '[{"id":145,"name":"zapdos","desc":"","types":[null,null],"stats":{"hp":0,"atk":0,"def":0,"spAtk":0,"spDef":0,"spd":0}},{"id":146,"name":"moltres","desc":"","types":[null,null],"stats":{"hp":0,"atk":0,"def":0,"spAtk":0,"spDef":0,"spd":0}},{"id":147,"name":"dratini","desc":"","types":[null,null],"stats":{"hp":0,"atk":0,"def":0,"spAtk":0,"spDef":0,"spd":0}},{"id":148,"name":"dragonair","desc":"","types":[null,null],"stats":{"hp":0,"atk":0,"def":0,"spAtk":0,"spDef":0,"spd":0}},{"id":149,"name":"dragonite","desc":"","types":[null,null],"stats":{"hp":0,"atk":0,"def":0,"spAtk":0,"spDef":0,"spd":0}},{"id":150,"name":"mewtwo","desc":"","types":[null,null],"stats":{"hp":0,"atk":0,"def":0,"spAtk":0,"spDef":0,"spd":0}},{"id":151,"name":"mew","desc":"","types":[null,null],"stats":{"hp":0,"atk":0,"def":0,"spAtk":0,"spDef":0,"spd":0}}]'
      )
    })
  })
})
