
import { updateDOM } from './UI.js'
import { sortByName } from './search.js'
export let TAKE = 14
let responseCount = 0
let results = []
let workerPoolSize = null
let query

window.addEventListener('type', onType)

function onType(event) {
  const { detail } = event
  query = detail
}

const spliceAndSortWorker = new Worker('worker.sort-splice.js')

export function passMethodsToFilterWorker(workers, ...methodsDescs) {
  workers.map(worker => passMethodsToWorker(worker, ...methodsDescs))
}

export function passMethodsToSpliceAndSortWorker(...methodsDescs) {
  passMethodsToWorker(spliceAndSortWorker, ...methodsDescs)
}

function passMethodsToWorker(worker, ...methodsDescs) {
  const methodsMessage = {
    type: 'LOAD_METHODS',
    payload: [...methodsDescs]
  }
  worker.postMessage(JSON.stringify(methodsMessage))
}

export function splitData(list, numberOfChunks) {
  const chunkList = []
  workerPoolSize = numberOfChunks
  const chunkLength = Math.round(list.length / numberOfChunks)

  for (let i = 0; i <= numberOfChunks; i++) {
    const start = i === 0 ? 0 : chunkLength * i
    const end = start + chunkLength

    const chunk = list.slice(start, end)
    chunkList.push(chunk)
  }

  return chunkList
}

export function generateWorkers(numberOfWorkers) {
  return Array.from(Array(numberOfWorkers).keys()).map(_ => {
    return new Worker('worker.filter.js')
  })
}

/**
 * Loops through the list of workers and attaches
 * an event listener to each one.
 */
export function listenToWorkersResponse(workers) {
  workers.map(worker => worker.addEventListener('message', onWorkerResponse))
}


/**
 * Handles the branching based of the workers message.
 * @param {Object} event: data property extracted from event parameter. `data` contains the values for executing the commands.
 * @param {Object} event.data - The name of the employee.
 */
function onWorkerResponse({ data }) {
  const { type, payload } = JSON.parse(data)
  switch (type) {
    case 'WORKER_LOADED': {
      console.info(payload)
      break
    }
    case 'WORKER_RESULT': {
      const { found } = payload
      const workerRequest = { found, query }
      handleWorkerResponse(workerRequest)
      break
    }
  }
}

function handleWorkerResponse({ found, query }) {
  responseCount++
  results = [...results, ...found]

  if (responseCount > workerPoolSize) {
    throw new Error('WOW! TOO FAAAAST!')
  }

  if (responseCount === workerPoolSize) {
    responseCount = 0
    new Promise(resolve => {
      const filterMergeMessage = {
        type: 'SORT_SPLICE',
        payload: {
          fullList: results,
          TAKE,
          query
        }
      }
      spliceAndSortWorker.postMessage(JSON.stringify(filterMergeMessage))
      // results must be cleared after the operation is done
      // else the data will accumulate
      results = []

      spliceAndSortWorker.onmessage = function ({ data }) {
        const { type, payload } = JSON.parse(data)
        resolve(payload)
      }
    }).then(results => {
      updateDOM(results.sort(sortByName))
      // console.timeEnd('worker')
    })
  }
}

export function expensiveWork(price) {
  if (isNaN(price)) {
    throw new Error('Price must be a number')
  }
  const delay = price
  const start = performance.now()

  while (performance.now() - start < delay) {
    // doing expensive work...
  }
  return price
}
