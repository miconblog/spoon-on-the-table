import React from "react";
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import withGoogleSDK, { isCalled } from './withGoogleSDK';
//import SimpleMap from "./BecomeHost/SimpleMap";

const SimpleMap = () => <div>Simple Map</div>
describe('with google sdk hoc', () => {

  it('withGoogleSDK 는 함수다', () => {
    expect(withGoogleSDK).toBeInstanceOf(Function);
  })

  it('withGoogleSDK 함수는 React 컴포넌트를 인자로 받는다.', () => {
    expect(() => {
      withGoogleSDK()
    }).toThrow()
  });

  it('withGoogleSDK는 마운트되면 비동기로 구글 SDK를 로드한다.', () => {

    const GoogleMap = withGoogleSDK(SimpleMap);
    sinon.spy(GoogleMap.prototype, 'componentDidMount');

    expect(isCalled).toBeFalsy();
    const wapper = mount(<GoogleMap />);
    expect(isCalled).toBeTruthy();

    expect(GoogleMap.prototype.componentDidMount).toHaveProperty('callCount', 1);
    GoogleMap.prototype.componentDidMount.restore();
  });

  it('withGoogleSDK 함수의 반환값은 컴포넌트다.', () => {

    const GoogleMap = withGoogleSDK(SimpleMap);
    expect(GoogleMap).toBeInstanceOf(Function);

    const wapper = shallow(<GoogleMap />);
    expect(wapper.html()).not.toBe(null);

  });

});