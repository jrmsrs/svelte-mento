// @ts-nocheck
export const prerender = 'auto'

export const load = ({ params }) => {
  return {
    pikomon: params.pikomon,
  }
}
