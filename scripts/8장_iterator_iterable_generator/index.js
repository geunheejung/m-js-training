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

  function* _createIterator() {
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
    * createIterator(items) {
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

const f1 = () => {
  function* createIterator() {
    /*
     처음 next() 호출은 특별한 경우로, 어떠한 인자값이 전달되더라도 그 인자는 손실된다.
     next()에 의해 전달된 인자는 yield의 반환 값으로 사용되기 때문에, yield문 실행 전에 접근이 가능하다면 첫 번째 next()
     호출의 인자는 제네레이터의 첫 yield문의 리턴값을 대체할 수 있다.
     */
    // 할당문을 포함하는 yield문에서 표현식의 오른쪽은 첫 next() 호출에서 평가되고,
    // 표현식의 왼쪽은 함수 실행을 멈추고 있다가 두 번째 next() 호출에서 평가된다.
    // 즉 첫 번째 next()문에서는 표현식의 오른쪽인 1 값이 평가되어 출력되고,
    // 두 번째 yield문에서 표현식의 왼쪽이 평가되어서 next의 인자로 받은 값이 할당되나보다.
    let first = yield 1;

    // next() 로 전달된 인자는 yield의 반환 값으로 사용된다.
    let second = yield first + 2;
    yield second + 3;
  }

  // 제너레이터 함수는 이터레이터를 생성
  let iterator = createIterator();

  console.log(iterator);

  console.log(iterator.next());
  console.log(iterator.next(4));
  console.log(iterator.next(6));


  // generator Error
  function* errorIterator() {
    let first = yield 1;
    let second = yield first + 2; // next()대신 throw()일 경우 error를 발생시키면서 제네레이터를 계속 실행시킨다.
    // throw()가 호출되면 다른 코드를 실행하기 전에 에러가 발생한다.
    // next()에 의해 인자와 함께 계속 실행되던, throw()에 의해 에러가 발생하든 제네레이터는 계속 실행되며
    // 그에 대한 행동은 내부에서 제네레이터 내부에서 정한다.
    yield second + 3;
  }

  let errIter = errorIterator();

  console.log(errIter.next());
  console.log(errIter.next(4));
  console.log(errIter.throw(new Error('Boom')));
}

const f2 = () => {
  function* createIterator() {
    let first = yield 1;
    let second;

    try {
      second = yield first + 2; // 4 + 2 를 수행한 후 에러 발생
    } catch (ex) {
      second = 6;
    }

    yield second + 3;
  }

  let iterator = createIterator();

  console.log(iterator.next());
  console.log(iterator.next(4));
  console.log(iterator.throw(new Error('Boom')));
  console.log(iterator.next());
  ;
}

// return
const f3 = () => {
  /**
   * 1. 마지막 next() 메서드 호출의 반환 값도 명시 가능
   * 2. 제네레이터 함수 안에서 return문을 만날 시 done: ture 가 반환되면서 실행을 멈춘다.
   */
  function* gen() {
    yield 1;
    yield 2;
    yield 3;
    return 4;
  }

  const iter = gen();
  console.log(iter.next());
  console.log(iter.next());
  console.log(iter.next());
  console.log(iter.next());
  console.log(iter.next());

  for (let iter of gen()) {
    console.log(iter); // for~of문은 { done: true } 를 만날 시 value 값을 읽어들이지 않고 멈춘다.
  }
  // 스프레드 연산자 또한 { done: true }을 만날 시 value값을 읽지 않음
  let arr = [...gen()];
  console.log(arr)
}

// 제네레이터 함수 위임
const f4 = () => {

  function* aGen() {
    yield 1;
    yield 2;
  }

  function* bGen() {
    yield 'a';
    yield 'b';
  }

  function* createCombineIterator() {
    yield* aGen();
    yield* bGen();
    yield true;
  }

  const iterator = createCombineIterator();
  // 각각 서브제네레이터들이 다 소비 될 때마다 { done: true } 가 아닌 모든 제네레이터들이 다 소비되면 true가 된다.
  /*
  console.log(iterator.next());
  console.log(iterator.next());
  console.log(iterator.next());
  console.log(iterator.next());
  console.log(iterator.next());
  console.log(iterator.next());
  */ // 제네레이터 console.log

  function* createNumberIterator() {
    yield 1;
    yield 2;
    return 3;
  }

  function* createRepeatingIterator(count) {
    for (let i = 0; i < count; i++) {
      yield 'repeat';
    }
  }

  function* createCombine() {
    let result = yield* createNumberIterator();
    yield result; // return문에 의해 반환된 3은 createCombine함수 안에만 존재한 값이였는데 yield문으로 출력함.
    yield* createRepeatingIterator(result);
  }

  const iterator2 = createCombine();

  console.log(iterator2.next());
  console.log(iterator2.next());
  // { value: 3, done: false } 가 출력되지 않은 이유는 yield문이 아닌 return문에 의해 반환되었기에 3 은 createCombine 제네레이터안에만
  // 존재합니다.
  console.log(iterator2.next());
  console.log(iterator2.next());
  console.log(iterator2.next());
  console.log(iterator2.next());
  console.log(iterator2.next());

  function* stringGenerator() {
    yield* "Hello";
  }

  // 기본으로 [Symbol.iterator]() 이터러블이 내장되어있을 경우 아래 처럼 사용 가능하다.
  const strIter = stringGenerator();

  for (let sIter of strIter) {
    console.log(sIter);
  }
}

// 비동기 작업
const f5 = () => {

  function run(taskDef) {
    // 이터레이터를 만들고, 범용적으로 이용 가능하도록 한다.
    let task = taskDef();

    let result = task.next();

    // next() 메서드를 호출하는 재귀함수
    function step() {

      // 더 작업할 부분이 있다면
      if (!result.done) {
        result = task.next(result.value);
        step();
      }
    }

    // 위 과정을 시작
    step();
  }

  function* cb() {
    let value = yield 1;
    console.log(value);

    value = yield value + 3;
    console.log(value);
  }

  run(cb);
}
// 비동기 2
const f6 = () => {
  function fetchData() {
    return function(cb) {
      setTimeout(() => {
        cb(null, "Hi!");
      }, 50);
    }
  }

  function run(taskDef) {
    // 이터레이터를 만들고, 범용적으로 사용가능하게 변수에 할당
    const task = taskDef();
    // 작업 시작
    let result = task.next(); // 비동기 호출 시작 -> 일정 시간 뒤 콜백 함수 result에 할당

    // next()를 호출하는 재귀함수
    function step() {

      if (!result.done) { // 더 작업할 부분이 있다면
        if (typeof result.value === 'function') { // 비동기 요청이 끝났을 경우 { value: 비동기 작업 이후 콜백 }
          result.value(function (err, data) { // 콜백 함수 호출해줌
            console.log(err, data);
            if (err) { //
              result = task.throw(err);
              return;
            }

            result = task.next(data);
            step();
          });
        } else {
          result = task.next(result.value);
          step();
        }
      }
    }

    // 작업 시작
    step();
  }

  function *innerGen() {
    let contents = yield fetchData();
    // yield문에 의해 비동기 작업이 끝난뒤의 데이터가 온다는 것을 보장받고, 코드를 동기적으로 표현이 가능하다.
    console.log(contents);
    console.log('Success');
  }

  run(innerGen);
}

f6();