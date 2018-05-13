/**
 * Similate expensive work that keeps running for a specified delay.
 * @param {number} delay : total duration, in miliseconds
 * @returns 42 as a result
 */
function expensiveWork(delay = 5000) {
  const start = performance.now()

  while (performance.now() - start < delay) {
    // doing expensive work...
  }
  return 42
}
