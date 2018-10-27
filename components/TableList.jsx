import React from 'react';
import moment from 'moment';
import Link from 'next/link';
import { Rate, List, Tag, Avatar, Row, Col } from 'antd';
import './TableList.less';
import 'moment/locale/ko';
import BlurImage from './shared/BlurImage';

moment.locale('ko');
const MyRate = ({ value, ...rest }) => {
  let myValue = value;
  if (myValue < Math.ceil(myValue)) {
    myValue = Math.floor(myValue) + 0.5;
  }

  return <Rate {...rest} value={myValue} />;
};

const TableList = ({ tables }) => (
  <div className="TableList">
    <div className="head">
      <h2>금주의 테이블</h2>
    </div>
    <List
      className="event-list"
      dataSource={tables}
      grid={{
        xs: 1, // 24 < 576
        sm: 2, // 12 >= 576
        md: 3, // 8 >= 768
        lg: 4, // 6 >= 992
        xl: 4, // 24를 5등분하기 어려움. >= 1200
        xxl: 6, // >= 1600
      }}
      renderItem={(item) => (
        <List.Item>
          <Link href={`/tables/show?id=${item.id}`}>
            <a href={`/tables/show?id=${item.id}`} style={{ display: 'block' }}>
              <div className="list-item">
                <BlurImage url={`/image/${item.photos[0].id}`} />

                <div className="item-content">
                  <Avatar
                    size="large"
                    className="host-photo"
                    alt="avatar"
                    src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
                  />

                  <Row type="flex" justify="space-between">
                    <Col>
                      <span className="event-type">
                        <Tag>{item.eventType.toUpperCase()}</Tag>
                      </span>
                    </Col>
                    <Col className="price">
                      <span>
                      무료
                        {/* 1인당 <strong>{item.price}</strong> */}
                      </span>
                    </Col>
                  </Row>

                  <div className="title">{item.title}</div>

                  <div className="sub-title">
                    {item.address.replace('대한민국', '')}
                  </div>

                  <div className="review">
                    <span>4.8</span> <MyRate disabled allowHalf value={4.8} />{' '}
                    <span>20</span>
                  </div>
                </div>
              </div>
            </a>
          </Link>
        </List.Item>
      )}
    />
  </div>
);

export default TableList;
