// @ts-check
import { people } from './people.js'
import {
  searchPeople,
  findPeople,
  sortByName,
  sortAndFilter,
  match
} from './search.js'
import {
  initialiseControls,
  createOutputList,
  toggles,
  setupToggle,
  animate,
  updateDOM
} from './UI.js'
import {
  TAKE,
  expensiveWork,
  splitData,
  generateWorkers,
  listenToWorkersResponse,
  passMethodsToSpliceAndSortWorker,
  passMethodsToFilterWorker
} from './workers-helpers.js'

const WORKERS_POOL_SIZE = 6

// let responseCount = 0
let results = []
let query = ''
const { workerFilterToggle, workers } = init()

// IMPLEMENTATION DETAILS

function init() {
  window.addEventListener('load', launch)
  window.addEventListener('type', onType)

  createOutputList(TAKE)

  initialiseControls()
  setupToggle('worker', toggles.worker)
  setupToggle('expensive', toggles.expensive)

  // INSTANTIATE & LOAD WORKERS
  const chunks = splitData(people.sort(sortByName), WORKERS_POOL_SIZE)
  const workers = generateWorkers(WORKERS_POOL_SIZE)

  listenToWorkersResponse(workers)

  const spliceAndSortMethods = [
    { name: 'sortByName', string: sortByName.toString() },
    { name: 'sortAndFilter', string: sortAndFilter.toString() }
  ]
  const fitlerMethods = [
    { name: 'match', string: match.toString() },
    { name: 'expensiveWork', string: expensiveWork.toString() },
    { name: 'searchPeople', string: searchPeople.toString() },
    { name: 'findPeople', string: findPeople.toString() }
  ]
  passMethodsToSpliceAndSortWorker(...spliceAndSortMethods)
  passMethodsToFilterWorker(workers, ...fitlerMethods)

  workers.map((worker, index) => {
    const message = {
      type: 'LOAD_DATA',
      payload: chunks[index]
    }
    worker.postMessage(JSON.stringify(message))
  })

  return { workers }
}

function launch() {
  search()
  animate()
}

function onType(event) {
  const { detail } = event
  search(detail)
}
export function search(_query = '') {
  query = _query
  if (!toggles.worker) {
    queryMainThread(query, searchPeople.toString(), toggles.expensive)
  } else {
    queryWorker(query, searchPeople.toString(), toggles.expensive)
  }
}

function queryMainThread(query, fnString, expensive = false) {
  // console.time('search')
  results = searchPeople(
    query,
    people,
    findPeople,
    expensiveWork,
    match,
    expensive
  )
  const finalResults = sortAndFilter(results, TAKE)
  // console.timeEnd('search')
  updateDOM(finalResults)
}

function queryWorker(query, fnString, expensive = false) {
  // console.time('worker')
  const message = {
    type: 'QUERY',
    payload: {
      query,
      fnString,
      expensive
    }
  }
  workers.map(worker => worker.postMessage(JSON.stringify(message)))
}
