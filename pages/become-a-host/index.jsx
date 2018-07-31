import React from 'react';
import { initStore } from '../../redux/store';
import withRedux from '../../redux/withRedux';
import { getUserCache } from '../../utils/api-for-ssr';
import { HomeLayout, BecomeHostLayout } from '../../layouts';
import {
  BecomeAHost,
  StepIndexForm,
  StepMenuForm,
  StepLocationForm,
  StepPriceForm,
  StepCalendarForm,
} from '../../components/BecomeHost';

const BecomeAHostPage = (props) => {
  const { loginUser, step, tableCache } = props;

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
    <BecomeHostLayout loginUser={loginUser} step={currentStep}>
      <ChildComponent loginUser={loginUser} cache={tableCache} />
    </BecomeHostLayout>
  ) : (
    <HomeLayout hideIntro>
      <BecomeAHost />
    </HomeLayout>
  );
};

BecomeAHostPage.getInitialProps = async ({
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
export default withRedux(initStore)(BecomeAHostPage);
