import { initStore } from '../redux/store';
import withRedux from '../redux/withRedux';

import { HomeLayout, BecomeHostLayout } from '../layouts';
import {
  Home,
  StepIndexForm,
  StepMenuForm,
  StepLocationForm,
  StepPriceForm,
  StepCalendarForm
} from '../components/BecomeHost';

class BecomeHost extends React.Component {
  render() {
    const { loginUser, step } = this.props;

    let ChildComponent = StepIndexForm;
    let currentStep = 1;

    if (step === 'menu') {
      ChildComponent = StepMenuForm;
      currentStep = 2;
    } else if( step === 'location') {
      ChildComponent = StepLocationForm;
      currentStep = 3;
    } else if( step === 'price') {
      ChildComponent = StepPriceForm;
      currentStep = 4;
    } else if( step === 'calendar') {
      ChildComponent = StepCalendarForm;
      currentStep = 5;
    }


    return (
      loginUser
        ? (<BecomeHostLayout step={currentStep}><ChildComponent loginUser={loginUser} /></BecomeHostLayout>)
        : (<HomeLayout><Home /></HomeLayout>)
    );
  }
}


BecomeHost.getInitialProps = async function ({ query: { step = 'index' }, store }) {

  return {
    step,
    loginUser: store.getState().loginUser
  };
};

// High Ordered Componet 고차함수: (컴포넌트)=>랩핑컴포넌트
export default withRedux(initStore)(BecomeHost);
