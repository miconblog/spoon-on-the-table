import React from 'react';
import { UsersLayout } from '../../layouts';
import { initStore } from '../../redux/store';
import withRedux from '../../redux/withRedux';
import { UsersEditProfileForm, UsersEditMediaForm } from '../../components/forms';

class UsersEdit extends React.PureComponent {
  handleUpload = (resp) => {
    this.setState({
      photoIsChanged: true,
      photo: resp.image,
      photoId: resp.objectId,
    });
  };

  render() {
    const { section, loginUser } = this.props;
    return (
      <UsersLayout {...this.props}>
        <main className="page-my-profile-content">
          {section === 'profile' && <UsersEditProfileForm {...this.props} />}
          {section === 'media' && (
            <UsersEditMediaForm
              {...this.props}
              defaultImage={loginUser.photo.image}
              onUpload={this.handleUpload}
            />
          )}
        </main>
      </UsersLayout>
    );
  }
}

UsersEdit.getInitialProps = async ({ query, store }) => {
  const { section } = query;

  // 여기서 반환한 것은 컴포넌트의 props에 꼽혀야된다.
  return {
    section,
    loginUser: store.getState().loginUser,
  };
};

export default withRedux(initStore)(UsersEdit);
