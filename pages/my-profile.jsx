import { initStore } from '../redux/store';
import withRedux from '../redux/withRedux';
import { MyPageLayout } from '../layouts';
import Markdown from 'react-markdown';
import { Card, Divider } from 'antd';

const MyProfile = ({loginUser}) => (
  <MyPageLayout>
    <h1>내정보</h1>


    <Card>
      <img src={loginUser.profileImage} />
    </Card>

    <div className='markdown'>
      <Markdown source={`

      #프로필 정보 수정
       
      - 프로필 이미지 변경 
      
      - 개인 정보 
        - 이름 
        - 생년 
        - 이메일 
        - 휴대폰

      - 주소 
        - 정확한 주소 
        - 예약한 게스트에게 보여지는 추가 설명 
        - 지도 삽입

      - 소셜 연동 확인 

      - 계좌 연결 

      - 패스워드 변경 
      
      - 사용언어 

      - 자기소개        
     `} />
    </div>
  </MyPageLayout>
);

MyProfile.getInitialProps = async function ({ query, req, loginUser }) {
  return {
    loginUser
  };
};

export default withRedux(initStore)(MyProfile);
