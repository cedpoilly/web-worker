const INPUT = 40

function fibonacci(num) {
  if (num <= 1) return 1
  return fibonacci(num - 1) + fibonacci(num - 2)
}

function calculateFibonacci(origin) {
  console.time(`${INPUT} --- ${origin}`)

  const result = fibonacci(INPUT)

  console.timeEnd(`${INPUT} --- ${origin}`)

  return result
}
