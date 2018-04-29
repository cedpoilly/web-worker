importScripts('people.js', 'search.js')

addEventListener('message', onmessage)

function onmessage({data}) {
  // console.time('worker-search')
  const results = searchPeople(data.query)
  // console.timeEnd('worker-search')
  postMessage(results.slice(0, data.TAKE))
}
