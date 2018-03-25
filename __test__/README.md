# API 테스트

## Jest 환경 설정

Next.js 환경에선 `babel-preset-env`와 `babel-preset-react`모듈이 설치되어 있으므로 추가로 Jest만 설치한다.

```bash
$> npm install --save-dev jest
```

`package.json` 파일에 test 스크립트를 추가한다.

```json
{
 "test": "jest"
}
```

`import` 구문을 쓰고 싶다면 `.babelrc` 파일에 테스트 환경을 추가한다.

```json
{
  "env": {
    "test": {
      "presets": ["env", "react"],
      "plugins": ["transform-es2015-modules-commonjs"]
    }
  }
}
```


## RESTfull Test with supertest

