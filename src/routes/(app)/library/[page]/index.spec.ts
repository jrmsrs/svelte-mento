import { describe, it, expect } from 'vitest'
import { _fetchData } from './+page.server'

describe('get Last.FM API top albums with X tag', () => {
  // Last.FM API tags are very changeable, so it's better to don't test results
  it('check if first page results have default 50 per page', async () => {
    await _fetchData('1').then(res => {
      expect(res.length).toBe(50)
    })
  }, 10000)
  it('check if seventh page results have default 50 per page', async () => {
    await _fetchData('7').then(res => {
      expect(res.length).toBe(50)
    })
  }, 10000)
})
