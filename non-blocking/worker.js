importScripts('fibonacci.js')

addEventListener('message', onmessage)

function onmessage() {
  const result = calculateFibonacci('WORKER')
  postMessage(result)
}
