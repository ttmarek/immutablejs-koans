const Immutable = require('immutable');

describe('List', () => {
  // Use when creating a List from iterable data.
  // E.g. Arrays, Immutable iterable objects (List, Map, Set),
  // strings.

  test('creating a List from an Array', () => {
    const fruits = ['apple', 'banana', 'pear', 'orange'];
    const fruitsList = Immutable.List(fruits);
    expect(fruitsList.get(0)).toBe('apple');
    expect(fruitsList.get(1)).toBe('banana');
    expect(fruitsList.get(3)).toBe('orange');
    expect(fruitsList.get(4)).toBeUndefined();
  });

  test('creating a List from a string', () => {
    const name = 'john';
    const nameList = Immutable.List(name);
    expect(nameList.get(1)).toBe('o');
    expect(nameList.get(name.length - 1)).toBe('n');
    expect(nameList.toArray()).toEqual(['j', 'o', 'h', 'n']);
  });

  test('creating a List by setting values', () => {
    let table = Immutable.List();
    table = table.set(0, 'forks');
    table = table.set(1, 'plate');
    table = table.set(2, 'knife');
    table = table.set(3, 'spoon');
    expect(table.toArray()).toEqual(['forks', 'plate', 'knife', 'spoon']);
  });

  test('creating a List from nested lists', () => {
    // List only creates a List from a top level of an Array

    const items = [
      'steak',
      'pasta',
      ['apples', 'bananas', 'oranges'],
      ['carrots', 'celery'],
    ];
    const listOfItems = Immutable.List(items);
    expect(listOfItems.get(0)).toBe('steak');
    expect(listOfItems.get(3)).toEqual(['carrots', 'celery']);
    expect(Immutable.List.isList(listOfItems.get(2))).toBe(false);
    expect(Array.isArray(listOfItems.get(2))).toBe(true);
  });
});

describe('List.of', () => {
  // Use when creating a List from non-iterable data.
  // E.g. Objects, function arguments, strings.

  test('creating a List of a string', () => {
    const name = 'john';
    const nameList = Immutable.List.of(name);
    expect(nameList.get(0)).toBe('john');
    expect(nameList.toArray()).toEqual(['john']);
    expect(nameList.get(1)).toBeUndefined();
  });

  test('creating a List from a series of values', () => {
    const listOfRandomness = Immutable.List.of('a', 7, 'hello', [1, 2, 3]);
    expect(listOfRandomness.get(0)).toEqual('a');
    expect(listOfRandomness.get(1)).toEqual(7);
    expect(listOfRandomness.get(3)).toEqual([1, 2, 3]);
  });
});

describe('fromJS', () => {
});
