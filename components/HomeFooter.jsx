import React from 'react';
import { Layout } from 'antd';
import './HomeFooter.less';

const { Footer } = Layout;

const HomeFooter = ({ style }) => (
  <Footer className="HomeFooter" style={style}>
    <footer>
      <h3 style={style.h3}>TableSpoon</h3>
      <div>
        <p>
          대표 이메일 boss@tablespoon.com<br />
          테이블스푼 | 대표 임꺽정 xxx-xx-xxxxx | 업체주소 is here | 통신판매업
          면허번호 is here | 대표전화 000-1111-1111
        </p>
      </div>
    </footer>
  </Footer>
);

export default HomeFooter;
