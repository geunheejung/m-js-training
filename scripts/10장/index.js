const f = () => {
  var items = new Array(4);
  console.log(items);

  var items = new Array(1, 2, 3, 4, 5);
  console.log(items);

  // 인자로 숫자 하나만 들어가도 특별한 동작을 하지 않는다.
  var ofItems = Array.of(1);
  console.log(ofItems);

  function foo() {
    console.log(arguments);
    console.log(Array.prototype.slice.call(arguments));
    console.log([...arguments])
    console.log(Array.from(arguments))
    console.log(Array.from(arguments, (value) => value + 1))
    let helper = {
      diff: 1,
      add(value) {
        return value + this.diff;
      }
    }

    console.log(Array.from(arguments, (value) => value + 1))
    console.log(Array.from(arguments, helper.add, helper))


  }

  foo(1, 2, 3, 4, 5)
}

const f1 = () => {
  let numbers = {
    *[Symbol.iterator]() {
      yield 1;
      yield 2;
      yield 3;
    }
  };
  
  // Symbol.iterator 프로퍼티를 가진 객체라면 모두 배열로 변환 가능
  let numbers2 = Array.from(numbers, (value) => value + 1);
  console.log(...numbers);
  console.log(...numbers2);
  
}
f1();