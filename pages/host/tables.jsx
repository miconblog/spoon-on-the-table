import React from 'react';
import moment from 'moment';
import { List, Breadcrumb, Card, Avatar, Icon } from 'antd';
import { initStore } from '../../redux/store';
import withRedux from '../../redux/withRedux';
import { HostAdminLayout } from '../../layouts';
import { loadUserHostedTables } from '../../utils/api';
import 'moment/locale/ko';
import './HostManageEvent.less';

moment.locale('ko');

const HostTables = props => (
  <HostAdminLayout {...props}>
    <div className="HostManageEvent">
      <div className="PageHeader">
        <Breadcrumb>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="/host">Host</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Table List</Breadcrumb.Item>
        </Breadcrumb>

        <div>
          <h1>이벤트 관리</h1>
        </div>
      </div>

      <div className="content">
        <List
          className="event-list"
          grid={{
            gutter: 16,
            xs: 1,
            sm: 1,
            md: 2,
            lg: 2,
            xl: 3,
            xxl: 3,
          }}
          dataSource={props.items}
          renderItem={item => (
            <List.Item>
              <Card
                bordered
                style={{ width: '100%' }}
                cover={<img alt="example" src={`/image/${item.photos[0].id}`} />}
                actions={[
                  <span>
                    <Icon type="picture" /> 2
                  </span>,
                  <Icon type="edit" />,
                ]}
              >
                <Avatar
                  size="large"
                  className="host-photo"
                  alt="avatar"
                  src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
                />
                <Card.Meta
                  title={item.title}
                  description={`${moment(item.startDate).format(
                    'LL'
                  )} ~ ${moment(item.endDate).format('LL')}`}
                />
              </Card>
            </List.Item>
          )}
        />
      </div>
    </div>
  </HostAdminLayout>
);

HostTables.getInitialProps = async function({
  isServer,
  store,
  query: { tables },
}) {
  const { loginUser } = store.getState();
  let items = [];

  if (isServer) {
    items = tables;
  } else {
    const res = await loadUserHostedTables(loginUser);
    items = res.tables;
  }

  return {
    items,
    loginUser,
  };
};

export default withRedux(initStore)(HostTables);
