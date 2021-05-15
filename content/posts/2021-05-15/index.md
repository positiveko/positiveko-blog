---
title: JavaScript | 함수를 자유자재로 휘두르기
author: Positive Ko
date: 2021-05-15
hero: ./images/hero.jpg
excerpt: 자바스크립트 닌자 비급 4장 요약
slug: usage-of-function
---

# 4장 함수를 자유자재로 휘두르기

## 1. 익명 함수

익명 함수는 함수를 변수에 저장하거나, 어떤 객체의 메서드로 설정하기 위해, 또는 콜백으로 활용하는 것과 같이 나중에 사용하기 위한 함수를 만들 때 주로 사용한다. 

## 2. 재귀

함수가 스스로를 호출하거나, 함수 내에서 다른 함수를 호출하는 과정(호출 트리)에서 원래 호출된 함수가 호출될 때, 재귀가 일어난다.

### 2.1 이름을 가진 함수 내에서의 재귀

팰린드롬(Palindrome)이란, 역순으로 읽어도 같은 말이나 구절 또는 숫자를 말한다. (ex. eye, level, 복불복 ... )

수학적으로 팰린드롬을 정의해보면 

- 문자가 1개 또는 0개인 문자열
- 첫 문자와 마지막 문자가 같고 나머지 부분이 팰린드롬인 문자열이다.

이 팰린드롬을 함수로 구현해보면 아래와 같다.

```jsx
function isPalindrome(text) {
  if (text.length <= 1) return true;
  if (text.charAt(0) !== text.charAt(text.length - 1)) return false;
  return isPalindrome(text.substr(1, text.length - 2));
};

isPalindrome('복불복'); // true
isPalindrome('level'); // true
isPalindrome('eye'); // true
isPalindrome('mountain'); // false
```

여기에서 이 함수가 재귀적인 이유는 함수 내부에서 문자열이 팰린드롬인지 결정하는 데에 팰린드롬의 정의를 이용하기 때문이다. 

또 다른 함수를 만들어보자.

```jsx
function chirp(n) {
  return n > 1 ? `${chirp(n - 1)}-chirp` : 'chirp'
}
console.log(chirp(3)) // 'chirp-chirp-chirp'
console.log(chirp(5)) // 'chirp-chirp-chirp-chirp-chirp'
```

위 함수는 재귀적으로 소리를 내는 함수이다. 

위의 두 가지 예시처럼 재귀 함수는 1) 자신은 참조하면서, 2) 매개 변수인 n을 감소 시키면서 호출이 중단되어야 한다. 종료되지 않는 재귀함수는 바로 무한루프이다.

## 2.2 메서드를 이용한 재귀

닌자에게 소리를 낼 수 있는 능력을 주자. 재귀 함수를 닌자 객체의 메서드로 선언하는 것이다.

```jsx
const ninja = {
  chirp: function(n) {
    return n > 1 ?  `${ninja.chirp(n - 1)}-chirp` : 'chirp'
  }
}

ninja.chirp(3); // 'chirp-chirp-chirp'
```

### 2.3 참조가 사라지는 문제

위의 예시처럼 참조에 의존하는 것은 위험하다. 함수의 실제 이름과 달리 참조는 변할 수 있기 때문이다. 

다음 예시를 보자.

```jsx
let ninja = {
  chirp: function(n) {
    return n > 1 ? `${ninja.chirp(n - 1)}-chirp` : 'chirp'
  }
}

const samurai = { chirp: ninja.chirp }
ninja = {};

try {
  console.log(samurai.chirp(3))
} catch(e) {
  console.log(false, '실패')
}

// false '실패'
```

위의 예시를 실행해보면 재귀호출에 실패하는 것을 볼 수 있다.

그 이유는 samurai.chirp를 실행하더라도, chirp는 자신을 실행할 때 본인을 호출한 samurai가 아닌 ninja를 함수 콘텍스트로 삼기 때문이다.

이 문제를 해결하기 위해서는 익명 함수 내에서 함수의 콘텍스트인 this를 사용해야 한다.

```jsx
let ninja = {
  chirp: function(n) {
    return n > 1 ? `${this.chirp(n - 1)}-chirp` : 'chirp'
  }
}

const samurai = { chirp: ninja.chirp }
ninja = {};

try {
  console.log(samurai.chirp(3))
} catch(e) {
  console.log(false, '실패')
}

// 'chirp-chirp-chirp'
```

 

### 2.4 이름을 가진 인라인 함수

익명 함수에 이름을 붙인 것을 '인라인 함수 inline function'이라고 한다.

```jsx
let ninja = {
  chirp: function signal(n) {
    return n > 1 ? `${signal(n - 1)}-chirp` : 'chirp'
  }
};

console.log(ninja.chirp(3)); // 'chirp-chirp-chirp'

const samurai = { chirp: ninja.chirp }
ninja = {};

console.log(samurai.chirp(3)); // 'chirp-chirp-chirp'
```

위처럼 인라인 함수를 사용하면 ninja의 chirp 프로퍼티를 삭제하더라도 문제가 되지 않는다. 인라인 함수에 지정된 이름과 인라인 함수를 재귀호출하는 데에 아무런 영향을 주지 않기 때문이다.

이처럼 인라인 함수에 이름을 지정하면 활용성이 높이진다. 다음은 일반적인 변수에 인라인함수를 할당한 예시다.

```jsx
const ninja = function myNinja() {
  console.log(ninja === myNinja)
}

ninja(); // true

console.log(typeof myNinja === 'undefined') // true
// 다만 인라인 함수는 해당 함수 외부에서는 사용할 수 없다.
```

이처럼 재귀호출을 할 때 이름을 지닌 인라인 함수를 이용하는 방식이 this를 활용하는 것보다 더 명료한 방법임을 알 수 있다. 하지만 이 방법도 다른 용도로 사용할 때는 제약사항이 있다. 

또 다른 방법은 없을까?

## 2.5 callee 프로퍼티

앞서 3장에서 본 것처럼 arguments 매개변수는 암묵적으로 모든 함수에 전달된다. arguments 매개변수는 callee라는 프로퍼티를 가지고 있는데, 이것은 현재 실행 중인 함수를 가리킨다. callee 프로퍼티를 사용하면 항상 안정적으로 함수 자체를 참조할 수 있다. 

```jsx
const ninja = {
  chirp: function(n) {
    return n > 1 ? `${arguments.callee(n - 1)}-chirp` : 'chirp'
  }
};

console.log(ninja.chirp(3)); // 'chirp-chirp-chirp'
```

주의: arguments.callee는 ES5 'strict'모드에서 callee 프로퍼티를 사용할 수 없다. 자세한 내용은 [mdn](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Functions/arguments/callee) 참고.

## 3. 함수 객체 가지고 놀기

함수가 다른 객체 타입과 유사한 점을 활용하는 방법을 살펴보기 전에, 함수의 중요한 개념을 다시 살펴보자.

- 함수는 변수에 할당할 수 있고,
- 함수를 객체의 프로퍼티에 할당해 메서드를 만들 수 있다.
- 함수에 프로퍼티 또한 추가할 수 있다.

```jsx
const obj = {};
const fn = function(){};
obj.prop = '객체에 프로퍼티 추가하듯이';
fn.prop = '함수에도 프로퍼티를 추가할 수 있다.'
```

### 3.1 함수 저장하기

```jsx
const store = {
  nextId: 1,
  cache: {},
  add: function(fn) {
    if(!fn.id) {
      fn.id = store.nextId++;
      return !!(store.cache[fn.id] = fn);
    }
  }
};

function ninja(){};

console.log(store.add(ninja)); // true
console.log(!store.add(ninja)); // true
console.log(store) // { nextId: 2, cache: { '1': ƒ ninja() }, add: ƒ add() }
```

위와 같이 함수는 이전에 수행한 연산의 결과를 저장해 놓을 수 있다. 이렇게 같은 연산을 수행하는 데 드는 시간을 절약할 수 있다.

### 3.2 연산 결과를 기억하는 함수

메모이제이션(memoization)은 이전의 계산 결과를 기억하는 기능을 갖춘 함수를 만드는 과정이다. 메모이제이션은 이미 수행한 복잡한 연산을 반복하지 않도록 함으로써 성능을 비약적으로 향상시킬 수 있게 해준다.

```jsx
function isPrime(value) {
  if(!isPrime.answers) isPrime.answers = {};
  
  if(isPrime.answers[value] != null) {
    return isPrime.answers[value];
  }
let prime = value != 1;
  for(let i = 2; i < value; i++) {
    if(value % i === 0) {
      prime = false;
      break;
    }
  }
  return isPrime.answers[value] = prime;
}

console.log(isPrime(5)); // true
console.log(isPrime.answers[5]); // true
```

위의 예제에서 cache는 isPrime을 처음 호출했을 때만 만들어진다. 

두 번째 실행부터는 value에 대한 계산된 결과 값이 isPrime의 answer에 저장되어 있는지 확인하는데, 있다면 for loop을 돌지 않고 기존에 캐시로 저장된 isPrime.answers[value]의 값을 반환한다. 없다면 연산을 실행하고 해당 값을 다시 isPrime.answer[value]에 저장한다.

이를 통해 본 메모이제이션의 장점은, 유저는 이전에 연산된 값을 요청할 때 연산이 중복적으로 수행되지 않으므로 성능 향상의 효과를 얻는다는 것이다. 하지만 단점으로는,

- 유형에 관계 없이 캐싱을 한다면 성능이 향상되기보다 메모리 사용량이 늘어날 수 있다.
- 함수와 메서드가 한 가지 일만 정확하게 처리하지 않으므로 캐싱이 비즈니스 로직과 혼재되는 상황이 발생한다.
- 메모이징으로 인해 부하 테스트나 알고리즘 자체의 성능 테스트가 어려워진다.

### 3.3 배열 메서드를 속이기

## 4. 가변인자 목록

### 4.1 apply() 메서드를 이용해서 가변 길이의 인자를 전달하기

배열에는 최솟값이나 최댓값을 검색하는 기능이 없다. Math 객체에 있는 min(), max() 메서드가 있지만, 이를 배열에 활용하려면 다음과 같이 써야한다.

```jsx
const biggest = Math.max(list[0], list[1], list[2], list[3]);
```

이 상황에서 배열의 크기를 알 수 없다거나, 배열의 크기가 굉장히 크다면 만족스러운 해결책은 아니다.

이 때, apply() 메서드를 사용할 수 있다.

```jsx
function smallest(array) {
  return Math.min.apply(Math, array);  
}

function largest(array) {
  return Math.max.apply(Math, array);
}

console.log(smallest([1, 2, 3, 4])); // 1
console.log(largest([1, 2, 3, 4])); // 4
```

### 4.2 함수 오버로딩

3.3에서 모든 함수에는 암묵적으로 내장된 arguments 매개변수가 전달된다는 것을 배웠다. 

모든 함수는 암묵적으로 arguments라는 중요한 매개변수를 전달받는데, 이것은 함수가 어떤 수의 인자도 처리할 수 있도록 해준다. 일정한 수의 매개변수만 정의했다고 하더라도  arguments 매개변수를 이용해서 전달된 모든 인자에 접근할 수 있다.

arguments 매개변수를 이용해서 효과적으로 함수 오버로딩을 구현하는 예를 찾아보자.

**가변인자 목록 순회하기**

```jsx
function merge(root) {
  for (let i = 1; i < arguments.length; i++) {
    for (let key in arguments[i]) {
      root[key] = arguments[i][key];
    }
  }
  return root;
}

const merged = merge(
  {name: "Edie"},
  {city: "Seoul"});

console.log(merged.name);
console.log(merged.city);
```

**인자 목록을 원하는 대로 자르기**

함수의 첫 번째 인자를 나머지 인자 중에서 가장 큰 값과 곱하는 함수를 만들어보자.

```jsx
function multiMax(multi) {
  return multi * Math.max.apply(Math, arguments.slice(1));
}

console.log(multiMax(3, 1, 2, 3)) 
// TypeError: arguments.slice is not a function
```

이렇게 구현했을 때 에러가 나는 이유는 무엇일까?

arguments가 length의 프로퍼티는 갖지만 Array는 아닌 유사배열이기 때문이다. 이 유사배열은 for loop을 사용해서 순회할 수 있지만 Array 타입보다는 사용할 수 있는 메서드가 제한된다. 다음과 같이 call() 메서드를 활용해서 해결해보자.

```jsx
function multiMax(multi) {
  return multi * Math.max.apply(
		Math, Array.prototype.slice.call(arguments, 1));
}

console.log(multiMax(3, 1, 2, 3)); // 9
```

**함수의 오버로딩에 대한 접근방법**

함수 오버로딩(function overloading)은 전달된 인자에 따라 함수의 동작이 달라지게 하는 기법을 말한다.

함수 오버로딩을 구현하기 위해 앞서 했던 것처럼 조건문을 활용할 수 있다. 하지만 상황이 복잡해질수록 조건문을 활용하는 데에 한계가 생긴다. 이 때 활용할 수 있는 것이 함수의 length 프로퍼티이다. 함수는 기대하는 인자의 수에 따라서 구분이 되고 분리된 익명 함수를 이용해 작성한다.

**함수의 length 프로퍼티**

함수의 length 프로퍼티는 함수가 어떻게 선언되었는지 알게 해준다. 바로 length는 함수를 선언할 때 지정한 이름을 가진 매개변수(named parameter)의 수가 저장되어 있다. 

```jsx
function makeNinja(name) {}
function makeSamurai(name, rank) {}
console.log(makeNinja.length); // 1
console.log(makeSamurai.length); // 2
```

결과적으로 함수 내에서 함수의 인자에 대해 두 가지를 알 수 있다.

- length 프로퍼티: 이름을 지닌 매개변수의 수
- arguments.length: 호출 시에 전달된 인자의 수

**인자의 개수를 이용한 함수 오버로딩**

함수의 인자를 기반으로 오버로드를 결정하는 데는 여러 방법이 있다. 

- 전달된 인자의 타입에 근거해서 다른 연산을 실행하는 것
- 특정 매개변수의 존재 유무에 따라 전환하는 것
- 전달된 인자의 수를 이용하는 것

## 5. 함수인지 확인하기

마지막으로 어떤 객체가 함수의 인스턴스이고 호출하는 것이 가능한지 알아보는 방법에 대해 정리해보자.

보통 typeof 구문을 활용하면 객체가 함수인지 알아낼 수 있다. 하지만 크로스 브라우저 이슈로 인해 브라우저에 따라 'object'가 아닌 'function'이 나오기도 하고 'unknown'이 나올 수도 있다. 따라서 call() 메서드를 활용해 다음과 같이 함수인지 확인할 수 있다.

```jsx
function isFunction(fn) {
  return Object.prototype.toString.call(fn) === "[object Function]";
}

const arr = [1, 2, 3];
const func = () => {};

isFunction(arr); // false
isFunction(func); // true
```

여기서 fn.toString()을 직접 호출하지 않는 이유는 

- 개별 객체가 자신만의 toString()을 가지고 있을 가능성이 있고,
- 자바스크립트에서 대부분의 타입은 Object.prototype이 제공하는 메서드를 오버라이딩하여 고유한 toString() 메서드를 가지고 있기 때문이다.

따라서 Object.prototype 메서드에 직접 접근하면서, 오버라이드 되지 않은 본연의 toString() 메서드를 사용하여 정확한 타입을 얻을 수 있다.

## 6. 정리

- 익명 함수를 이용해서 작은 실행 단위의 함수를 만들 수 있다.
- 재귀 함수를 통해 다양한 방법으로 함수를 참조할 수 있다는 것을 배웠다.
    - 이름을 이용한 참조
    - 객체의 프로퍼티 명을 통해 메서드로 참조
    - 인라인 함수의 이름을 이용한 참조
    - argument의 callee 프로퍼티를 통한 참조
- 함수는 프로퍼티를 가질 수 있고, 프로퍼티를 통해 정보를 저장할 수 있다.
    - 나중에 참조하거나 호출하기 위해 함수의 프로퍼티에 함수를 저장.
    - 함수의 프로퍼티를 활용해 캐시 만들기(메모이제이션)
- 함수를 호출할 때 전달되는 콘텍스트를 조절하는 방식으로 메서드를 속여, 메서드를 소유하지 않은 객체를 대상으로 메서드가 동작하게끔 할 수 있다.
- 함수는 전달되는 인자에 따라 다른 연산을 수행할 수 있다.(함수 오버로딩)
- 객체가 함수의 인스턴스인지 확인하기 위해 typeof를 사용할 수 있다.