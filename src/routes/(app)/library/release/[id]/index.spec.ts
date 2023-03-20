import { describe, it, expect } from 'vitest'
import Page from './+page.svelte'
const page = new Page({ target: document.createElement('div') })

describe('get Last.FM API specific album info', () => {
  it('compares result of album "Pink Floyd - Wish You Were Here" to given json', async () => {
    page.data = { id: 'Pink Floyd;Wish You Were Here' }
    expect(JSON.stringify(await page.fetchData())).toBe(
      '{"id":"Pink%20Floyd;Wish%20You%20Were%20Here","name":"Wish You Were Here","imgUrl":"https://lastfm.freetls.fastly.net/i/u/300x300/394cfbc6b2a74766a4364778c641ca51.png","artist":"Pink Floyd","tags":["progressive rock","1975","classic rock","70s","rock"],"tracks":[{"name":"Shine on You Crazy Diamond","duration":230,"number":1},{"name":"Welcome to the Machine","duration":519,"number":2},{"name":"Have a Cigar","duration":269,"number":3},{"name":"Wish You Were Here","duration":629,"number":4},{"name":"Shine On You Crazy Diamond (Part Two)","duration":742,"number":5}]}'
    )
  }, 10000)

  it('compares result of album "The Notorious B.I.G. - Ready to Die The Remaster" to given json', async () => {
    page.data = { id: 'The Notorious B.I.G.;Ready to Die The Remaster' }
    expect(JSON.stringify(await page.fetchData())).toBe(
      '{"id":"The%20Notorious%20B.I.G.;Ready%20To%20Die%20The%20Remaster","name":"Ready To Die The Remaster","imgUrl":"https://lastfm.freetls.fastly.net/i/u/300x300/96656dbcf00fcf4dc45fbf0323b84b2e.jpg","artist":"The Notorious B.I.G.","tags":["hip-hop","rap","hip hop","gangsta rap","biggie"],"tracks":[{"name":"Intro","duration":203,"number":1},{"name":"Things Done Changed","duration":237,"number":2},{"name":"Gimme the Loot","duration":285,"number":3},{"name":"Machine Gun Funk","duration":255,"number":4},{"name":"Warning","duration":220,"number":5},{"name":"Ready to Die","duration":264,"number":6},{"name":"One More Chance","duration":283,"number":7},{"name":"#!*@ Me - Interlude","duration":91,"number":8},{"name":"The What","duration":239,"number":9},{"name":"Juicy","duration":302,"number":10},{"name":"Everyday Struggle","duration":319,"number":11},{"name":"Me And My B*tch","duration":240,"number":12},{"name":"Big Poppa","duration":252,"number":13},{"name":"Respect","duration":321,"number":14},{"name":"Friend of Mine","duration":208,"number":15},{"name":"Unbelievable","duration":223,"number":16},{"name":"Suicidal Thoughts","duration":170,"number":17},{"name":"Who Shot Ya","duration":319,"number":18},{"name":"Just Playing (Dreams)","duration":163,"number":19}]}'
    )
  }, 10000)
})
