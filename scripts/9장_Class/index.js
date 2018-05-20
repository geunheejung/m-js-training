const f = () => {
  (() => {
  //  es5
    function PersonType(name) {
      this.name = name;
    }

    PersonType.prototype.sayName = function() {
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

f();