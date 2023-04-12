import { describe, it, expect } from 'vitest'

import { _getRandAlbumIndex } from './+page.server'

describe('get random numbers', () => {
  const arr = new Array<number>(1000)
  it('insert random 1-1000 values into array until fill 1000 empty spaces without repetition', () => {
    for (let i = 0; i < arr.length; i++) {
      arr[i] = _getRandAlbumIndex(arr, 20)
      expect(arr[i]).toBeGreaterThanOrEqual(0)
      expect(arr[i]).toBeLessThanOrEqual(1000)
    }
    // console.log(arr)
  })

  it('compare arr (numerically sorted) to [1, 2, 3, ..., 999, 1000]', () => {
    const arrAux = new Array<number>(1000)

    for (let i = 0; i < 1000; i++) arrAux[i] = i + 1 // generate a 1-1000 linear numberically sorted array

    expect(arr.sort((a, b) => a - b)).toStrictEqual(arrAux)
    // console.log(arr.sort((a, b) => a - b))
  })
})
