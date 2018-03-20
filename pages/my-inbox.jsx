import React from 'react';
import { initStore } from '../redux/store';
import withRedux from '../redux/withRedux';
import { MyPageLayout } from '../layouts';
import Markdown from 'react-markdown';
import { Card, Divider } from 'antd';

class MyInbox extends React.Component {
  componentDidMount(){
    console.log('Server>', this.props.isServer)

    const { isServer } = this.props;
    if( this.props.isServer ){
    

    }
  }
  render(){
    return (
      <MyPageLayout>
        <h1>메시지</h1>

        <div className='markdown'>
          <Markdown source={`
            
        `} />
        </div>
      </MyPageLayout>
    )
  }
  
};

MyInbox.getInitialProps = async function ({ isServer, query, req, loginUser }) {
  
  return {
    isServer,
    loginUser
  };
};

export default withRedux(initStore)(MyInbox);
