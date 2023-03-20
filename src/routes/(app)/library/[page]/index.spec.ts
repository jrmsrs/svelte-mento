import { describe, it, expect } from 'vitest'
import Page from './+page.svelte'
const page = new Page({ target: document.createElement('div') })

describe('get Last.FM API top albums with X tag', () => {
  // Last.FM API tags are very changeable, so it's better to don't test results
  it('check if first page results have default 50 per page', async () => {
    page.data = { page: '1' }
    await page.fetchData().then(res => {
      expect(res.length).toBe(50)
    })
  }, 10000)
})
