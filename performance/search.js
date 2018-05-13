//@ts-check
import { expensiveWork } from './workers-helpers.js'

let searchQuery,
  startsWith = true

export function searchPeople(
  query,
  people = [],
  findPeople,
  expensiveWork,
  match,
  expensive = false
) {
  const findThesePeople = findPeople.bind(
    null,
    query,
    expensive,
    expensiveWork,
    match
  )
  return people.filter(findThesePeople).sort((a, b) => {
    return a.first_name < b.first_name ? -1 : 1
  })
}

export function findPeople(query, expensive, expensiveWork, match, person) {
  if (expensive) {
    expensiveWork(1)
  }

  const matchName = match({ field: person.name, query })
  const matchAddress = match({ field: person.address, query })
  const matchEmail = match({ field: person.email, query })
  const matchPhone = match({ field: person.phone, query })
  return matchName || matchAddress || matchEmail || matchPhone
}

export function match({ field, query = searchQuery, startsWith = true }) {
  field = field.toLocaleLowerCase()
  query = query.toLocaleLowerCase()
  if (startsWith) {
    return field.indexOf(query) === 0
  } else {
    return field.indexOf(query) > -1
  }
}

export function sortAndFilter(fullList, TAKE, sortByName) {
  const sorted = fullList.sort(sortByName)
  return sorted.slice(0, TAKE)
}
export function sortByName(a, b) {
  return a.name.toLowerCase().localeCompare(b.name.toLowerCase())
}
