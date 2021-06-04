---
title: JavaScript | 프로토타입 Prototype
author: Positive Ko
date: 2021-06-04
hero: ./images/hero.jpeg
excerpt: <자바스크립트 닌자 비급> 6장을 읽고서 JavaScript의 프로토타입에 대해서 정리해봅니다.
slug: javascript-prototype
---

<annotation>이 글은 자바스크립트 닌자 비급의 6장을 읽고 정리한 글입니다.</annotation>



### 0. 프로토타입이란? Prototype

자바스크립트의 **프로토타입**은 무엇일까요?
프로토타입 객체는 다른 객체의 원형이 되는 객체입니다.

흔히 알려진대로 자바스크립트는 프로토타입 기반의 언어입니다.
Class가 아닌 프로토타입 같은 **객체 원형**을 기반으로 새로운 객체를 만들어낼 수 있고, 객체를 확장하며 객체 지향적인 프로그래밍을 가능하게 합니다.
ES2015부터 JS에서도 Class를 지원하기 시작했지만, 클래스라는 문법이 추가된 것일 뿐 자바스크립트가 클래스 기반으로 바뀐 것이 아니며 여전히 프로토타입을 기반으로 합니다.

<emphasizing>💡 자바스크립트의 모든 객체는 자신의 부모 역할을 하는 객체와 연결되어 있습니다. 그리고 이것은 마치 객체지향의 상속 개념과 같이 부모 객체의 프로퍼티를 마치 자신의 것처럼 쓸 수 있는 것 같은 특징이 있습니다. 자바스크립트에서는 이런 부모 객체를 <strong>프로토타입 객체</strong>라고 부릅니다. 즉 자바스크립트의 모든 객체는 자신의 프로토타입을 가리키는 `[[Prototype]]`이라는 숨겨진 프로퍼티를 가집니다.</emphasizing>

> Object.getPrototypeOf()

프로토타입의 접근은 과거 ECMAScript 2015 이전까지는 `__proto__` 프로퍼티를 이용해서 접근했으나, 현재는 `Object.getPrototypeOf()` 메서드를 활용합니다.
또한 프로토타입을 수정하기 위해 `Object.setPrototypeOf()`를 사용합니다.

### 1. 객체 인스턴스 생성과 프로토타입

```javascript
const person = {};
person.name = 'positiveko';
person.nickname = '긍정코'
person.age = 77;
```

위처럼 새로운 빈 객체를 만들고 할당 구문을 통해 프로퍼티를 덧붙여봅니다.
하지만 value만 다른 또 다른 person 객체를 만드려면 매번 개별적으로 프로퍼티를 새로 할당해주어야 합니다.
따라서 **클래스처럼 한 곳에서 프로퍼티와 메서드를 통합해서 설정하는 수단**이 있다면 좋겠죠.
자바스크립트는 다른 Java와 C++ 같은 객체 지향 언어와 마찬가지로 생성자로 객체를 생성할 수 있는 `new 연산자`를 제공합니다.
하지만 `new 연산자`는 단순히 빈 객체를 새로 생성할 뿐입니다. **이 때, 프로토타입이 새로 생성되는 객체에 대한 청사진 역할을 할 수 있습니다.**


new 연산자를 사용할 때와 사용하지 않았을 때를 비교해보겠습니다.
아무 것도 하지 않는 Person() 함수를 정의하고 두 가지 방법으로 호출해봅니다.
```javascript
function Person(){};

Person.prototype.name = () => 'positiveko';

// 1: 일반 함수로 호출
const person1 = Person();
console.log(person1); // undefined

// 2: new 연산자로 호출
const person2 = new Person();
console.log(person2); // Person { __proto__: { constructor: ƒ Person(), name: ƒ () } }
console.log(person2.name()); // 'positiveko'
```

일반 함수로 실행했을 때는 반환 값이 undefined 입니다.
하지만 `new 연산자`로 호출했을 때는 새로운 객체가 생성되고 이 객체가 함수의 콘텍스트로 설정됩니다. 
**즉, 함수의 프로토타입이 새로운 객체 생성을 위한 일종의 청사진으로 작동한다는 것을 보여줍니다.** 



#### 함수 내에서 this 매개변수를 사용하여 객체를 초기화할 수도 있습니다.
```javascript
function Person(){
  this.nickname = '긍정코'
  this.introduce = () => `Hello, I'm ${this.nickname}`
};

Person.prototype.introduce = () => this.nickname;

const person = new Person;
console.log(person.introduce()); // "Hello, I'm 긍정코"
```

위의 예제를 보면 prototype 메서드 대신 생성자 함수 내에서 정의한 프로퍼티가 우선한다는 것을 알 수 있습니다. 

<emphasizing>
💡 초기화 진행 순서를 정리해보자면, <br />
  1) 프로토타입의 프로퍼티들이 새로 만들어진 객체 인스턴스와 바인딩된다.<br />
  2) 생성자 함수 내에서 정의한 프로퍼티들이 객체 인스턴스에 추가된다.
</emphasizing>

잊지맙시다... 생성자 내에서 바인딩한 것이 항상 프로토타입에서 바인딩된 것보다 우선한다는 걸...!



#### constructor 프로퍼티는 객체의 생성자를 참조합니다. 
```javascript
function Person(){
  this.nickname = '긍정코'
  this.introduce = () => `Hello, I'm ${this.nickname}`
};

const positiveko = new Person();
console.log(positiveko.constructor); // ƒ Person()
positiveko.constructor.prototype.name = 'positiveko';
console.log(positiveko.name); // 'positiveko'

const mengkki = new Person();
console.log(mengkki.name); // 'positiveko'
```

여기서 알 수 있는 중요한 사실은,
객체의 어떤 프로퍼티를 참조할 때 객체에 해당 프로퍼티가 없다면 프로토타입에서 그 프로퍼티를 찾는다는 점입니다.

<emphasizing>
💡 다시 한번 이 과정을 정리해보자면, <br />
  1) 객체의 프로퍼티를 참조하면, 그 객체는 자신에게 해당 프로퍼티가 있는지 검사한다. 만약 해당 프로퍼티가 존재한다면 그 값을 사용하고, 없다면...<br />
  2) 그 객체와 관련된 프로토타입에 해당 프로퍼티가 있는지 검사한다. 만약 있다면 프로토타입에 있는 값을 사용하고, 없다면...<br />
  3) 그 값은 `undefined`이다.
</emphasizing>

### 2. 생성자와 객체 타입

#### instanceof 연산자
```javascript
function Person(){
};

const positiveko = new Person();

console.log(positiveko instanceof Person); // true
console.log(positiveko.constructor === Person); // true
```

위의 예제를 보면 instanceof 연산자를 통해 어떤 생성자 함수를 사용하여 인스턴스를 만들었는지를 알 수 있습니다.
또 constructor 프로퍼티를 이용해서 인스턴스를 생성한 원본 함수를 알 수 있네요.

그럼 한번 이 constructor를 가지고 두 명의 사람을 만들어봅시다.

```javascript
function Person(){
};

const person1 = new Person();
const person2 = new person1.constructor();

console.log(person2 instanceof Person); // true
console.log(person1 !== person2) // true
```

먼저 person1을 Person 생성자를 통해 만들어줍니다. 그리고 person2는 constructor 프로퍼티로 만들어주었습니다.
person2는 Person 생성자 함수를 사용한 인스턴스라는 것을 보여주지만, person1과 person2는 다른 인스턴스라고 나옵니다.
이를 통해 원본 Person 생성자 함수를 직접적으로 사용하지 않더라도 constructor 프로퍼티를 사용해서 Person 생성자 함수를 참조할 수 있다는 것을 알 수 있습니다.

### 3. 상속과 프로토타입 체인

이번에는 prototype을 사용해서 어떻게 상속을 구현할 수 있는지 알아봅시다.
가장 간단해보이는 방법으로 시도해봅니다.

```javascript
function Person(){};
Person.prototype.speak = function(){};
// 말하는 사람을 구현했다.

function Cat(){};
Cat.prototype = {speak: Person.prototype.speak};
// 사람이 말을 하는 것처럼 고양이도 말하게 해보자.

const cat = new Cat();
console.log(cat instanceof Cat); // true
console.log(cat instanceof Person); // false
console.log(cat instanceof Object); // true
```
cat이 말하도록 프로토타입에 추가해보았지만 결국 Cat은 Person 프로토타입의 기능을 상속받지 못했습니다. 어떻게하면 사람의 speak 메서드를 물려줄 수 있을까요?

#### Person 생성자를 사용해보자!

```javascript
function Person(){};
Person.prototype.speak = function(){};

function Cat(){};
Cat.prototype = new Person();
// 이번에는 Person 생성자를 Cat의 프로토타입에 넣어주었다.

const cat = new Cat();

console.log(cat instanceof Cat); // true
console.log(cat instanceof Person); // true
console.log(cat instanceof Object); // true
```

이번에는 Person의 인스턴스를 Cat의 프로토타입으로 지정해서 Cat이 Person을 상속하도록 합니다. 
이제 cat은 말하는 고양이가 되었습니다... 🐈


#### Object.create() 이용하여 상속받을 수도 있다.
ECMAScript 2015에 추가된 [Object.create()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create)를 사용해서 첫 번째 인수로 프로토타입을 넘겨줄 수도 있습니다.
```javascript
const obj = {
  name: 'edie',
  introduce: function() {
    return `Hello, I'm ${this.name}`
  } 
}

const person = Object.create(obj);
console.log(person.introduce()); // "Hello, I'm edie"
```



#### 더 읽어보면 좋은 글
[[Javascript ] 프로토타입 이해하기 (오승환님 블로그)](https://medium.com/@bluesh55/javascript-prototype-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0-f8e67c286b67)
[Javascript 기초 - Object prototype 이해하기 (Insanehong 님 블로그)](http://insanehong.kr/post/javascript-prototype/)