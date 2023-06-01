function processTransactions(receivedTransactions) {
  validateTransactions(receivedTransactions);

  const itemsTally = receivedTransactions.reduce((tally, item) => {
    tally[item] = (tally[item] || 0) + 1;
    return tally;
  }, {});

  const sortedItems = sortItemsByCount(itemsTally);

  const processedTransactions = Object.keys(sortedItems).map(
    (item) => `${item} ${sortedItems[item]}`
  );

  return processedTransactions;
}

function sortItemsByCount(unsortedTally) {
  const sortedItems = Object.keys(unsortedTally).sort((itemOne, itemTwo) => {
    return (
      unsortedTally[itemTwo] - unsortedTally[itemOne] ||
      itemOne.localeCompare(itemTwo) //order equal values alphabetically
    );
  });

  const sortedTally = {};
  for (const item of sortedItems) {
    sortedTally[item] = unsortedTally[item];
  }

  return sortedTally;
}

function validateTransactions(transactions) {
  if (!Array.isArray(transactions)) {
    throw new Error("Undefined collection of transactions");
  }
}

module.exports = processTransactions;
