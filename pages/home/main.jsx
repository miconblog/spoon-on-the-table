import React from 'react';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import { Button, Divider } from 'antd';
import { HomeLayout } from '../../layouts';
import { initStore } from '../../redux/store';
import About from '../../components/About';
import SiteMap from '../../components/SiteMap';
import TableList from '../../components/TableList';
import withRedux from '../../redux/withRedux';

const Index = (props) => {
  const { loginUser, children, section } = props;

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
  const res = await fetch('https://api.tvmaze.com/search/shows?q=batman');
  const data = await res.json();

  const size = 3;
  const rows = [];
  const MAX_ROWS = Math.ceil(data.length / size);

  for (let i = 0; i < MAX_ROWS; ++i) {
    rows.push(data.slice(i * size, (i + 1) * size));
  }

  console.log('isServer', isServer, query.tables);

  return {
    rows,
    tables: query.tables,
    loginUser: store.getState().loginUser,
  };
};

// Redux 스토어를 Index.props에 주입한다.
export default withRedux(initStore)(Index);
