import type { PageLoad } from './$types'

export const prerender = 'auto'

export const load: PageLoad = ({ params }) => {
  return {
    id: params.id
  }
}
