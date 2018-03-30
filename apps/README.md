# 서버 구성도

4개의 앱으로 구성되어 있다.

1. Next: SSR 랜더링을 위한 Next 서버
2. Express API: 항상 JSON 으로만 통신한다.
3. ParseServer: 비즈니스로직처리
4. Dashboard: 관리툴

```
Front:  [Express + Next :3000] [Dashboard :4040]

Back:              [Parse :9000]

DB:                [Mongo Server]

```