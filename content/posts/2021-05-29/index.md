---
title: CSS | 눈동냥으로 얻은 괜찮은 CSS 트릭 모음집
author: Positive Ko
date: 2021-05-29
hero: ./images/hero.jpeg
excerpt: last-child 선택자를 쓰는 당신... 멈춰!!🖐🏻ﾠ last-child를 사용하지 않는 Enabling CSS 패턴을 비롯해, 잘 몰랐던 CSS 프로퍼티들을 정리합니다. 
slug: enabling-css-and-properties
---

### 0. 들어가면서

오늘은 그동안 등한시하던 CSS를 되짚어보는 시간입니다.
그동안 여기저기서 읽고 들은 건 많은데, 글로 정리되지 않아 제대로 활용해보지 못했던 CSS 프로퍼티들을 정리합니다. 


---

### 1. last-child를 사용하지 않고 :not 가상클래스로 enabling 패턴 적용하기

아래와 같은 리스트가 있습니다. 
```html
  <ul>
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
    <li>5</li>
  </ul>
```
만약 리스트 사이사이 보더 라인을 넣어주고 싶다면, 전체 li 태그에 밑줄을 넣어주고 마지막 child는 제거하는 방식으로 해왔습니다. 아래처럼요.(SCSS 기준)

```scss
li {
  border-bottom: 1px solid black;

  :last-child {
    border-bottom: none;
  }
}
```
여기서 어떻게하면 last-child 선택자를 이용해서 disabling 해주는 대신, **enabling 패턴**으로 작성할 수 있을까요? 
[:not (부정 negation) 가상 클래스](https://developer.mozilla.org/ko/docs/Web/CSS/:not) 를 이용하면 됩니다.
:not() 선택자는 인자로 들어온 것을 제외한 나머지에 대해 스타일 프로퍼티를 넣을 수 있습니다.

```scss
li:not(:last-child) {
  border-bottom: 1px solid black; 
}
```
'last-child를 제외한 나머지 li에 밑줄을 넣어줘!'라는 뜻입니다.
:not 가상 클래스를 이용해서 더 간결하게 작성할 수 있습니다.

혹은 [+ (인접 선택자)](https://developer.mozilla.org/ko/docs/Web/CSS/Adjacent_sibling_combinator)를 사용할 수 있습니다.
`+ 선택자` 는 선택자 앞의 요소 바로 뒤에 있는 요소만 선택해서 적용합니다.
따라서 이번에는 border-top을 적용해주면 되겠네요.

```scss
li + li {
  border-top: 1px solid black;
}
```

enabling CSS에 대한 자세한 내용은 [여기](https://www.silvestar.codes/articles/you-want-a-single-enabling-selector-not-the-one-that-disables-the-rule-of-the-previous-one/)를 참고합니다.


---

### 2. !important보다 더 간단하게 :all 프로퍼티
기존의 CSS 프로퍼티를 override 하고 싶을 때 `!important` 프로퍼티를 많이 사용합니다.
다른 세팅을 무시하고 내가 바로 지금 적은 것만 적용하고 싶을 때 사용하는 방법인데요,
만약 !important를 적용해야 할 프로퍼티가 많아진다면 일일이 !important를 적어야겠죠. 
그럴 때는 [all property](https://developer.mozilla.org/ko/docs/Web/CSS/all)를 사용해서 초깃값으로 세팅해줄 수 있습니다.
(SCSS 기준)

```html
<button>
  <span>Hello</span>
</button>
```

```scss
button {
  color: red !important;
  
  span {
    all: initial;
  }
}
```
`all: initial` 적용만으로 span의 CSS 설정은 초깃값으로 돌아갑니다.
이외에도 inherit, unset이 있습니다. 자세한 내용은 [MDN](https://developer.mozilla.org/ko/docs/Web/CSS/all)을 참고합니다.


---

### 3. CSS를 SCSS처럼 쓸 수 있게 해주는 :is, :where selector

저는 SCSS를 사용하고 있습니다. CSS를 사용하지 않는 가장 큰 이유는 SCSS의 nesting 때문이었는데요,
이제는 [:is](https://developer.mozilla.org/en-US/docs/Web/CSS/:is)와 [:where 선택자](https://developer.mozilla.org/en-US/docs/Web/CSS/:where)를 이용해서 CSS에서도 SCSS의 네스팅을 어느 정도 구현할 수 있습니다.

```css
section h1, article h1, aside h1, nav h1 {
  font-size: 25px;
}

/* :is selector를 사용한다면 조금 더 간단해집니다*/
:is(section, article, aside, nav) h1 {
  font-size: 25px;
}

/* :where selector도 마찬가지입니다.*/
:where(section, article, aside, nav) h1 {
  font-size: 25px;
}
```

그렇다면 `:is selector` 와 `:where selector`의 차이점은 무엇일까요?
바로 우선순위의 차이입니다.
<emphasizing>💡  The selectors inside :is() count towards the specificity of the overall selector, and class selectors have a higher specificity than element selectors. However, selectors inside :where() have specificity 0, so the orange footer link will be overridden by our simple selector. - MDN</emphasizing>

:where 선택자는 다른 간단한 선택자에 의해서 override 될 수 있지만, :is 선택자는 더 높은 우선순위를 갖습니다.
자세한 내용은 [여기](https://developer.mozilla.org/en-US/docs/Web/CSS/:where#examples)를 참고합니다.

---

### 4. @media로 CSS로 다크모드 구현하기 
최근 들어 다크 모드를 지원하는 게 트렌드인데요, 사용자의 눈의 피로를 줄여주고 UX까지 향상하는 다크모드는 `CSS @media 쿼리`를 이용해 만들 수 있습니다.

[prefers-color-scheme](https://developer.mozilla.org/ko/docs/Web/CSS/@media/prefers-color-scheme)는 CSS의 미디어 특성인데요, 유저의 OS가 라이트 모드인지 다크 모드인지를 탐지하는 데에 사용할 수 있습니다.


```css
:root {
  --bg-color: #fff;
  --text-color: #111;
  --cta-bg-color: #00a0f9;
  --cta-text-color: #fff;
  --btn-bg-color: #222;
  --btn-text-color: #fff;
}

@media (prefers-color-scheme: dark) {
  
  :root:not([theme="light"])  {
    --bg-color: #111;
    --text-color: #fff;
    --cta-bg-color: #ae63e4;
    --cta-text-color: #e3e4e8;
    --btn-bg-color: #fff;
    --btn-text-color: #222;
  }
}
```

자세한 다크모드 적용 방법은 [여기](https://www.youtube.com/watch?v=Jnn88lzJjWs&t=2s)를 참고합니다.



---
정리한 내용은 여기까지입니다.

감사합니다!
