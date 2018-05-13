function fibonacci(num) {
  if (num <= 1) return 1
  return fibonacci(num - 1) + fibonacci(num - 2)
}

function getSun(city) {
  const URL = `https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22${city}%2C%20mu%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`
  return fetch(URL)
    .then(getJSON)
    .then(formatData)

  function getJSON(response) {
    return response.json()
  }
  function formatData(data) {
    const { sunrise, sunset } = data.query.results.channel.astronomy
    return `Sunrise: ${sunrise} --- Sunset: ${sunset}`
  }
}

function expensiveWork(price) {
  if (isNaN(price)) {
    throw new Error('Price must be a number')
  }
  const delay = price
  const start = performance.now()

  // explain here
  while (performance.now() - start < delay) {
    // doing expensive work...
  }
  return price
}
