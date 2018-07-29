import React from 'react';
import { Dropdown, Menu, Icon, Avatar } from 'antd';
import PropTypes from 'prop-types';
import { logoutUser } from '../utils/api';
import './LoginUserAvatar.less';

const propTypes = {
  loginUser: PropTypes.shape({
    fullName: PropTypes.string,
  }).isRequired,
};
const defaultProps = {};

function logout({ domEvent }) {
  domEvent.preventDefault();
  domEvent.stopPropagation();

  logoutUser().then(() => {
    window.location.replace('/');
  });
}

const menu = (
  <div>
    <div>안녕하세요!</div>
    <Menu>
      <Menu.Item key="logout" onClick={logout}>
        <Icon type="logout" />로그아웃
      </Menu.Item>
    </Menu>
  </div>
);

export default function LoginUserAvatar(props) {
  const { loginUser } = props;
  return (
    <React.Fragment>
      <div className="LoginUserAvatar">
        <Dropdown overlay={menu} trigger={['click']}>
          <span className="dropdown-trigger">
            <Avatar src={loginUser.photo.image} />
          </span>
        </Dropdown>
      </div>
    </React.Fragment>
  );
}

LoginUserAvatar.propTypes = propTypes;
LoginUserAvatar.defaultProps = defaultProps;
