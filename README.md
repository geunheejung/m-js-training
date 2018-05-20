# m-js-training
## ES6 모던 자바스크립트

### Symbol

심볼(symbol) 은 고유하고 수정 불가능한 데이터 타입이며 주로 객체 속성(object property)들의 식별자로 사용된다. 심볼 객체(symbol object) 는 심볼 기본형 변수(primitive data type) 의 암묵적(implicit) 객체 래퍼(wrapper)이다.

Symbol은 Javascript의 새로운 원시 타입이다.
다른 데이터타입과의 차이점은 리터럴이 존재하지 않다는것이다.
##### code
```
- 사용법
let mySymbol = Symbol();
- ERROR!!!
new Symbol() 
- 심볼 인스턴스 생성 (권장하진않음)
Object(mySymbol);

Symbol(Description);
// Symbol생성 시 인자로 Symbol에 대한 '서술 문자열' 생성 가능. 
```

서술 문자열은 내부적으로 [[Descritipn]] 프로퍼티에 저장되며, toString() 메서드가 호출될 때 사용된다. 

Symbol의 주 목적은 고유한 key값을 생성하기 위함인거 같다.
```
const t2 = () => {
  let firstName = Symbol('first name');
  let person = {
    [firstName]: 'Nicholas',
  };
  // object[Symbol] 로 접근 가능 
```

##### Symbol.for(key);
a 함수에 정의된 Symbol을 b함수에서도 사용하고 싶다면 Symbol.for(key); 로 생성하면 된다. 그러면 인자로 받은 값으로 Symbol을 Symbol 전역 공간에 저장한다. 만약 동일한 key값이 존재할 경우 그 값을 반환한다.

######code
```
const t3 = () => {
  // Symbol.for(key); 
  // 1. 전역 심볼저장공간에 인자로 받은 key값의 Symbol이 존재하는지 찾은 이후 존재할 경우 그대로 반환, 존재하지 않을 경우 새로 정의
  let uid = Symbol.for('uid');
  let object = {
    [uid]: '12345',
  }

  console.log(object[uid]) -- '12345'
  console.log(Symbol.for('uid')) -- Symbol('uid')

  return object;
}
```

##### Symbol.KeyFor
전역 심벌 저장소에서 심벌과 관련된 키를 탐색 가능




