import React from 'react';
import { Divider, Input } from 'antd';
import { HomeLayout } from '../layouts';
import { initStore } from '../redux/store';
import About from '../components/About';
import SiteMap from '../components/SiteMap';
import TableList from '../components/TableList';
import withRedux from '../redux/withRedux';
import { loadTables } from '../utils/api';

const Index = (props) => {
  const { loginUser } = props;

  return (
    <HomeLayout loginUser={loginUser}>
      <div>
        <Input.Search style={{ width: '320px' }} />
      </div>
      <Divider />
      <div>날짜, 인원 옵션</div>
      <Divider />
      <div>
        <h3>검색 결과 없음</h3>
        <p>검색 결과가 없습니다.</p>

        <Divider />
      </div>
      <TableList {...props} />
      <Divider />
      <About />
      <Divider />
      <SiteMap />
    </HomeLayout>
  );
};

Index.getInitialProps = async function({ isServer, query, store }) {
  let tables = [];
  if (isServer) {
    tables = [...query.tables];
  } else {
    try {
      const res = await loadTables();

      tables = [...res.tables];
    } catch (e) {
      tables = [];
    }
  }

  return {
    tables,
    loginUser: store.getState().loginUser,
  };
};

export default withRedux(initStore)(Index);
