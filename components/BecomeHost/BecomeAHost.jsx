import React from 'react';
import PrefetchLink from '../PrefetchLink';
import './BecomeAHost.less';

export default () => (
  <div className="BecomeAHost">
    <h1>호스트가 되어 보세요!</h1>
    <div className="markdown">
      <div>
        호스트가 되면 어떤 이득이 있냐? 이런저런 호스트에 대한 소개페이지...
      </div>
      <PrefetchLink href="/sign">
        <a href="/sign" className="ant-btn ant-btn-primary">
          가입하기
        </a>
      </PrefetchLink>
    </div>
  </div>
);
