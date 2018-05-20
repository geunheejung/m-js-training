// - 템플릿 리터럴
/*
  템플릿 리터럴은 중첩이 가능하다. `${ ` ${} ` }`
  let name = "geuni",
  message = `Hello, ${
    `my name is ${name}`
    }.`;

console.log(message);
*/

// - 템플릿 태그
/*
  템플릿 리터럴을 변환하고 마지막 문자열 값을 반환한다.
  ex) let message tag`Hello world`; 이처럼 첫 ` 문자 앞에 tag 명시
  개별 조각으로 분해된 템플릿 리터럴을 결합하는 역할
  첫번째 인자 -> 자바스크립트가 리터럴을 해석(interpreted)하여 얻은 리터럴 문자열로 이루어진 배열.
  그 후 rest연산자로 모이는 인자들은 각 치환자의 해석된 값이다.
*/
function tag(literals, ...substitutions) {
  // 문자열 반환
}
/*
  passthru 태그 함수가 정의되어있다면 첫번째 인자는 다음과 같은 요소를 가진 literals 배열일 것이다.
  1. 첫번째 치환자 앞 빈 문자열 ("");
  2. 첫 번째 치환자 뒤에서 부터 두번 째 치환자 앞까지의 문자열  " items cost $"
  3. 두 번째 치환자 뒤 문자열 "."
  그 이후 인자들은 count 변수가 인터프리트된 값인 10이고 이 값은 substitutions 배열의 첫 번째 요소가 된다.

  첫번째인자인 literals배열의 첫번째 인자는 무조건 빈값이다. 이는
  literals[literals.length - 1]이 항상 문자열의 끝인것 처럼 literals[0]이 항상 문자열의 시작이다.

  var a = 'abcdefghijklmnopqrstonwxyz';
console.log(a[0]); -- a
console.log(a[a.length - 1]); -- z
*/

const passthru = (
  literals/* 템플릿 리터럴 */,
  ...substituions /* 치환자 */
) => {
  // 첫번째 인자 -> 자바스크립트가 리터럴을 해석(interpreted)하여 얻은 리터럴 문자열로 이루어진 배열.
  // 그 후 rest연산자로 모이는 인자들은 각 치환자의 해석된 값이다.
  let result = '';

  // substituions.length === literals.length - 1
  // 즉 substituions.length로 Loop를 돌아도 두 배열모두 순회한다.
  // 이 패턴을 사용하면 literals[i]와 substituions[i]를 번갈아서 출력함으로써 기본적인 템플릿 리터럴의 처리를 흉내
  for (let i = 0, subMax = substituions.length; i < subMax; i++) {
    console.log('literals               ::', literals[i]);
    result += literals[i];
    console.log('substituions           ::', substituions[i]);
    result += substituions[i];
  }

  // 마지막 리터럴 추가
  result += literals[literals.length - 1]

  return result;
}

let count = 10,
  price = 0.25,
  message = passthru`${count} itmes cost $${(count * price).toFixed(2)}.`;

console.log(message);


