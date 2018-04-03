import { connect } from 'react-redux';
import React from 'react';
import Link from 'next/link';
import { Button, Icon, Divider, Menu } from 'antd';
import './SideMenu.less';

class SideMenu extends React.Component {

  toggleCollapsed = () => {
    this.props.dispatch({ type: 'COLLAPSE_SIDE_MENU', payload: !this.props.collapsed })
  }

  // handleWindowResize = (e) => {
  //   const { collapsed, dispatch } = this.props;
  //   let shouldCollapsed = (e.target.innerWidth < 600);

  //   if (collapsed !== shouldCollapsed) {
  //     this.props.dispatch({ type: 'COLLAPSE_SIDE_MENU', payload: shouldCollapsed })
  //   }
  // }

  // componentDidMount() {
  //   window && window.addEventListener('resize', this.handleWindowResize);
  // }

  // componentWillUnmount() {
  //   window && window.removeEventListener('resize', this.handleWindowResize);
  // }

  render() {
    const { selectedKey, onSelect, collapsed = false } = this.props;
    return (
      <aside id="sidebar" className="SideMenu">
        <Menu
          mode="inline"
          inlineCollapsed={collapsed}
          selectedKeys={[selectedKey]}
          onSelect={onSelect}
        >
          <Menu.Item key="info">
            <Icon type="user" />
            <span>개인정보</span>
          </Menu.Item>
          <Menu.Item key="password">
            <Icon type="lock" />
            <span>비밀번호 변경</span>
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item key="address">
            <Icon type="environment-o" />
            <span>주소</span>
          </Menu.Item>
          <Menu.Item key="bank">
            <Icon type="bank" />
            <span>계좌 연결</span>
          </Menu.Item>
          <Menu.Item key="sns">
            <Icon type="cloud-o" />
            <span>소셜 연동</span>
          </Menu.Item>
          <Menu.Item key="language">
            <Icon type="global" />
            <span>사용 언어</span>
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item>
            <Link href='/logout'>
              <a style={{ display: 'inline-block' }}><Icon type="logout" /><span>로그아웃</span></a>
            </Link>
          </Menu.Item>
        </Menu>

        <div className="btn-toggle-sider" >
          <Button type="ghost" onClick={this.toggleCollapsed}>
            <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} />
          </Button>
        </div>
      </aside>
    )
  }
}

export default connect((state) => {
  return {
    collapsed: state.collapsed
  };
})(SideMenu)