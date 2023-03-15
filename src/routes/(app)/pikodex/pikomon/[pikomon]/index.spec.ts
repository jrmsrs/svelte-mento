import { describe, it, expect } from 'vitest'
import Page from './+page.svelte'
const page = new Page({ target: document.createElement('div') })

describe('get pokeApi specific pokemon', () => {
  it('compares result of pokemon "blastoise" to given json', async () => {
    page.data = { pikomon: '16' }
    expect(JSON.stringify(await page.fetchData())).toBe(
      '{"id":16,"name":"pidgey","desc":"A common sight in\\nforests and woods.\\nIt flaps its wings at ground\\nlevel to kick up\\nblinding sand.","types":["normal","flying"],"stats":{"hp":40,"atk":45,"def":40,"spAtk":35,"spDef":35,"spd":56}}'
    )
  })
  it('compares result of pokemon "mewtwo" to given json', async () => {
    page.data = { pikomon: '150' }
    expect(JSON.stringify(await page.fetchData())).toBe(
      '{"id":150,"name":"mewtwo","desc":"It was created by\\na scientist after\\nyears of horrific gene splicing and\\nDNA engineering\\nexperiments.","types":["psychic",null],"stats":{"hp":106,"atk":110,"def":90,"spAtk":154,"spDef":90,"spd":130}}'
    )
  })
})
