import xs from 'xstream'

export const rxFetch = (url, options) => xs.fromPromise(
  fetch(url, options)
    .then(response => response.json())
    .then(result => ({ ok: true, message: result }))
    .catch(error => ({ error: true, message: error.message }))
)
