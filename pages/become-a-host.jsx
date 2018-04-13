import { initStore } from '../redux/store';
import withRedux from '../redux/withRedux';

import { HomeLayout, BecomeHostLayout } from '../layouts';
import { Home, StepOneForm } from '../components/BecomeHost';

const BecomeHost = ({ loginUser }) => (
  loginUser
  ? (<BecomeHostLayout><StepOneForm loginUser={loginUser} /></BecomeHostLayout>)
  : (<HomeLayout><Home /></HomeLayout>)
);

BecomeHost.getInitialProps = async function ({ store }) {
  return {
    loginUser: store.getState().loginUser
  };
};

// High Ordered Componet 고차함수: (컴포넌트)=>랩핑컴포넌트
export default withRedux(initStore)(BecomeHost);
