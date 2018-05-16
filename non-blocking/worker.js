importScripts('fibonacci.js')

addEventListener('message', onmessage)

function onmessage(event) {
  const INPUT = event.data
  const result = calculateFibonacci(INPUT, 'WORKER')
  postMessage(result)
}


function onmessage(event) {
  const INPUT = event.data
  const result = calculateFibonacci(INPUT, 'WORKER')
  // console.log('Execution is synchronous but does not block the main thread.')
  postMessage(result)
}
