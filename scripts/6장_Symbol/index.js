const t = () => {
  // Symbol은 원시타입이며, 다른 원시타입과는 다르게 리터럴이 존재하지 않음.
  // 그러므로 new Symbol(); - Error , Object(yourSymbol); 을 사용하면 심볼 인스턴스 생성 가능 유용하지는 않음.
  // Symbol를 생성할 때 선택적으로 인자에 Symbol의 이름을 정의 가능 이는 디버깅용 - 항상 서술해주는것이 좋다.
  // 'first name' === '서술 문자열' 은 내부적으로 [[Description]] 프로퍼티에 저장되며, toString() 메서드가 호출될 때 사용된다. 그 이외에는 접근 불가.
  let firstName = Symbol("first name");
  let person = {};
  person[firstName] = "Nicholas";
  // Symbol을 key값으로 했을 경우 key값으로 정의된 Symbol로 프로퍼티 접근 가능
  console.log(person[firstName]);
  console.log(person);
  console.log(firstName);
  // console.log(Object(firstName)); 권장 X
};

const t2 = () => {
  let firstName = Symbol("first name");
  let person = {
    [firstName]: "Nicholas"
  };

  // Object.definedProperty() 에 의해 정의된 프로퍼티는 읽기 전용.
  // 3번째 인자자리는 'descriptor' 객체인데 이 객체에는 2개의 프로퍼티값을 받는다. 데이터 기술(value), 데이터 접근 기술(writable)
  // Object.defineProperty(obj, prop, descriptor)
  Object.defineProperty(person, firstName, { writable: false });

  let lastName = Symbol("last name");

  // 객체들
  // Object.defineProperty(obj, props, descriptor)
  Object.defineProperties(person, {
    [lastName]: {
      value: "Zakas", // 실제 프로퍼티의 value값
      writable: false // true일 경우 할당 연산자에 의해 수정 가능, false일 경우 읽기 전용 default: false
    }
  });
  person[lastName] = "c";
  console.log(person[lastName]);

  console.log(person);
  console.log(person[firstName]);
  console.log(person[lastName]);
};

const t3 = () => {
  // Symbol.for(key);
  // 1. 전역 심볼저장공간에 인자로 받은 key값의 Symbol이 존재하는지 찾은 이후 존재할 경우 그대로 반환, 존재하지 않을 경우 새로 정의
  let uid = Symbol.for("uid");
  let object = {
    [uid]: "12345"
  };

  console.log(object[uid]);
  console.log(uid);

  return object;
};
// console.log(t3()[Symbol.for('uid')]);

const t4 = () => {
  // Symbol.keyFor() - 전역 심벌 저장소에서 심벌과 관련된 키를 탐색 가능
  let uid = Symbol.for("testKey");
  console.log(Symbol.keyFor(uid));

  let uid2 = Symbol.for("testKey");
  console.log(Symbol.keyFor(uid2));

  let uid3 = Symbol("testKey");
  console.log(Symbol.keyFor(uid3));
};

const t5 = () => {
  /* Symbol 프로퍼티 탐색
    기존의 Object.keys(), Object.getOwnPropertyNames() 는 객체에서 모든 프로퍼티 이름을 탐색 가능하나
    ecm 는 es5와 호환되도록 하기 위해, 둘 다 안되게함 --> 대신 es6 Object.getOwnPropertySymbols()로 가능
   */

  let uid = Symbol.for("uid");
  let object = {
    [uid]: "12345"
  };

  let symbols = Object.getOwnPropertySymbols(object);

  con(symbols.length);
  con(symbols[0]);
  con(object[symbols[0]]);

  con(object instanceof Object);

  function MyObject() {}

  Object.defineProperty(MyObject, Symbol.hasInstance, {
    value: function(v) {
      return false;
    }
  });

  let obj = new MyObject();
  let arr = ["a", "b", "c", "d"];

  con(obj instanceof MyObject);
  con(arr.concat(["e", "f"]));
  con(arr.concat("z"));
};

const t6 = () => {
  function Temperature(degrees) {
    this.degrees = degrees;
  }

  // 객체가 형변환될 때 컨트롤 할 수 있게 해주는거 같음.
  Temperature.prototype[Symbol.toPrimitive] = function(hint) {
    // hint에 type값이옴
    switch (hint) {
      case "string":
        return this.degrees + "\u00b0";
      case "number":
        return this.degrees;
      case "default":
        return this.degrees + " degrees";
      default:
        return "Default";
    }
  };

  let freezing = new Temperature(32);

  con(freezing + "!");
  con(freezing / 2);
  con(String(freezing));
};

const t7 = () => {
  function Person(name) {
    this.name = name;
  }

  // 모든 객체는 Object.prototype에서 Symbol.toStringTag를 상속한다.
  Person.prototype[Symbol.toStringTag] = "Person";

  // [Symbol.toStringTag] 와 별개
  Person.prototype.toString = function() {
    return this.name;
  };

  let me = new Person("Geuni");

  con(me.toString());
  con(Object.prototype.toString.call(me));
};

t7();
