let searchQuery, startsWith = true
function searchPeople (_query) {
  searchQuery = _query
  return people
  .filter(findPeople)
  .sort((a, b) => {
    return (a.first_name < b.first_name) ? -1 : 1
  })
}

function findPeople (person) {
  const matchName = match({field: person.name})
  const matchAddress = match({field: person.address})
  const matchEmail = match({field: person.email})
  const matchPhone = match({field: person.phone})
  // const matchAge = !isNaN(query) ? person.age === query : false
  // const matchGender = person.gender === query
  // return matchName || matchAge || matchGender
  // const matchFirstName = person.first_name.toLocaleLowerCase().indexOf(searchQuery) > -1
  // const matchLastName = person.last_name.toLocaleLowerCase().indexOf(searchQuery) > -1
  // const matchUri = person.uri.toLocaleLowerCase().indexOf(searchQuery) > -1
  // const matchTitle = person.title 
  //   ? person.title.toLocaleLowerCase().indexOf(searchQuery) > -1
  //   : false

  // return matchFirstName || matchLastName || matchTitle || matchUri
  return matchName || matchAddress || matchEmail ||  matchPhone 
}

function match ({field, query = searchQuery, startsWith = true}) {
  field = field.toLocaleLowerCase()
  query = query.toLocaleLowerCase()  
  if (startsWith) {
    return field.indexOf(query) === 0
  } else {
    return field.indexOf(query) > -1
  }
 }