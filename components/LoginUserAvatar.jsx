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
  <Menu onClick={logout}>
    <Menu.Item key="logout">
      <Icon type="logout" />로그아웃
    </Menu.Item>
  </Menu>
);


export default function LoginUserAvatar(props) {
  const { loginUser } = props;
  return (
    <React.Fragment>
      <div className="LoginUserAvatar">
        <Dropdown overlay={menu} trigger={['click']}>
          <span className="dropdown-trigger">
            <Avatar
              size="small"
              src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
            />
            <span className="host-name">{loginUser.fullName}</span>
          </span>
        </Dropdown>
      </div>
    </React.Fragment>
  );
}

LoginUserAvatar.propTypes = propTypes;
LoginUserAvatar.defaultProps = defaultProps;
