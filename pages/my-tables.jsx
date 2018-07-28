import Markdown from 'react-markdown';
import { Card, Avatar } from 'antd';
import { Table } from 'antd';
import { initStore } from '../redux/store';
import withRedux from '../redux/withRedux';
import { MyPageLayout } from '../layouts';

const columns = [{
  title: '테이블 이름',
  dataIndex: 'name',
  render: text => <a href="#">{text}</a>,
}, {
  title: '주소',
  dataIndex: 'address',
}, {
  title: '총 예약자',
  dataIndex: 'guests',
}];

const data = [{
  key: '1',
  name: '우리집으로 놀러와! 밥먹자!',
  address: 'New York No. 1 Lake Park',
  guests: 0,
}, {
  key: '2',
  name: '무더운 여름! 마지사! 한강 수제 맥주 파티!',
  address: 'London No. 1 Lake Park',
  guests: 0,
}, {
  key: '3',
  name: 'Joe Black',
  address: 'Sidney No. 1 Lake Park',
  guests: 0,
}];

// rowSelection object indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: record => ({
    disabled: record.name === 'Disabled User', // Column configuration not to be checked
    name: record.name,
  }),
};

const MyTables = ({ loginUser }) => (
  <MyPageLayout>
    <main className="page-my-table-content">
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
    </main>
  </MyPageLayout>
);

MyTables.getInitialProps = async function ({ query, req, store }) {
  console.log('MyTables', query);
  return {
    loginUser: store.getState().loginUser,
  };
};

export default withRedux(initStore)(MyTables);
