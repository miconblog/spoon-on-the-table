# Spoon on the table

## 오늘 다룰 내용

## Todo List

> v 완료, 0 진행중, - 고민중

- [v] 프로젝트 스켓폴딩 (SSR with Next.js or After.js)
- [v] antd 설정
- [ ] Storybook 설정
- [v] 로그인/가입 페이지
  - [v] 중복확인 응답 코드는 중복되면 492 / 중복되어 있지 않으면 200
  - [v] 이메일을 입력하면 서버에 등록된 이메일이 있는지 /api/v1/user/dupl?email=xxxx 를 던져본다.
  - [v] 중복메일이 아니면 가입 페이지로 이동한다.
  - [v] 중복메일이면 로그인 페이지로 이동한다.
  - [v] 로그인 페이지로 이동할때 중복이 확인된 이메일을 물고 넘어가야한다. (Route.push의 as와 getInitialProps를 응용 )
  - [ ] 페이스북으로 연결해서 로그인하면 회원가입페이지로 이동한다.
- [0] 회원가입 페이지
  - [0] 회원가입 페이지의 폼을 완성해서 회원가입 버튼을 누르면 회원가입이 되어야한다.
  - [ ] 회원가입후 메일이 유효한지 확인하는 메일을 보낸다.
  - [ ] 회원가입후 로그아웃 시켜준다. (메일이 유효하지 않으면 로그인을 시켜주지 않는다. 에러메시지로 확인을 보내줌..) / 정책문제
- [v] 로그인 페이지
  - [v] 로그인 페이지에서 비밀번호를 입력하고 로그인 버튼을 누르면 로그인이 되야한다.
  - [v] 로그인 이후에 저장된 데이터를 가지고 헤더에 로그인된 이메일이 보여야한다.
  - [v] 로그인후에 로그아웃을 누르면 로그아웃 되야한다.
- [ ] 홈 페이지
- [v] 세션정보 유지를 위해서 Redux 적용

### 나중에 확장해야 할 기능

- [ ] 지역, 시간, 좌석수로 검색하기
- [ ] 홈스테이 호스트 추가하기
- [ ] 지도에서 검색하기
- [ ] VSCode 디버거 설정
- [ ] 테스트 코드 작성하기
- [ ] 포맷터 다시 만들어 공유하기 (율무님 요청사항)

## 초기 프로젝트 설정

프로젝트는 Node.js 기반의 Express 서버에 PaserServer와 PaserDashboard를 일단 붙여놨다.
React Server-Side 랜더링을 위해서 After.js를 선택했다가 다시 Next.js로 변경했다.

After.js는 Next.js에 React-Router를 붙인 개념으로 이해하면된다. 하지만 아직은 설정에 허들이 많아서 삽질하다가 접었다.
쓰다보니 Next.js 훨씬 간편했다.

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

## Styled-jsx 설정

스타일드 JSX는 Next 애덜이 밀고 있는것 같다. 스타일시트를 따로 설정하지 않고 컴포넌트에 임베이딩시켜서 코드를 같이 볼수있는게 장점이다. `css in js`로만 쓰기엔 좀 불편하고 `less`를 설정하는게 아무래도 편한다.

```$> npm i --save styled-jsx less styled-jsx-plugin-less```


## 트러블 슈팅

### 1. 다른 페이지로 라우팅할때 데이터를 함께 넘기는 방법

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


### 4. Paser.Promise

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

NodeJS 서버를 이용할 경우 SDK를 이용하는 것보다 /login 엔드포인트를 만들고 직접 REST API를 호출하는 것이 비교적 안전하다. (키값 노출이 없다.)

다만, REST API로 구현하면 웹 클라이언트 쪽으로 쿠키를 이용해 토큰을 내려주고, 요청을 받을때 쿠키에 박힌 토큰을 보고 유저를 직접 판단해야한다.


### 6. Ajax 응답으로 쿠키(set-cookie) 설정하기

클라이언트에서 요청할때 보안 관련 옵션인 `credentials`을 설정해주어야한다.

- `credentials:'same-origin'` - 같은 도메인일 경우 쿠키 허용
- `credentials:'include'` - 다른 도메인일때도 쿠키 허용, (서버에 CORS 설정이 필요)

***참고링크***
- [sending-cookies](https://github.com/github/fetch#sending-cookies)
- [withcredentials](https://xhr.spec.whatwg.org/#the-withcredentials-attribute)