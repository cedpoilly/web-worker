importScripts('algorithms.js')

addEventListener('message', onmessage)

function onmessage({ data }) {
  switch (data.type) {
    case 'CALC_FIBONACCI': {
      const number = data.payload.input

      const result = fibonacci(number)

      const message = {
        type: 'RESPONSE_FOBINACCI',
        payload: { result }
      }
      postMessage(message)
      break
    }
    case 'GET_SUN': {
      const city = data.payload.input

      getSun(city).then(result => {
        const message = {
          type: 'RESPONSE_SUN',
          payload: { result }
        }
        postMessage(message)
      })
      break
    }
    case 'EXPENSIVE_REQUEST': {
      const price = data.payload.input

      const result = expensiveWork(price)
      const message = {
        type: 'RESPONSE_EXPENSIVE',
        payload: { result }
      }
      postMessage(message)
      break
    }
  }
}
