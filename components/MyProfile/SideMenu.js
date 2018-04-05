import { connect } from 'react-redux';
import Link from 'next/link';
import { Button, Icon, Divider, Menu } from 'antd';
import './SideMenu.less';

export default ({ selectedKey, onSelect }) => (
  <aside id="sidebar" className="SideMenu">
    <Menu
      mode="inline"
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
  </aside>
)
