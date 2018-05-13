// @ts-check
// importScripts('search.js')
// TODO: pass function as string.
// Deconstruct here & rebuild here.
// Store
let methodsCollection = new Map()

addEventListener('message', onWorkerMessage)

function onWorkerMessage({ data }) {
  const { type, payload } = JSON.parse(data)

  switch (type) {
    case 'LOAD_METHODS': {
      const methodsDescs = payload
      methodsDescs.map(({ name, string }) => {
        const method = getFunction(string)
        methodsCollection.set(name, method)
      })
      break
    }
    case 'EXPENSIVE': {
      const { price, fnString } = payload
      const doExpensiveWork = getFunction(fnString)
      doExpensiveWork(price)
      break
    }
    case 'SORT_SPLICE': {
      const { fullList, TAKE } = payload
      const sortByName = methodsCollection.get('sortByName')
      const sortAndFilter = methodsCollection.get('sortAndFilter')

      const finalResults = sortAndFilter(fullList, TAKE, sortByName)

      const finalResultsMessage = {
        type: 'WORKER_INFO',
        payload: finalResults
      }
      postMessage(JSON.stringify(finalResultsMessage), undefined)
      break
    }

    default: {
      const errorMessage = {
        type: 'WORKER_ERROR',
        payload: new Error('Wrong message passed to worker')
      }
      postMessage(errorMessage, null)
    }
  }
}

function getFunction(fnString) {
  function makeFunction(code) {
    return Function('"use strict";return ' + code)()
  }
  return makeFunction(fnString)
}
