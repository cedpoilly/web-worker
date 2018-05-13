# WEB WORKERS: MULTI THREADING IN THE BROWSER

## IDEAS
Demos
 - async !== free: still runs on the main thread, code can block that thread
 - non-blocking: main thread is free while worker excutes it's code
 - performance: divide and conquer

## INTRO/FACTS
JavaScript & Browser
 - JavaScript is single-threaded: runs only one line of code at a time
 - The browser however can run multiple threads at the same time
Workers
 - is an HTML5 feature, 1st draft in 2009 
 - worker does not have access to synchronous APIs: DOM, localStorage, etc...
 - access to Console, fetch/XHR, IDB, etc...
 - communication is event based: message posting
 - can instanciate more than one, each one has its own scope

### Demos
Performance
  Bottlenecks: 
  - instantiating worker cost (per worker)
  - JSON.stringify/parse