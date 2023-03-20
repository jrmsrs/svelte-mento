let observer
const elements = new Map()

const initObserver = () => {
  return new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const lazy = entry.target
        observer.unobserve(lazy)
        if (elements.has(lazy)) {
          elements.get(lazy)()
          elements.delete(lazy)
        }
      }
    })
  })
}

const getObserver = () => {
  if (!observer) {
    observer = initObserver()
  }
  return observer
}

export const observe = element => {
  const obs = getObserver()
  return new Promise(resolve => {
    elements.set(element, resolve)
    obs.observe(element)
  })
}
