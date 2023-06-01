# Alex's Refactor

## 👀 First Approach

As with any editing exercise, I find it helpful to take a high-level look first, with the aim of understanding what's happening at each stage, noting any emerging patterns to help prioritise the editing approach.

### Priorities from pre-read

1. Make the names of things an accurate reflection of their role / purpose / being
2. For clarity and stability, evaluate data flow
3. Adhere to consistent patterns in language and syntax

## 🌹 Stage 1. What's in a name?

I prioritised renaming things, so it's easier for me to follow what's going on.

```javascript
var txr = [];                   /* becomes */   var processedTransactions = [];
transActions                    /* becomes */   receivedTransactions
let txCount = {};               /* becomes */   let itemsTally = {}

// ... and so forth (perhaps do a side-by-side name comparison)
```

## 🛣️ Stage 2. Controlling Data Flow

Editing the order and manner of operations was an exercise in judging when less is more, and when more is more

### Variable Declarations: when, where and how

I first sought to control the scope and constancy of variables

Focusing on the `processTransactions` function:

- favour `const` or `let` declarations over `var`

- I appreciated the aim of making the tally creation for-loop more semantic, so swapped it out for a `reduce` method that still holds to this aim, using the word `item`.

  > 💡 With the word `transaction` featuring so often, we run the risk of losing a sense of what exactly we're dealing with, so I reserve the word 'transaction' for the input and output arrays only.

- edit out how `itemsTally` is initialised, then reassigned to be a sorted version of itself; I assigned the sorted object to a `sortedItems` variable, to more explicitly signpost the flow of operations.

- the final operation of the function, I stick with the signposting approach, and use `.map` to create the desired artefact, `processedTransactions`.

### Helping Hands 🙌

- Looking next to the helper functions, I felt that `validateTransactions` was being a bit lazy, so made it perform the one job assigned to it.

- In `sortItemsByCount`, initially, I removed `itemOne > itemTwo` from the sort callback, as `-(itemOne <= itemTwo)` was sufficient to pass the tests. It then occurred to me that this wouldn't account for case-sensitivity, so swapped it out for the `String` specialist `localeCompare`. More reliable, and the right tool for the job.

## 🧹 3. Tidying Up

- Finally, I ensured that all callbacks use arrow functions, for readability, and used space to clearly set out the 'signposts' of data flow.

## 🤔 Reflection

I'm conscious that every decision we make carries the implied weight of the path(s) we choose _not_ to take. In this case, my changes favour readability at the cost of performance:

- using methods over for loops is typically less performant
- I consume more space in memory by creating variable signposts
- `localeCompare` carries a significant performance overhead, and in production would likely need benchmarking

- I've compromised my semantic naming aim a little with `sortItemsByCount`; it feels a bit heavy-handed to use `sortItemsByCountAlphabetically` or similar, and I feel that alphabetical ordering is broadly implied, expected even, in day-to-day life.
  > 💡 I've included a little comment in the helper function so that alphabetical ordering isn't **only** implied.
