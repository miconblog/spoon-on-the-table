import React from "react";
import withGoogleSDK from './withGoogleSDK';

class TestCom extends React.Component {

}

describe('with google sdk hoc', () => {

  it('withGoogleSDK 는 함수다', () => {
    expect(withGoogleSDK).toBeInstanceOf(Function);
  });

  it('withGoogleSDK 함수의 반환값은 컴포넌트다.', () => {
    const value = withGoogleSDK(TestCom);
    console.log(value.constructor)

    expect(value).toBe(React.Component);
  });

});