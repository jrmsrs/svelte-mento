import { describe, it, expect } from 'vitest'
import Page from './+page.svelte'
const page = new Page({ target: document.createElement('div') })

describe('get random numbers', () => {
  const arr = new Array<number>(1000)
  it('insert random 1-151 numbers into array until fill 151 empty spaces without repetition', () => {
    for (let i = 0; i < arr.length; i++) {
      arr[i] = page.getRandAlbumIndex(arr)
      expect(arr[i]).toBeGreaterThanOrEqual(0)
      expect(arr[i]).toBeLessThanOrEqual(1000)
    }
  })
  it('compare arr (numerically sorted) to [1, 2, 3, ..., 999, 1000]', () => {
    const arrAux = new Array<number>(1000)
    for (let i = 0; i < 1000; i++) arrAux[i] = i + 1

    expect(arr.sort((a, b) => a - b)).toStrictEqual(arrAux)
  })
})
