import React from 'react';
import { UsersLayout } from '../../layouts';
import { initStore } from '../../redux/store';
import withRedux from '../../redux/withRedux';
import { UsersEditVerificationForm } from '../../components/forms';

class UsersEditVerification extends React.PureComponent {
  render() {
    return (
      <UsersLayout {...this.props}>
        <main className="page-my-profile-content">
          <UsersEditVerificationForm />
        </main>
      </UsersLayout>
    );
  }
}

UsersEditVerification.getInitialProps = async ({ query, store }) => {
  const { section } = query;

  return {
    section,
    loginUser: store.getState().loginUser,
  };
};

export default withRedux(initStore)(UsersEditVerification);
