import React from 'react';
import { Divider } from 'antd';
import { HomeLayout } from '../layouts';
import { initStore } from '../redux/store';
import About from '../components/About';
import SiteMap from '../components/SiteMap';
import TableList from '../components/TableList';
import withRedux from '../redux/withRedux';
import { loadTables } from '../utils/api';

const Index = (props) => {
  const { loginUser } = props;

  console.log('HomeMain', loginUser);
  return (
    <HomeLayout loginUser={loginUser}>
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
