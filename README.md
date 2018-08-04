# Spoon on the table

Parse-Server + Next.js + React 구조의 SSR 프로젝트

## 오늘 다룰 내용

## Todo List

> v 완료, 0 진행중, - 고민중

- [ ] 상세페이지 보기
- [ ] Storybook 설정
- [ ] 소셜 인증: 페이스북으로 연결해서 로그인하면 회원가입페이지로 이동한다.
- [ ] 회원 이메일 인증
  - [ ] 회원가입후 메일이 유효한지 확인하는 메일을 보낸다.
  - [ ] 회원가입후 로그아웃 시켜준다. (메일이 유효하지 않으면 로그인을 시켜주지 않는다. 에러메시지로 확인을 보내줌..) / 정책문제
- [ ] 결제모듈 붙이기
- [ ] 지역, 시간, 좌석수로 검색하기
- [ ] 홈스테이 호스트 추가하기
- [ ] 지도에서 검색하기

## 방송 주제

- [ ] Jest와 Enzyme 테스트 환경 정리
  - 테스트란 무엇인가?
  - 우리는 무엇을 테스트 할것인가?
  - 코드 커버리지와 분기 커버리지
  - 커버리지 리포트
  - 통합테스트와 유닛테스트 분리: 의미없는 테스트 제거

- [ ] 커밋전에 스타일 통일하기
  - 이런게 왜 필요하냐? --> 스타일가지고 싸우지 좀 마!
  - eslint + prettier + husky + lint-staged 설정
  - deprecated eslint-plugin-class-property@1.1.0: please use eslint-plugin-babel and babel/semi
  - 포맷터 만들어 공유하기
  - AirBnB 와 ESLint 스타일 가이드 (빡시다 다 따를 필욘없다.)
  - 에디터와 포맷팅을 맞추는것도 중요하다.

- [ ] 이미지 서버 만들기
  - 이런 서버가 왜 필요해?
  - 리사이즈 /image/:photoId?size=xxx 형태로 던지면 원하는 형태로 리사이즈한다.
  - 오리엔테이션 바로 잡기
  - 매번 호출할때마다 하면 비효율이다 캐시하자! 아니 새로 저장하자!

- [ ] Next.js 의 프리패칭
  - 프리패칭이란?
  - 뭐가 좋아?
  - 하는 방법은? with Link, Routing API

- [ ] 배포 자동화
  - githook 받기
  - 빌드 서버
  - 배포 환경은 어떻게 해야하나?
  - 테라포밍

## 초기 프로젝트 설정

프로젝트는 Node.js 기반의 Express 서버에 PaserServer와 PaserDashboard를 일단 붙여놨다.
React Server-Side 랜더링을 위해서 After.js를 선택했다가 다시 Next.js로 변경했다.

After.js는 Next.js에 React-Router를 붙인 개념으로 이해하면된다. 하지만 아직은 설정에 허들이 많아서 삽질하다가 접었다. 쓰다보니 Next.js 훨씬 간편했다.

폴더구조는 Next.js가 추구하는 방향 그대로 따랐다.

### 코딩규칙

#### 1. React 컴포넌트 작성

- 리액트 컴포넌트는 `/components` 하위에 작성하고, `index.js`에 참조를 추가해준다.
- 리액트 컴포넌트는 `jsx` 확장자를 사용한다. jsx 확장자를 사용하면 VSCode에서 자동으로 타입을 찾아준다.
- 서버 페이지는 `/pages` 하위에 작성하고, 파일명은 소문자_언더스코어로 한다.
- 모든 스타일은 컴포턴트 안에 style-jsx로 작성한다.
- 공통 스타일이 있는 경우 Layout 헤더에 추가한다.

#### 2. 서버 라우터 작성

- 서버 라우터는 `server.js` 파일에서 관리한다. 특별한 라우터가 필요할 경우에만 작성하고 일반 페이지 라우터는 Next.js 규칙을 따라 `/pages` 하위에 작성한다.

#### 3. 프로젝트 폴더 구조

```js
Next.js 문서에서 추천하는 구조
- Next_PRJ/
   |- .next/
   |- components/
   |- layouts/
   |- pages/
       |- _document.jsx

- ParseServer_PRJ/
   |- cloud/
   |- lib/
   |- logs/
   |- server.js

```

## Ant Design 설정

Ant Design의 스타일 설정을 필요한 부분만 뽑아서 하려니 좀 귀찮고, 레이아웃 페이지를 만들고 HTML Head 에 스타일 CSS 파일 전체를 통째로 삽입하는 방식으로 많이들 사용하고 있다.

## 트러블 슈팅

### 1. Nextjs 에서 라우팅할때 데이터를 함께 넘기는 방법

```javascript
Router.push(href, as, { shallow: true })

```

- Router.push 할때 첫번째 인자에 query string 을 넣고, 두번째 파라메터에 as url을 심플하게 입력하면 쿼리를 숨길수 있다.
- Router.push에 세번째 인자로 shallow를 넘기면 서버 페이지(pages/)가 로드될때 getInitialProps 를 Skip 할수 있다.
- 쿼리로 데이터를 넘기면 getInitialProps 에서 쿼리를 꺼내 쓸수 있다.

### 2. 도큐먼트 스타일 지정하기

pages/_document.js 파일을 지정하면 `<body>` 태그 밖에 문서 스타일 포맷을 지정할 수 있다.

[참고링크 1](https://github.com/zeit/next.js#custom-document)
[참고링크 2](https://github.com/zeit/next.js/wiki/Global-styles-and-layouts)

### 3. 데이터를 받아서 Antd 폼의 초기값 설정하기

폼을 생성할때 mapPropsToFields 함수를 이용해 지정할수 있다.
```javascript

const WrappedLoginForm = Form.create({
  mapPropsToFields(props) {
    return {
      email: Form.createFormField({ value: props.email })
    };
  }
})(LoginForm);

```

#### 참고링크

- [global-state](https://ant.design/components/form/#components-form-demo-global-state)

### 4. Parse.Promise 의 함수 시그니처

```javascript

Parse.User.login()
  .then(resolved, rejected)
  .catch()

```

### 5. 파스서버에 로그인 하는 방법

파스 서버에 로그인하는 방법은 SDK를 이용하는 방법과 REST API를 직접 호출하는 방법이 있다. 어떤 방법을 사용하든 파스 서버에 로그인하면 유저 세션(Session)은 파스 서버가 관리해준다.
즉, 로그인한 정보 관리는 Express 세션 없이도 관리가 가능한다.

#### 1. Parse SDK 를 이용하는 방법

SDK 이용은 보통 클라이언트(App)에서 쓰인다. 웹(자바스크립트)에서 사용할땐 중요한 키값들이 노출되므로 모양새가 이쁘지는 않다. 다만 App에서는 이런 키가 패키징되므로 비교적 안전하다.

SDK로 로그인하면 기본적으로 localStorage에 세션 정보(세션토큰과 유저정보)를 저장하게 된다. 따라서 웹에서 SPA를 구현한다면 항상 로그인한 이후에 로컬 스토리지에 저장된 세션토큰을 이용해 정보를 얻을수있다.

#### 2. REST API를 이용하는 방법

NodeJS 서버를 이용할 경우 SDK를 이용하는 것보다 GET /api/login 엔드포인트를 만들고 직접 REST API를 호출하는 것이 비교적 안전하다. (키값 노출이 없다.)

다만, REST API로 구현하면 웹 클라이언트 쪽으로 쿠키를 이용해 토큰을 내려주고, 요청을 받을때 쿠키에 박힌 토큰을 보고 유저를 직접 판단해야한다.

### 6. Ajax 응답으로 쿠키(set-cookie) 설정하기

클라이언트에서 요청할때 보안 관련 옵션인 `credentials`을 설정해주어야한다.

- `credentials:'same-origin'` - 같은 도메인일 경우 쿠키 허용
- `credentials:'include'` - 다른 도메인일때도 쿠키 허용, (서버에 CORS 설정이 필요)

***참고링크***
- [sending-cookies](https://github.com/github/fetch#sending-cookies)
- [withcredentials](https://xhr.spec.whatwg.org/#the-withcredentials-attribute)

## 7. 서버 라우팅과 클라이언트 라우팅

SSR 이후에 이동하는 모든 링크는 클라이언트 라우팅으로 이동해야 속도가 빠르다. 그렇지않고 서버를 한번 거치면 모든걸 새로 받기 때문에 그만큼 느리다. 링크 이동시 브라우저 타이틀에 새로고침 표시가 되는지 항상 주시하고 클라이언트 라우팅이 될수있도록 <Link> 나 Routing API 를 이용한다.

보다 나은 성능을 위해서는 prefetch를 기본으로 사용한다. 단, DEV 모드에선 동작하지 않는다.

## 8. 처음 SSR 로드할때 스타일(styled-jsx)이 만들어 지지 않는 문제

일단 [styled-jsx는 서버 랜더링이 되지 않는다.](https://github.com/zeit/next.js#built-in-css-support) 따라서 이 문제를 해결하려면 스타일을 직접 삽입하거나 sass, less 같은 프리 컴파일 프로세서를 이용해서 삽입해야한다.

주의할점! pages/_document.js 에서는 컴파일 스타일이 적용되지 않는다.

## 9. Jest + Enzyme 환경 설정

[Jest는 기본적으로 jsdom 환경](https://jestjs.io/docs/en/configuration#testenvironment-string)에서 동작하기때문에 node 환경에서 동작하려면 ```testEnvironment: 'node'```로 설정을 변경해야한다.

이렇게 Jest를 node 환경으로 변경하면 Enzyme 같이 DOM 을 필요로 하는 녀석들은 jsdom 환경을 직접 만들어줘야한다. 자세한 설정은 /__test__/setupTest.js 파일을 참고한다.
