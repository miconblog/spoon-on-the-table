import React from 'react';
import Link from 'next/link';
import { Button, Divider } from 'antd';
import { AccountLayout } from '../layouts';
import SignForm from '../components/account/SignForm';

const SocialButtons = () => (
  <div>
    <Button
      icon="facebook"
      className="full-width-button"
      style={{ backgroundColor: '#4267b2', color: '#fff', height: '40px' }}
    >
      페이스북
    </Button>
  </div>
);

const AccountSign = () => (
  <AccountLayout>
    <div className="sign-page">
      <div className="logo">
        <Link href="/">
          <a>
            <h1>TableSpoon</h1>
          </a>
        </Link>
        <p>전세계의 여행자들을</p>
        <p>내 식탁에서 만나는 방법!</p>
      </div>
      <SignForm />
      <Divider>OR</Divider>
      <SocialButtons />
    </div>
  </AccountLayout>
);

AccountSign.getInitialProps = async function({ res, loginUser }) {
  if (loginUser) {
    res.redirect('/');
  }

  return {};
};

export default AccountSign;
