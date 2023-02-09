// @ts-nocheck
export const prerender = 'auto';

export const load = ({ params }) => {
  return {
    page: params.page
  }
}