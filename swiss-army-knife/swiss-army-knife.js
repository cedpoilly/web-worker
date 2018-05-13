importScripts('algorithms.js')

addEventListener('message', onmessage)

function onmessage({ data }) {
  switch (data.type) {
    case 'CALC_FIBONACCI': {
      const number = data.payload.input
      console.log('CALC_FIBONACCI', number)
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
      const result = getSun(city).then(result => {
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

      console.log('EXPENSIVE_REQUEST', price)

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
