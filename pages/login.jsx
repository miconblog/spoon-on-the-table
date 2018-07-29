import React from 'react';
import Link from 'next/link';
import { AccountLayout } from '../layouts';
import LoginForm from '../components/account/LoginForm';

const AccountLogin = props => (
  <AccountLayout>
    <div className="login-page">
      <div className="logo">
        <Link href="/">
          <a>
            <h1>TableSpoon</h1>
          </a>
        </Link>
        <p>비밀번호가 노출되지 않도록 주의해주세요!</p>
      </div>
      <LoginForm {...props} />
    </div>
  </AccountLayout>
);

AccountLogin.getInitialProps = async ({ isServer, query, res }) => {
  console.log('----AccountLogin', isServer, query);

  if (!query || !query.email) {
    return res.redirect('/sign');
  }
  
  return {
    email: query.email,
  };
};

export default AccountLogin;
