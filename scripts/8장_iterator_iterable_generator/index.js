const f = params => {
  const createIterator = items => {
    let i = 0;

    return {
      next() {
        let done = i >= items.length;
        let value = !done ? items[i++] : undefined;

        return {
          done,
          value
        };
      }
    };
  };

  const iterator = createIterator([1, 2, 3, 4, 5]);

  // console.log(iterator.next());
  // console.log(iterator.next());
  // console.log(iterator.next());
  // console.log(iterator.next());
  // console.log(iterator.next());
  // console.log(iterator.next());

  function
   _createIterator() {
    yield 1;
    yield 2;
    yield 3;
  }

  for (let item of _createIterator()) {
    // for of 는 iterable의 next() 메서드를 길이만큼 호출함으로써 이터레이터를 소비한다.
    // console.log(item);
    /*
    const a = [1, 2    */
  }

  const o = {
    *createIterator(items) {
      for (let i = 0, iLen = items.length; i < iLen; i++) {
        yield items[i];
      }
    }
  };

  let iter = o.createIterator([1, 2, 3]);
  console.log(iter.next());
  console.log(iter.next());
  console.log(iter.next());
};

f();
