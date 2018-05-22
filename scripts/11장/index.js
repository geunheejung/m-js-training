const apiCall = (url) => new Promise((resolve, reject) => {
  if (url) {
    setTimeout(() => {
      resolve('Success!!!');
    },2000);
  } else {
    reject('Error!');
  }
  
})

const f = () => {
  apiCall('www.naver.com')
    .then(res => console.log(res));


  let thenable = {
    then: function(resolve, reject) {
      resolve(42);
    }
  };

  /*
    Promise.resolve, Promise.reject는 둘 다 인자로 프로미스가 아닌 thenalbe도 받을 수 있다. 이 때 프로미스가 아닌 대너블이 전달되면 이 메서드는
    then() 함수 이후에 호출되는 새로운 프로미스를 만든다.
    Promise.resolve()는 thenable,then()을 호출하여 프로미스 상태를 결정할 수 있다.
  */
  let p1 = Promise.resolve(thenable);
  p1.then(function(value) {
    console.log(value);
  })

  let errorThenable = {
    then(resolve, reject) {
      reject(42);
    }
  };

  let p2 = Promise.resolve(errorThenable);
  p2.catch((err) => console.log(err));
}

const f1 = () => {

  const promise = new Promise((resolve, reject) => {
    throw new Error('Explosion!!');
  });

  // reject에 대한 핸들러가 존재하지 않을 경우 에러 발견못함
  promise.catch((err) => console.log(err.message));

}

const f2 = () => {
  let p1 = new Promise((resolve, reject) => {
    resolve(42)
  });
  let p2 = new Promise((resolve, reject) => {
    resolve(43);
  });

  // 두 번째 성공 핸들러가 p2가 아니라 세 번째 프로미스에 추가됨.
  p1.then((value) => {
    console.log(value);
    return p2;
  }).then((value) => {
    console.log(value);
  });

  // 위에 코드는 아래와 같다. 첫 번째 then이 return하는 p2에 대한 성공핸들러가 아닌 p3에 연결된다는 것이다.
  // 그 이유는 만약 p2가 실패하면 두 번째 성공 핸들러가 호출되지 않을 것이기 때문이다.
  let p3 = p1.then((value) => {
    console.log(value);

    return p2;
  });

  p3.then((value) => {
    console.log(value);
  });

  //////////// p2가 실패할 경우 ////////////
  let errorP2 = new Promise((resolve, reject) => {
    reject(43);
  });

  p1.then((value) => {
    console.log(value);
    return errorP2;
  }).then((value) => {
    // 첫 번째 then에서 실패한 프로미스를 리턴하여서 성공 핸들러에 캐치되지 않음.
    console.log(value);
  });
}

const f3 = () => {

  let p1 = new Promise((resolve, reject) => {
    resolve(42);
  });

  p1.then((value) => {
    console.log(value);

    // 새로운 프로미스를 만듬.
    let p2 = new Promise((resolve, reject) => {
      // 두 번째 성공 핸들러가 p2 프로미스가 성공할 때 까지 실행되지 않는다는 의미이다.
      // 또 다른 프로미스를 실행시키기 전에 이전의 프로미스가 확정될 때까지 기다리길 원할 때 유용
      resolve(43);
    });

    return p2;
  }).then((value) => {
    console.log(value);
  });
}

const f4 = () => {

  let p1 = new Promise((resolve, reject) => {
    resolve(`p1 :: 42`);
  });
  let p2 = new Promise((resolve, reject) => {
    // resolve(`p2 :: 43`);
    reject(`p2 :: 43 ERROR!!!!`);
  });
  let p3 = new Promise((resolve, reject) => {
    resolve(`p3 :: 44`);
  });

  // 중간에 error가 날 경우 다음 요청을 기다리지 않고 바로 종료된다.
  let p4 = Promise.all([
    p1,
    p2,
    p3
  ]);

  // Promise.all()의 resolve 시 값은 배열로 반환된다. 그리고 Promise가 담긴 순서대로 반환된다.
  p4.then((value) => {
    console.log(Array.isArray(value));
    console.log(...value);
  }).catch((error) => {
    console.log(error);
  });

}

const f5 = () => {
  // Promise.race(); Promise.all과 다르게 모든 프로미스를 기다리지 않고 하나의 프로미스가 끝나는 순간 바로 확정된다.

  // let p1 = Promise.resolve(42);
  let p1 = Promise.reject('ERROR!!');
  let p2 = new Promise((resolve, reject) => {
    resolve(`p2 :: 43`);
  });
  let p3 = new Promise((resolve, reject) => {
    resolve(`p3 :: 44`);
  });

  let p4 = Promise.race([
    p1,
    p2,
    p3
  ]);

  p4.then((value) => {
    // p1이 Promise.resolve()로 인해 바로 성공한 이후 더이상 기다리지 않고 종료함.
    console.log(value);
  }).catch((err) => {
    // Promise.reject() 또한 다른 프롬스들은 작업을 스케쥴링하지만 바로 성공,실패 프로미스로 결정되기에 race에서 승리 다른 프로미스들은 무시됨
    console.log(err);
  });
}

const f6 = () => {

  const run = taskDef => {

    const task = taskDef();
    let result = task.next(),
        promise;

    (function step() {

      if (!result.done) {
        promise = Promise.resolve(result.value);
        promise.then((value) => {
          // next메서드의 인자인 value값은 두 번째 next()일 때 제네레이터에서 첫 번째 yield의 왼쪽인 변수에 value가 할당된다
          console.log(result)
          result = task.next(value);
          console.log(result)
          step();
        }).catch((error) => {
          result = task.throw(error);
          step();
        });
      }

    })();
  };

  const db = new Map();

  const success = (res) => {
    db.set('data', res);
    console.log(db);
  }

  function* cbGen() {
    let contents = yield apiCall('www.naver.com');
    success(contents);
    console.log('Done!');
  }

  run(cbGen);
}

const f7 = () => {
  function *createIterator() {
    let first = yield 1; // next() --> 1이 yield에 의해 출력되고 멈춤
    let second = yield first + 2; // next(2) --> 이전 yield 할당문에서 표현식의 좌측 first 변수에 next()의 인자로 보낸 2가 할당됨. 즉 next()의 인자는 yield 문이 실행 되기 전이여야 하고, yield의 반환 값으로 사용되기 때문에 yield first + 2 가 실행되기 전에 2가 first에 할당됨.
    yield second + 3; // 세번째 next(5) 메서드 호출 시 인자로 보낸 5는 second에 할당되며 마지막 yield의 반환 값은 5 + 3이 됨. 이처럼 yield 표현식의 오른쪽은 현재 next() 시점에 평가되고 만약 yield 표현식이 변수에 할당되는 경우 표현식의 왼쪽은 현재 자신의 다음 next() 메서드가 호출 될 때 할당되면서 그 값이 변수에 할당된다. 어렵다
  }

  let iterator = createIterator();

  /* 처음 next() 호출은 특별한 경우로, 어떤 인자를 전달하더라도 그 인자는 손실된다.
     - next()에 전달된 인자는 yield의 반환 값으로 사용되기 때문에, yield문 실행 전에 접근이 가능해야 하는데 첫 yield 실행 전에는 접근이 불가능하므로 yield문 실행 전에 전달되어야하는 next()의 인자는 소용없다.
  */
  console.log(iterator.next());

  /* 할당문을 포함하는 yield 문에서 표현식의 오른쪽은 이전 next() 호출에서 평가되고 표현식의 왼쪽은 함수 실행을 멈추고 있다가 현재 next() 호출에서 이전 yield 문의 변수에 할당된다.
  지그재그 형태

   */
  console.log(iterator.next(2));
  console.log(iterator.next(5));
}

f7();

















