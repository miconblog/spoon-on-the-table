import React from 'react';
import moment from 'moment';
import { List, Breadcrumb, Card, Avatar, Icon, Button, Row, Col } from 'antd';
import { initStore } from '../../redux/store';
import withRedux from '../../redux/withRedux';
import { TableDetailLayout } from '../../layouts';
import { loadTableById } from '../../utils/api';
import './show.less';
import constants from '../../components/constants';

moment.locale('ko');
const KET = 'AIzaSyBZmcrD7iviVF20bsYJgBW50cr9fum0wAo';
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '/assets/font/iconfont.js',
});

class TablePage extends React.Component {
  state = {};

  render() {
    const { table } = this.props;
    const mapLocation = `https://maps.googleapis.com/maps/api/staticmap?size=412x200&center=${
      table.geoPoint.latitude
    },${table.geoPoint.longitude}&markers=size:mid,color:red|${
      table.geoPoint.latitude
    },${table.geoPoint.longitude}&zoom=15&sensor=false&key=${KET}`;

    console.log('TablePage', table.geoPoint);
    return (
      <TableDetailLayout {...this.props}>
        <div className="TablePage">
          <div className="header">
            {table.photos.map((photo) => (
              <div
                key={photo.id}
                style={{
                  width: `${table.photos.length === 1 ? '100%' : '50%'}`,
                  height: '400px',
                  backgroundImage: `url(${photo.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center center',
                }}
              />
            ))}
          </div>

          <div className="body">
            <div className="left">
              <section>
                <small className="event-type">
                  {constants.eventType[table.eventType]}
                </small>
                <div className="table-title">
                  <h1>{table.title}</h1>
                </div>
              </section>

              <div className="table-summary">
                <Row>
                  <Col span={4}>
                    <Icon type="dollar" /> 요금
                  </Col>
                  <Col>
                    <span>
                      {table.price === 0 ? '무료' : `1인당 ${table.price} 원`}
                    </span>
                  </Col>
                </Row>
                <Row>
                  <Col span={4}>
                    <Icon type="environment" /> 지역
                  </Col>
                  <Col>
                    <span>{table.address}</span>
                  </Col>
                </Row>
                <Row>
                  <Col span={4}>
                    <Icon type="team" /> 인원
                  </Col>
                  <Col className="guest-limits">
                    <div>
                      최소 <span>{table.minPerson}명</span>
                    </div>
                    <div>
                      최대 <span>{table.maxPerson}명</span>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col span={4}>
                    <IconFont type="icon-wine" /> 주류
                  </Col>
                  <Col>
                    <span>{constants.alcohol[table.alcohol]}</span>
                  </Col>
                </Row>
              </div>

              <div className="table-menu">
                <h4>메뉴 설명</h4>
                <p>{table.explainTheMenu}</p>
              </div>

              <div className="table-host">
                <h4>호스트 소개</h4>

                <Row>
                  <Col span={4}>
                    <Avatar
                      size="large"
                      alt="avatar"
                      src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
                    />
                  </Col>
                  <Col>
                    <div>{table.host.username}</div>
                    <div>여기에 호스트 소개글이 들어가면 좋겠다.</div>
                  </Col>
                </Row>
              </div>

              <div className="host-review">
                <h4>호스트에 대한 후기</h4>

                <div>
                  <div>호스트가 주최한 1번 이벤트</div>
                  <div>1번 이벤트에 대한 후기.... 아침식사 너무 맛있다.</div>
                </div>
              </div>
            </div>

            <div className="right">
              <div className="ticket-box">
                <div>
                  {`${moment(table.startDate).format('LL')} ~ ${moment(
                    table.endDate
                  ).format('LL')}`}
                </div>
                <div>
                  <Button type="primary">예약하기</Button>
                </div>
              </div>
              <div className="event-location">
                <img
                  id="staticmap"
                  width="412"
                  height="200"
                  src={mapLocation}
                  alt="Google Map"
                />
                <div className="explain-box">
                  <h4>
                    <IconFont type="icon-milestone" /> 오시는 길
                  </h4>
                  <p>
                    {table.explainTheWay}
                  </p>
                </div>

                <div className="explain-box">
                  <h4>
                    <IconFont type="icon-parking" /> 주차
                  </h4>
                  <p>
                    주차할 공간이 없습니다. 대중교통을 이용하세요.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </TableDetailLayout>
    );
  }
}

TablePage.getInitialProps = async function({ isServer, store, query }) {
  const { loginUser } = store.getState();

  console.log('query.....', query);

  if (!isServer) {
    const res = await loadTableById(query.id);

    console.log('result', res);
    return {
      table: res.table,
      loginUser,
    };
  }

  return {
    ...query,
    loginUser,
  };
};

export default withRedux(initStore)(TablePage);
