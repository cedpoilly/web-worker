// @ts-check
let myPeople = []

let myMethodsCollection = new Map()

addEventListener('message', onWorkerMessage)

function onWorkerMessage({ data }) {
  const { type, payload } = JSON.parse(data)
  switch (type) {
    case 'LOAD_METHODS': {
      const methodsDescs = payload
      methodsDescs.map(({ name, string }) => {
        const method = getFunction(string)
        myMethodsCollection.set(name, method)
      })
      break
    }

    case 'LOAD_DATA': {
      loadData(payload)
      break
    }
    case 'QUERY': {
      const { query, expensive } = payload
      queryAndPostBack(query, expensive)
      break
    }
    default: {
      const errorMessage = {
        type: 'WORKER_ERROR',
        payload: new Error('Wrong message passed to worker')
      }
      postMessage(JSON.stringify(errorMessage), undefined)
    }
  }
}

function loadData(chunk) {
  myPeople = chunk
  const infoMessage = {
    type: 'WORKER_INFO',
    payload: 'Worker loaded!'
  }
  postMessage(JSON.stringify(infoMessage), undefined)
}

function queryAndPostBack(query, expensive = false) {
  const match = myMethodsCollection.get('match')
  const expensiveWork = myMethodsCollection.get('expensiveWork')
  const findPeople = myMethodsCollection.get('findPeople')
  const searchPeople = myMethodsCollection.get('searchPeople')
  const found = searchPeople(
    query,
    myPeople,
    findPeople,
    expensiveWork,
    match,
    expensive
  )

  const workDoneMessage = {
    type: 'WORKER_RESULT',
    payload: { found }
  }
  postMessage(JSON.stringify(workDoneMessage), undefined)
}

function getFunction(fnString) {
  function makeFunction(code) {
    return Function('"use strict";return ' + code)()
  }
  return makeFunction(fnString)
}
