(() => {
  // es5 의 Set or Map
  var set = Object.create(null);

  set.foo = true;

  if (set.foo) {
  }

  var map = Object.create(null);
  map[5] = "foo";
})();

const f = () => {
  const set = new Set();
  const key1 = {},
    key2 = {};
  // set은 프로퍼티를 추가할 때 비교를 위해 강제 형변환을 하지 않는다.
  set.add(5);
  set.add("5");
  set.add("5"); // 중복은 무시된다.

  // 형변환을 하지 않기에 key1, key2 추가 - es6의 set이 아닐경우 [object object] 로 출력되서 동일하다 판단
  set.add(key1);
  set.add(key2);

  console.log(set.size);

  const arr = [1, 1, 1, 2, 3, 4, 5];
  const uniqArr = new Set(arr);
  console.log(uniqArr); // 배열의 요소를 유니크하게 초기화가능

  // Set 생성자는 인자로 모든 이터러블(iterable) 객체를 받는다. 그리고 인자로부터 값을 추출할 때는
  // 이터레이터를 소비해가면서 사용하나봄
};

const f1 = () => {
  const set = new Set();
  set.add(5);
  set.add("5");
  set.add("6");
  set.add("7");
  set.add("8");
  // set.has(); 로 값이 존재하나 체크 가능
  console.log(set.has(5));
  console.log(set.has(6));

  console.log(set);

  set.delete(5); // set.delete() 로 요소 삭제 가능

  console.log(set);

  set.clear();

  console.log(set); // clear 명령어 사용 시 모두 삭제
};

const f2 = () => {
  const set = new Set([1, 2]);

  // set.forEach는 다른 Array, Object 컬렉션과 기능은 같지만 콜백의 인자에 들어가는 값이 다르다.
  // 기존의 두 컬렉션은 forEach의 첫번째인자는 key였는데
  // set 에는 key가 없기때문에 둘다 같은 값이 전달되는것이다.=
  set.forEach((value, key, ownerSet) => {
    console.log(`${key} ${value}`);
    console.log(ownerSet === set);
  });

  let processor = {
    output(value) {
      console.log(value);
    },
    process(dataSet) {
      dataSet.forEach(value => this.output(value));
    }
  };

  processor.process(set);
};

const f3 = () => {
  const uniqArr = (orArr = []) => [...new Set(orArr)];
  // let set = new Set([1, 2, 3, 3, 3, 4, 5]),
  //     array = [...set];

  const originArr = [1, 2, 1, 4, 2, "d", "d"];
  return uniqArr(originArr);
};

// Set 타입은 객체 참조를 저장하는 방식이기에 Strong Set으로 불리기도 한다.
// Set의 인스턴스에 저장된 객체는 사실상 변수에 객체를 저장하는 것과 같다.

const f4 = () => {
  const mySet = new Set(["a", 1, 2, 1, "c", "b", "apple"]);
  const c = text => console.log(text);

  for (let item of mySet) console.log(item);

  // values, keys 둘 다 삽입 순으로 Set 객체 내 각 요소에 대한 값을 포함하는 새로운 이터레이터 객체 반환
  // entries() [key, value] 형식으로 새로운 Iterator 객체를 반환 Set 데이터는 key, value 둘 다 동일
  let values = mySet.values(),
    keys = mySet.keys(),
    entries = mySet.entries();

  for (let [key, value] of entries) c("key " + key, "  value" + value);

  // Set 타입 데이터를 Array로 변환, [...Set] 으로도 가능
  c(Array.from(mySet));

  const bodyEle = document.getElementsByTagName("body");
  mySet.add(bodyEle);

  c(mySet);
};

// TODO Weak Set
const f5 = () => {
  let set = new Set(),
    key = {};

  set.add(key);
  console.log(set.size);

  // 원본 참조 제거
  key = null;

  // 원본 참조를 제거했음에도 set에는 여전히 원본에 대한 참조가 남아있음
  // 코드상의 모든 참조를 제거했으면 set의 참조도 제거되는게 이상적인것
  // 만약 자바스크립트 코드가 웹 페이지에서 실행되고, 다른 스크립트에 의해 제거될지 모르는 DOM 엘리먼트를 추적하려는 경우, DOM 엘리먼트의 마지막 참조를 유지하는 코드는 메모리 누수가 일어난다.
  // ex) 중첩되어 이벤트가 바인딩되어있는데 가장 최상위 부모 요소가 제거되면 바인딩된 이벤트는 남아있지만 삭제되어서 접근이 불가능함. 그러면 참조는 유지되어있기에 메모리상에 계속 남아있음. 이때 Weak Set을 이용?
  console.log(set.size);

  key = [...set][0];
};

const f6 = () => {
  let set = new WeakSet(),
    key = {};

  // Set에 객체 추가
  set.add(key);

  console.log(set.has(key));

  set.delete(key);

  console.log(set.has(key));

  let weakSet = new WeakSet([{}, {}]);
  // let errorWeakSet = new WeakSet([1, 2]); WeakSet은 인자로 원시 값을 받을 수 없다. (Array, Object) 만 가능
  console.log(weakSet);
};

const f7 = params => {
  let set = new WeakSet(),
    key = {};

  set.add(key);

  console.log(set.has(key));
  // Set 타입일 경우 모든 참조가 제거되어도 Set의 참조값은 제거되지 않았던 반면 WeakSet은 약한 참조를 유지하고 있기에 모든 참조가 제거되면 자연스레 WeakSet안의 참조값도 가비지 컬렉터에 의해 삭제된다.
  key = null;

  console.log(set.has(key));
};

/*
Set 과 WeakSet의 차이점
1. WeakSet 인스턴스에서, 객체가 아닌 값이 전달되면 add() 메서드는 에러 발생 - has() deleted()는 항상 false를 반환
2. Weak Set은 이터러블이 아니므로 for-of 순회 불가
3. WEak Set은 어떤 이러에티어도 노출하지 않음.
4. Weak Set에는 forEach 메서드 X
5. size도 X
*/

/*** ***
 ** map  **
 *** ***/

const f8 = params => {
  const _con = text => console.log(text);
  let map = new Map();
  map.set("name", "geuni");
  map.set("age", 20);
  map.set(1, 20);
  map.set("1", 20);
  map.set(NaN, 20);

  console.log(map.size);

  _con(map.has("name"));
  _con(map.get("name"));

  console.log(map);

  map.forEach((value, key, ownerMap) =>
    console.log(
      `value : ${value} - key : ${key} - ownerMap === map : ${ownerMap === map}`
    )
  );

  class Person {}

  map.forEach(
    (value, key, ownerMap) =>
      console.log(
        `value : ${value} - key : ${key} - ownerMap === map : ${ownerMap ===
          map} ${this}`
      ),
    Person
  );

  map.clear();

  _con(map.has("name"));
  _con(map.get("name"));

  console.log(map);
};

/*
WeakMap 또한 모든 key는 객체여야 한다. 객체가 아니면 error
그리고 WeakSet과 마찬가지로 약한 참조로 이루어지는데 
WeakMap에서는 key값만 약한 참조이다. value값은 그대로
*/

const f9 = () => {
  let map = new WeakMap(),
    element = document.querySelector(".element");

  map.set(element, "Original");

  let value = map.get(element);
  console.log(value);

  // 요소가 삭제되었다하더라도 외부 라이브러리나 이벤트가 바안딩되어있었을 경우 계속 메모리에 남아있어서 메모리 누수가 되는데
  // WeakMap의 key값으로 요소를 등록해놓으면 언제든지 참조값을 null로 해주면 WeakMap의 key에 등록된 요소에 대한 참조도 가비지 컬렉터에 의해 제거된다.
  element.parentNode.removeChild(element);
  element = null;
};

// f9();

if (1) {
  var Person = (function() {
    let privateData = {},
      privateId = 0;

    function Person(name) {
      Object.defineProperty(this, "_id", {
        value: privateId++ㅓ
      });

      privateData[this._id] = {
        name: name
      };
    }

    Person.prototype.getName = function() {
      return privateData[this._id].name;
    };

    return Person;
  })();

  var person = new Person("geuni");

  console.log(person.getName());
}

if (1) {
  let Person = (function() {
    let privateData = new WeakMap();

    function Person(name) {
      privateData.set(this, { name });
    }

    Person.prototype.getName = function() {
      return privateData.get(this).name;
    };

    return Person;
  })();

  let person = new Person("geuni");
  console.log(person.getName());
}

/*

Set은 key만 존재하며, 중복이 없다.
WeakSet은 key값으로 객체만 받으며, 약한 참조이여서 key에 대한 모든 참조가 제거되었을 경우 그 key또한 가비지 컬렉터에 의해 제거된다.
map은 [key, value]형식으로 존재하며, 중복이 없다.
WeakMap 또한 key값만 객체를 받으며, 약한 참조를 유지한다.

WeakSet과 WeakMap은 이터러블, 이터레이터를 제공하지 않아 forEach와 같은 조회가 불가능하다
.get()으로는 가능

*/
