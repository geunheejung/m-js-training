// arrow 함수는 컨텍스트에 따라 this값이 바뀌지 않는다. 오로지 스코프체인의 상위함수를 가르킨다.
let PageHandler = {
  id: "123456",
  init: function () {
    // es5 function
    /*
    document.addEventListener('click', function (event) {
      // 일반 함수의 this는 컨텍스트에 따라 유동적이기에 this는 event를 바라본다.
      this.doSomething(event.type);
    });
    */
    // es5 function + .bind(this)
    /*
    document.addEventListener('click', (function (event) {
      // 일반 함수의 this는 컨텍스트에 따라 유동적이기에 this는 event를 바라본다.
      this.doSomething(event.type);
    }).bind(this));
    */
    // arrow Function
    /*
    arrow Function은 this가 Context에 유동적이지 않음. 정적 바인딩
    document.addEventListener('click',
        event => this.doSomething(event.type));
    */

  },
  doSomething: function (type) {
    console.log(type);
  }
}

PageHandler.init();

// new 로 함수 호출 시 함수 내부의 [[Constructor]] 이 호출되는데 arrow Function은 없음.
// let MyType = () => {},
//     object = new MyType();

//arrow function에도 call, apply, bind가 존재한다.

// 꼬리 호출 최적화
/*
꼬리 호출이란 함수가 종료될 때 다른 함수를 호출하는것을 말한다.
function a() {
  .
  .
  .
  b();
}
es6이전의 꼬리 호출은 일반 함수로 처럼 취급해서 마지막 꼬리 호출이 끝날때 까지 스택에 메모리가 계속 쌓인다.

es6이후에는 strict모드에서 특정 꼬리 호출을 위한 호출 스택의 크기를 줄인다.
즉 다음 제시한 조건을 만족하면 꼬리 호출을 위한 새로운 스택 프레임을 만드는 대신 현재 스택 프레임을 지우고 재사용한다.

- 꼬리 호출이 현재 스택 프레임의 변수에 접근하지 않음(함수가 클로저가 아님을 의미)
- 꼬리 호출을 만드는 함수가 꼬리 호출 반환 후에 남은 작업이 없음
- 꼬리 호출 결과가 함수의 값으로서 반환

 */
const doSomethingElse = () => {}

const doSomething = () => {
  // 최적화됨.
  // doSomethingElse를 꼬리 호출을 하고, 결과를 바로 반환하고, 지역 스코프의 변수에 접근 X
  return doSomethingElse();
}

const doSomething2 = () => {
  // 최적화되지 않음 - 반환값 없음
  doSomethingElse();
}

const doSomething3 = () => {
  // 최적화되지 않음 - return 후 추가 작업 존재
  return 1 + doSomethingElse();
}

const doSomething4 = () => {
  // 최적화되지 않음 - 마지막 위치가 아닌 곳에서 호출
  const resultValue = doSomethingElse();
  return resultValue;
}

function factorial(n) {

  if (n <= 1) {
    return 1;
  } else {
  // 최적화되지 않음 - 반환 후에 곱셈을 해야함.
    return n * factorial(n - 1);
  }

}

console.log(factorial(5));


