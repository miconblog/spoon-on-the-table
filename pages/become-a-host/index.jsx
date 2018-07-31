import React from 'react';
import { initStore } from '../../redux/store';
import withRedux from '../../redux/withRedux';
import { HomeLayout, BecomeHostLayout } from '../../layouts';
import {
  BecomeAHost,
  StepIndexForm,
  StepMenuForm,
  StepLocationForm,
  StepPriceForm,
  StepCalendarForm,
} from '../../components/become-a-host';
import { loadTableCache } from '../../utils/api';

const BecomeAHostPage = (props) => {
  const { loginUser, step, cache } = props;

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
      <ChildComponent loginUser={loginUser} cache={cache} />
    </BecomeHostLayout>
  ) : (
    <HomeLayout hideIntro>
      <BecomeAHost />
    </HomeLayout>
  );
};

BecomeAHostPage.getInitialProps = async ({
  query: { step = 'index', cache },
  store,
  isServer,
}) => {
  const { loginUser } = store.getState();

  // 클라이언트 라우팅이면 서버에 임시 저장한 값을 다시 불러온다.
  if (!isServer) {
    const res = await loadTableCache(loginUser);
    return {
      step,
      cache: res.data,
      loginUser,
    };
  }

  return {
    step,
    cache,
    loginUser,
  };
};

// High Ordered Componet 고차함수: (컴포넌트)=>랩핑컴포넌트
export default withRedux(initStore)(BecomeAHostPage);
