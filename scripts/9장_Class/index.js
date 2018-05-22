const f = () => {
  (() => {
    //  es5
    function PersonType(name) {
      this.name = name;
    }

    PersonType.prototype.sayName = function () {
      console.log(this.name);
    };

    let person = new PersonType('geuni');
    person.sayName();

    console.log(person instanceof PersonType);
    console.log(person instanceof Object);
  })();

  (() => {
    //  es6

    class PersonClass {
      // class는 함수를 constructor로 사용하는 대신 constructor 메서드를 정의 가능
      constructor(name) {
        this.name = name;
      }

      sayName() {
        console.log(this.name);
      }
    }

    let person = new PersonClass('Geuni');
    person.sayName();

    console.log(person instanceof PersonClass);
    console.log(person instanceof Object);

    console.log(typeof PersonClass);
    console.log(typeof PersonClass.prototype.sayName);
  })();

  /** es5의 class와 es6의 class 차이점
   * 1. 클래스 선언은 함수를 생성자로 정읳는 대신 특별한 메서드 이름인 constructor를 사용하여 클래스 내에 생성자를 직접 정의하도록 한다.
   * 2. 클래스 메서드는 간결한 문법 ex) fn() {} 을 사용하기 때문에 function키워드를 사용안해도 된다.
   * 3. 프로토타입이 아닌 인스턴스에 존재하는 객체 소유의 프로퍼티는 클래스 생성자나 메서드내에서만 만들어질 수 있다.
   *    - 가능하면 객체 소유의 모든 프로퍼티는 생성자 함수 내에 만들어, 클래스 내 한장소에서 그에 대한 책임을 가지도록 하는 것이 좋다.
   * function Person --> class Person으로 변하면서 변한 것
   * - PersonClass 선언은 실제로 constructor 메서드의 동작을 수행하는 함수를 만듬
   * - typeof PersonClass는 그 결과로 function을 반환
   * - 간결한 문법을 사용한 sayName()은 결국 PersonClass.prototype 의 메서드가 된다.
   * - PersonClass.prototype과 같은 클래스 프로토타입은 읽기 전용이다. 이는 함수에서와 달리 클래스 프로토타입에는 새 값을 할당 불가.
   */
}

const f1 = () => {

  let PersonType2 = (function () {

    "use strict";

    const PersonType2 = function (name) {

      if (typeof new.target === 'undefined') {
        throw new Error('Constructor must be called with new');
      }
      this.name = name;
    }

    // sayName 메서드를 읽기 전용으로 하기 위해서 Object.defineProperty로 생성
    Object.defineProperty(PersonType2.prototype, "sayName", {
      value: function () {
        // value: 속성에 해당하는 값
        if (typeof new.target !== 'undefined') {
          throw new Error('Method cannot be called with new');
        }

        console.log(this.name);
      },
      enumerable: false, // 해당 객체의 키가 열거 가능한지 default: false
      writable: true, // true일 경우 할당 연산자를 통해서 수정 가능 default: false,
      configurable: true, // 해당 객체로부터 속성을 제거할 수 있는지
    });

    return PersonType2;
  })();

  var person = new PersonType2('geuni');
  console.dir(person.sayName);
}

const f2 = () => {
  class Foo {
    constructor() {
      Foo = 'bar'; // ERROR - 이유는 class 내부에서는 Foo는 const 처럼 동작
    }
  }

  Foo = 'bar';

  console.log(Foo); // class 외부에서는 let 처럼 동작
}

const f3 = () => {
  let PersonClass = class PersonClass2 {

    // PersonType 생성자와 같음
    constructor(name) {
      this.name = name;
    }

    // PersonType.prototype.sayName과 같음
    sayName() {
      console.log(this.name);
    }
  }


}
// 1급 시민 Class
const f4 = () => {
//  Javascript 함수는 일급 시민의 조건에 충족한다. 클래스또한 함수와 마찬가지로 1급시민 조건에 충족한다.

  function createObject(classDef) {
    return new classDef('geuni');
  }

  let obj = createObject(class {
    constructor(name) {
      this.name = name;
    }

    sayName() {
      console.log(this.name);
    }
  });

  console.log('obj :', obj);
}

const f5 = () => {
  // 접근자 프로퍼티
  class CustomHTMLElement {

    constructor(element) {
      this.element = element;
    }

    get html() {
      return this.element.innerHTML;
    }

    set html(value) {
      this.element.innerHTML = value;
    }
  }

  var descriptor = Object.getOwnPropertyDescriptor(CustomHTMLElement.prototype, "html");
  console.log('get' in descriptor);
  console.log('set' in descriptor);
  console.log('html' in descriptor);
  console.log(descriptor.enumerable);

  for (let prop in descriptor) {
    console.log(prop);
    console.log(descriptor[prop]);
  }
  console.log(descriptor)


}

const f6 = () => {

  class PersonClass {
    // constructor 메서드 정의에는 static 키워드 사용 불가
    constructor(name) {
      this.name = name;
    }

    get sayName() {
      return this.name;
    }

    // PersonType.create와 같음
    static create(name) {
      return new PersonClass(name);
    }
  }

  let person = PersonClass.create('geuni');
  // 정적 멤버는 인스턴스로 접근 불가
  console.log(person.create)
  console.log(person.sayName);
}

const f7 = () => {
  class Rectangle {
    constructor(length, width) {
      this.length = length;
      this.width = width;
    }

    getArea() {
      return this.length * this.width;
    }
  }

  // 다른 클래스를 상속한 클래스는 파생 클래스라 부름.
  class Square extends Rectangle {
    constructor(length) {
      /*
      Rectangle.call(this, length, length); 와 동일
      클래스에서 생성자를 명시하려면 반드시 super()를 사용해야 한다. 그러지 않으면 에러 발생
      클래스 선언에서 생성자를 사용하지 않는 경우, 클래스의 새 인스턴스를 만들 때 전달된 모든 인자와 함께 super()가 자동으로 호출된다.
      super
        - 파생 클래스 생성자에서만 사용 가능
        - 생성자 내의 this에 접근하기 전에 super()를 호출해야만 한다.
        - super() 는 this를 초기화하는 역할 즉 그 전에 this 접근 -> ERROR!
        - super() 를 호출하지 않는 유일한 방법은 클래스 생성자에서 객체를 반환
       */
      super(length, length);
    }

    getArea() {
      // 오버라이드하면서 super로 기반 클래스의 메서드를 사용
      super.getArea();
    }
  }

  var square = new Square(3);

  console.log(square.getArea);
  console.log(square instanceof Square);
  console.log(square instanceof Rectangle);

  // class Square1 extends Rectangle {
  //
  // }
  // 위 아래 동일
  // class Square1 extends Rectangle {
  //   constructor(...args) {
  //     super(...args);
  //   }
  // }


}

const f8 = () => {
  function Rectangle(length, width) {
      this.length = length;
      this.width = width;
  }

  Rectangle.prototype.getArea = function() {
    return this.length * this.width;
  }

  // 사용자 정의 타입이여도 extends로 상속이 가능하다.
  // [[Constructor]]와 프로토타입을 가지고있으면 가능
  class Squar extends Rectangle {
    constructor(length) {
      super(length, length);
    }
  }

  var square = new Square(10);


  console.log(square instanceof Square)
  console.log(square instanceof Rectangle)


}

const f9 = () => {

  

}

f9();
