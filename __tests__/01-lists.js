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

describe('List.set', () => {
  test('creating a List by setting values', () => {
    let table = Immutable.List();
    table = table.set(0, 'forks');
    table = table.set(1, 'plate');
    table = table.set(2, 'knife');
    table = table.set(3, 'spoon');
    expect(table.toArray()).toEqual(['forks', 'plate', 'knife', 'spoon']);
  });
});

describe('List.size', () => {
  test('finding the size of a List', () => {
    const fruits = ['apple', 'banana', 'pear'];
    const vegetables = ['carrot', 'lettuce', 'kale', 'eggplant'];
    const fruitsList = Immutable.List(fruits);
    const vegetablesList = Immutable.List(vegetables);
    expect(fruitsList.size).toBe(3);
    expect(vegetablesList.size).toBe(4);
  });
});

describe('List.delete', () => {
  test('removing an item from a List', () => {
    let fruitsList = Immutable.List(['apple', 'banana', 'pear']);
    expect(fruitsList.size).toBe(3);
    fruitsList = fruitsList.delete(1);
    expect(fruitsList.size).toBe(2);
    expect(fruitsList.toArray()).toEqual(['apple', 'pear']);
  });
  test('you can also use the alias List.remove', () => {
    let vegetablesList = Immutable.List(['carrot', 'lettuce', 'beets']);
    expect(vegetablesList.size).toBe(3);
    vegetablesList = vegetablesList.remove(0);
    expect(vegetablesList.size).toBe(2);
    expect(vegetablesList.toArray()).toEqual(['lettuce', 'beets']);
  });
});

describe('List.insert', () => {
  test('adding an item to a List at a specific index', () => {
    let fruitsList = Immutable.List(['apple', 'banana', 'pear']);
    fruitsList = fruitsList.insert(1, 'pineapple');
    expect(fruitsList.toArray()).toEqual(['apple', 'pineapple', 'banana', 'pear']);
  });
});

describe('List.merge', () => {
  test('merging a List with an array', () => {
    let fruitsList = Immutable.List(['apple', 'banana', 'pear']);
    fruitsList = fruitsList.merge(['pineapple', 'kiwi']);
    expect(fruitsList.toArray()).toEqual(['pineapple', 'kiwi', 'pear']);
  });
  test('merging a List with another List', () => {
    const fruitsList = Immutable.List(['apple', 'banana']);
    const vegetablesList = Immutable.List(['carrot', '', 'lettuce', 'kale']);
    const mergedList = vegetablesList.merge(fruitsList);
    expect(mergedList.toArray()).toEqual(['apple', 'banana', 'lettuce', 'kale']);
  });
});

describe('List.mergeWith', () => {
  test('merging a List with an array', () => {
    const fruits = Immutable.List.of('kiwi', 'banana', '');
    const veg = Immutable.List.of('carrot', 'kale', 'lettuce');
    const merger = (oldVal, newVal) => oldVal.length > newVal.length ? oldVal : newVal;
    const mergedList = veg.mergeWith(merger, fruits);
    expect(mergedList.toArray()).toEqual(['carrot', 'banana', 'lettuce']);
  });
});

describe('List.mergeDeep', () => {
  test('merging a deeply nested List with a deeply nested array', () => {
    const fruits = Immutable.fromJS(
      ['kiwi', ['pineapple', 'apple', ['banana', 'orange']]]
    );
    const vegies = Immutable.fromJS(
      ['carrot', 'kale', ['lettuce', ['cabbage', 'tomato'], '']]
    );
    const mergedLists = vegies.mergeDeep(fruits);
    expect(mergedLists.toJS()).toEqual(
      [
        'kiwi', ['pineapple', 'apple', ['banana', 'orange']],
        ['lettuce', ['cabbage', 'tomato'], '']
      ]
    );
  });
});
