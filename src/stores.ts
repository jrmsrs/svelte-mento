import { browser } from '$app/environment'
import { writable } from 'svelte/store'

export const loading$ = writable(false)
export let storedDark: string
if (browser) storedDark = localStorage.dark || 'true'
