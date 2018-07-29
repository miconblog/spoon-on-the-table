import React from 'react';
import Link from 'next/link';
import { AccountLayout } from '../layouts';
import RegisterForm from '../components/account/LoginForm';

const Signup = props => (
  <AccountLayout>
    <div className="signup-page">
      <div className="logo">
        <Link href="/"><a href="/"><h1>TableSpoon</h1></a></Link>
        <p>어서오세요! 이제 거의 다 끝나갑니다.</p>
      </div>
      <RegisterForm {...props} />
    </div>
  </AccountLayout>
);

Signup.getInitialProps = ({ query, res }) => {
  const { email } = query;
  if (!email) {
    res.redirect('/sign');
  }

  return {
    email,
  };
};

export default Signup;
