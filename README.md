# Spoon on the table

## Todo List

> v 완료, - 진행중

- [v] 프로젝트 스켓폴딩 (SSR with Next.js or After.js)
- [v] antd 설정
- [ ] Storybook 설정
- [-] 회원가입 페이지
  - [-] 이메일을 입력하면 서버에 등록된 이메일이 있는지 /api/v1/user/dupl?email=xxxx 를 던져본다.
  - [ ] 중복메일이 아니면 가입 페이지로 이동한다.
  - [ ] 중복메일이면 로그인 페이지로 이동한다.
  - [ ] 페이스북으로 연결해서 로그인하면 회원가입페이지로 이동한다.
- [ ] 로그인 페이지
- [ ] 홈 페이지

### 나중에 확장해야 할 기능

- [ ] 지역, 시간, 좌석수로 검색하기
- [ ] 홈스테이 호스트 추가하기
- [ ] 지도에서 검색하기

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

## Ant Design 설정

Ant Design의 스타일 설정을 필요한 부분만 뽑아서 하려니 좀 귀찮고, 레이아웃 페이지를 만들고 HTML Head 에 스타일 CSS 파일 전체를 통째로 삽입하는 방식으로 많이들 사용하고 있다.

## Styled-jsx 설정

스타일드 JSX는 Next 애덜이 밀고 있는것 같다. 스타일시트를 따로 설정하지 않고 컴포넌트에 임베이딩시켜서 코드를 같이 볼수있는게 장점이다. `css in js`로만 쓰기엔 좀 불편하고 `less`를 설정하는게 아무래도 편한다.

```$> npm i --save styled-jsx less styled-jsx-plugin-less```
