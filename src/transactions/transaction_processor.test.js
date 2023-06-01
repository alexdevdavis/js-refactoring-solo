const processTransactions = require("./transaction_processor");

it("processes an empty array of transactions", () => {
  expect(processTransactions([])).toEqual([]);
});

it("throws an exception if array of transactions is null", () => {
  expect(() => processTransactions(null)).toThrow();
});

it("throws an exception if array of transactions is undefined", () => {
  expect(() => processTransactions(undefined)).toThrow();
});

it("processes a single transaction", () => {
  expect(processTransactions(["jumper"])).toEqual(["jumper 1"]);
});

it("processes multiple transactions of the same item", () => {
  expect(processTransactions(["jumper", "jumper"])).toEqual(["jumper 2"]);
});

it("processes multiple transactions of multiple items", () => {
  expect(processTransactions(["jumper", "jeans", "jeans"])).toEqual([
    "jeans 2",
    "jumper 1",
  ]);
});

test("alphabetically orders multiple transactions", () => {
  expect(processTransactions(["jumper", "jeans"])).toEqual([
    "jeans 1",
    "jumper 1",
  ]);
});

test("numerically orders multiple transactions", () => {
  expect(processTransactions(["hoody", "jeans", "jeans"])).toEqual([
    "jeans 2",
    "hoody 1",
  ]);
});

it("processes a group of transactions correctly", () => {
  expect(
    processTransactions(["notebook", "notebook", "mouse", "keyboard", "mouse"])
  ).toEqual(["mouse 2", "notebook 2", "keyboard 1"]);
});
