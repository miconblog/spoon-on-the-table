import React from 'react';
import { UsersLayout } from '../../layouts';
import { initStore } from '../../redux/store';
import withRedux from '../../redux/withRedux';
import {
  UsersEditProfileForm,
  UsersEditMediaForm,
  UsersEditVerificationForm,
} from '../../components/forms';

import { loadUserProfilePhotos } from '../../utils/api';

class UsersEdit extends React.PureComponent {
  render() {
    const { section, loginUser } = this.props;

    return (
      <UsersLayout {...this.props}>
        {section === 'profile' && <UsersEditProfileForm {...this.props} />}
        {section === 'media' && (
          <UsersEditMediaForm
            {...this.props}
            defaultImage={loginUser.photo.image}
          />
        )}
        {section === 'verification' && (
          <UsersEditVerificationForm {...this.props} />
        )}
      </UsersLayout>
    );
  }
}

UsersEdit.getInitialProps = async ({ query, isServer, store }) => {
  const { section, pageName } = query;
  let { photos } = query;

  let sectionName = section || 'profile';
  if (!isServer && pageName === 'edit_verification') {
    sectionName = 'verification';
  }

  if (!isServer && section === 'media') {
    const res = await loadUserProfilePhotos(store.getState().loginUser);
    photos = [...res.photos];
  }

  // 여기서 반환한 것은 컴포넌트의 props에 꼽혀야된다.
  return {
    section: sectionName,
    photos,
    loginUser: store.getState().loginUser,
  };
};

export default withRedux(initStore)(UsersEdit);
