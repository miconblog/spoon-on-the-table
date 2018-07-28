import React from 'react';
import { initStore } from '../redux/store';
import withRedux from '../redux/withRedux';
import { getUserCache } from '../utils/api-for-ssr';

import { HomeLayout, BecomeHostLayout } from '../layouts';
import {
  Home,
  StepIndexForm,
  StepMenuForm,
  StepLocationForm,
  StepPriceForm,
  StepCalendarForm,
} from '../components/BecomeHost';

import Relay from '../components/RelayContext';

class BecomeHost extends React.Component {
  render() {
    const { loginUser, step, tableCache } = this.props;

    let ChildComponent = StepIndexForm;
    let currentStep = 1;

    if (step === 'menu') {
      ChildComponent = StepMenuForm;
      currentStep = 2;
    } else if (step === 'location') {
      ChildComponent = StepLocationForm;
      currentStep = 3;
    } else if (step === 'price') {
      ChildComponent = StepPriceForm;
      currentStep = 4;
    } else if (step === 'calendar') {
      ChildComponent = StepCalendarForm;
      currentStep = 5;
    }

    return loginUser ? (
      <BecomeHostLayout step={currentStep}>
        <Relay.Provider
          value={{
            cache: tableCache,
            handler: (newValue) => {
              tableCache.test = 'xxxx';
              this.forceUpdate();
            },
          }}
        >
          <ChildComponent loginUser={loginUser} cache={tableCache} />
        </Relay.Provider>
      </BecomeHostLayout>
    ) : (
      <HomeLayout>
        <Home />
      </HomeLayout>
    );
  }
}

BecomeHost.getInitialProps = async ({
  query: { step = 'index' },
  store,
  isServer,
}) => {
  const { loginUser } = store.getState();
  let tableCache = null;

  if (loginUser) {
    const { sessionToken } = loginUser;
    const response = await getUserCache('table', { isServer, sessionToken });
    tableCache = { ...response.data };
  }

  return {
    step,
    tableCache,
    loginUser,
  };
};

// High Ordered Componet 고차함수: (컴포넌트)=>랩핑컴포넌트
export default withRedux(initStore)(BecomeHost);
