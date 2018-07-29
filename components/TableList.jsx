import React from 'react';
import moment from 'moment';
import _ from 'lodash';
import { Card, List, Tag, Avatar } from 'antd';
import './TableList.less';
import 'moment/locale/ko';

moment.locale('ko');

export default ({ tables }) => {
  console.log(tables);

  const items = _.flatten([tables, tables, tables, tables, tables]);

  return (
    <div className="TableList">
      <div className="head">
        <h2>테이블</h2>
      </div>
      <List
        className="event-list"
        dataSource={items}
        renderItem={item => (
          <List.Item>
            <Card bordered cover={<img alt="cover" src={`/image/${item.photos[0].id}`} />}>
              <Avatar
                size="large"
                className="host-photo"
                src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
              />

              <Tag color="orange" className="event-type">
                {item.eventType.toUpperCase()}
              </Tag>

              <div className="meta">
                <div className="date">
                  {moment(item.startDate).format('LL')} ~{' '}
                  {moment(item.endDate).format('LL')}
                </div>

                <div className="title">{item.title}</div>

                <div className="price">무료</div>
              </div>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};
