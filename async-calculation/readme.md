Show Around
1. Markup: buttons, animation, output
2. Script: syncCalculation & aysncCalculation
3. Demo the app: click on each button

Expensive Synchronous work
1. In methods `syncCalculation` and `aysncCalculation`
    ```js
    // replace
    return 42 - 10 + 5 + 5
    // with:
    return expensiveWork(4000)
    ```
2. Demo the app again: is async free?
