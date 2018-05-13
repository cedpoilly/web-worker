const output = document.querySelector('.js-output')

export let toggles = {
  worker: true,
  expensive: true
}

export function initialiseControls() {
  const searchBox = document.querySelector('.js-searchbox')
  searchBox.addEventListener('input', onType)
}

function onType({ target: { value } }) {
  // console.log(value)
  const typeEvent = new CustomEvent('type', {
    bubbles: false,
    detail: value
  })
  window.dispatchEvent(typeEvent)
}

export function setupToggle(toggleName, toggleValue) {
  const toggle = document.querySelector(`#${toggleName}-filter`)
  toggle.checked = toggleValue

  toggle.addEventListener('change', ({ target: { checked } }) => {
    toggles[toggleName] = checked
  })
}

/**
 * Updates the class to start the animation.
 * Called when window was loaded.
 */
export function animate() {
  const classList = document.querySelector('.not-animated').classList
  classList.remove('not-animated')
  classList.add('animated')
}

// DOM MANIPULATION
export function createOutputList(numberRecords) {
  const nodes = Array.from(Array(numberRecords).keys()).map(createNode)
  nodes.map(node => output.appendChild(node))
}

function createNode() {
  const container = document.createElement('p')
  const _name = document.createElement('span')
  const _email = document.createElement('span')
  container.appendChild(_name)
  container.appendChild(_email)
  return container
}

/**
 * Called each time the list must be updated.
 */
export function updateDOM(results) {
  // clearing is required
  // else the prev data is shown
  clearResults()
  updateResults(results)
}

function updateResults(filteredList) {
  Array.from(output.children).map((element, index) => {
    if (!filteredList[index]) {
      return
    }
    element.childNodes[0].textContent = filteredList[index].name
    element.childNodes[1].textContent = filteredList[index].company
    return element
  })
}

function clearResults() {
  Array.from(output.children).map((element, index) => {
    Array.from(element.childNodes).map((element, index) => {
      return (element.textContent = '')
    })
    return element
  })
}
